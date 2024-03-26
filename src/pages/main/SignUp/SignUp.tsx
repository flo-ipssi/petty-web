import React, { FC, useEffect, useState } from "react";
import "./SignUp.scss";
import { motion } from "framer-motion";
import adopt_Image from "../../../assets/Design/Design/Adopt 2.jpeg";
import makeAdopt from "../../../assets/Design/Design/Maitre et chien 1.jpeg";
import UploadResidence from "../../../components/form/UploadResidence/UploadResidence";
import Step0 from "./Step0/Step0";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4/Step4";

interface SignUpProps { }


const SignUp: FC<SignUpProps> = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (data) => {
    // Envoyer les données du formulaire
    console.log("Données soumises :", data);
    // Réinitialiser le formulaire ou rediriger l'utilisateur
  };
  return (
    <div className="SignUp h-screen flex items-center justify-center space-6 mx-auto py-4">
      {step === 0 && <Step0 onNext={handleNext}  />}
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
