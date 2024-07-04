import { FC, useState } from "react";
import "./SignUp.scss";
import Step0 from "./Step0/Step0";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4/Step4";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  stepInitial?: number;
}

type FormData = {
  email: string;
  password: string;
  profileImage: File;
  images: File[];
};

const SignUp: FC<SignUpProps> = ({ stepInitial }) => {
  const [step, setStep] = stepInitial ? useState(stepInitial) : useState(0);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleNext = (data: {}) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch("http://localhost:8989/auth/createByWeb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const token = result.token;
      const userId = result.user.id;

      const formMediasData = new FormData();
      formMediasData.append("userID", userId);
      formMediasData.append("photoProfil", formData.profileImage);
      formData.images.forEach((file: File, index: number) => {
        formMediasData.append(`file${index}`, file);
      });

      // Envoyer les médias à l'API d'upload
      await axios.post(
        "http://localhost:8989/auth/createUploadByWeb",
        formMediasData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Rediriger vers la page de succès
      navigate("/?success=WaitToConfirm");
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="SignUp flex items-center justify-center space-6 mx-auto py-4">
      {step === 0 && <Step0 onNext={handleNext} />}
      {step === 1 && (
        <Step1
          data={formData}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <Step2
          data={formData}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
      {step === 3 && (
        <Step3
          data={formData}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
      {step === 4 && (
        <Step4
          data={formData}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default SignUp;
