import React, { FC } from "react";
import "./Step4.scss";
import { useNavigate } from "react-router-dom";

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

  console.log("Step4: ");
  console.log(data);
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
            src={data.profileImage ? URL.createObjectURL(data.profileImage) : null}
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
            {images?.map((image: any, index: number) =>
            (
              <div key={index}>
                <img
                  className="min-h-10 h-36 px-4 w-auto shrink rounded-lg"
                  src={image ? URL.createObjectURL(image) : null}
                  alt=""
                />
              </div>
            )
            )}
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
          onClick={onSubmit}
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
