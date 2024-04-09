import React, { FC } from "react";
import "./Step4.scss";
import DataURIToBlob from "../../../../helpers/upload";
import { Keys, getFromAsyncStorage } from "../../../../utils/asyncStorage";

interface Step4Props {
  data: any;
  onPrevious: () => void;
  onSubmit: (data: any) => void;
}

interface FormData {
  company: boolean;
  firstname: string;
  name: string;
  email: string;
  address: string;
  numero: string;
  city: string;
  images: Object;
  nameAssociation: string;
  password: string;
  profileImage: string;
  typeStructure: string;
  website: string;
  zip: string;
}

const Step4: FC<Step4Props> = ({ data, onPrevious, onSubmit }) => {
  const images = data?.images ? data.images : null;

  const handleSubmit = async () => {
    // Validation des données si nécessaire  
    try {
      const reponse = await fetch("http://localhost:8989/auth/createByWeb", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Permet les requêtes depuis toutes les origines
        },
        body: JSON.stringify(data),
      });

      if (!reponse.ok) {
        // Servor error
        let errorResponse = await reponse.json();
      } else {
        const resultat = await reponse.json();
        uploadFile(data.images, resultat.token)
      }

    } catch (error) {
      // Connexion errors      
      console.log(error);
    }

  };

  const uploadFile = async (uploadImg: any, token: string) => {

    const formData = new FormData();
    
    uploadImg.forEach((image: string, index: any) => {
      let split = image.split("/");
      let type = split[1].split(";")[0];
  
      // Change data to blob
      const file = DataURIToBlob(image);
      formData.append(`image${index}`, image);
      formData.append(`upload${index}`, file);
      formData.append(`file${index}`, {
        type: type,
        uri: uploadImg.uri,
      });
  
    });
    // const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
    try {
      const response = await fetch("http://localhost:8989/upload/create", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
          // 'Content-Type': 'multipart/form-data;',
          // 'Access-Control-Allow-Origin': '*', // Permet les requêtes depuis toutes les origines
        },
      })
      if (!response.ok) {
        console.log(response);

      } else {
        console.log(response);
      }
    } catch (error) {
      let errorResponse = await error;
      console.log(errorResponse);
    }
  };
  return (
    <div className="w-full h-full text-center content-center grid grid-cols-1 gap-4">
      <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Prêt pour la grande aventure ?
      </h2>

      <div
        className="m-auto flex flex-col  items-center 
        bg-white border border-gray-200  rounded-lg shadow 
        md:flex-row dark:border-gray-700 dark:bg-gray-800 recap"
      >
        <div className="p-6">
          <h2 className="mb-6 text-xl font-bold tracking-tight ">
            Profil
          </h2>
          <img
            className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={data.profileImage ? data.profileImage : null}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between py-4 leading-normal mx-2">
          <ul
            role="list"
            className="space-y-4 text-gray-500 dark:text-gray-400"
          >
            <li className="flex space-x-2 rtl:space-x-reverse items-center">
              <span className="font-bold">Nom complet:</span>
              <span className="leading-tight">
                {data.name} {data.firstname}
              </span>
            </li>
            <li className="flex space-x-2 rtl:space-x-reverse items-center">
              <span className="font-bold">Email:</span>
              <span className="leading-tight">{data.email}</span>
            </li>
            <li className="flex space-x-2 rtl:space-x-reverse items-center">
              <span className="font-bold">Localisation:</span>
              <span className="leading-tight capitalize">
                {data?.address} {data.zip} {data.city}
              </span>
            </li>
            <li className="flex space-x-2 rtl:space-x-reverse items-center">
              <span className="font-bold">Numero:</span>
              <span className="leading-tight">{data.numero}</span>
            </li>
          </ul>
        </div>
        <div className="m-auto flex flex-col mt-0 py-6">
          <h2 className="mb-6 text-xl font-bold tracking-tight ">Gallerie</h2>
          <div className="flex flex-wrap">
            {images?.map((image: any, index: number) => (
              <div key={index}>
                <img
                  className="min-h-10 h-36 px-4 w-auto shrink rounded-lg"
                  src={image}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={onPrevious}
          className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded me-6"
          type="button"
        >
          Précèdent
        </button>
        <button
          onClick={handleSubmit}
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
        >
          Soumettre
        </button>
      </div>
    </div>
  );
};

export default Step4;
