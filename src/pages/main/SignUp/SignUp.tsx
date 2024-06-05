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
import { Keys, getFromAsyncStorage } from "../../../utils/asyncStorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  stepInitial?: number;
}

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

  const DataURIToBlob = (dataURI: string) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  };

  const uploadFile = async (uploadImg: { uri: string }) => {
    let split = uploadImg.uri.split("/");
    let type = split[1].split(";")[0];

    // Change data to blob
    const file = DataURIToBlob(uploadImg.uri);

    const formData = new FormData();
    formData.append("upload", file);
    formData.append("file", {
      type: type,
      uri: uploadImg.uri,
    });

    const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

    try {
      const response = await fetch("http://localhost:8989/upload/create", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
          // 'Content-Type': 'multipart/form-data;',
          // 'Access-Control-Allow-Origin': '*',
        },
      });

      if (response.ok) {
      }
    } catch (error) {
      let errorResponse = await error;
    }
  };

  const handleSubmit = async () => {
    // Envoyer les données du formulaire
    console.log("Données soumises :", formData);
    // Validation des données si nécessaire
    try {
      const reponse = await fetch("http://localhost:8989/auth/createByWeb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Permet les requêtes depuis toutes les origines
        },
        body: JSON.stringify(formData),
      });

      console.log(reponse);

    
        const resultat = await reponse.json();
        const token = resultat.token;
        const userID = resultat.user.id;
        const formMediasData = new FormData();
        formMediasData.append("userID", userID);
        formMediasData.append("photoProfil", formData.profileImage);
        formData?.images.forEach((file: string | Blob, index: any) => {
          formMediasData.append(`file${index}`, file);
        });

        const photoResponse = await axios.post(
          "http://localhost:8989/auth/createUploadByWeb",
          formMediasData,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
          console.log(photoResponse);
        if (photoResponse) {
          
          navigate("/?success=WaitToConfirm");
        }
        
    } catch (error) {
      // Connexion errors
      console.log(error);
    }
  };

  return (
    <div className="SignUp h-screen flex items-center justify-center space-6 mx-auto py-4">
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
