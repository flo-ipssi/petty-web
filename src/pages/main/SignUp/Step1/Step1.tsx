import React, { FC, useState, useEffect } from "react";
import "../SignUp.scss"

interface Step1Props {
  data: any;
  onPrevious: () => void;
  onNext: (data: any) => void;
}

const Step1: FC<Step1Props> = ({ data, onPrevious, onNext }) => {
  const [isChecked, setIsChecked] = useState(null); // Initialisation à true
  const [typeStructure, setTypeStructure] = useState("");
  const [nameAssociation, setNameAssociation] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [numero, setNumero] = useState("");
  const [website, setWebSite] = useState("");

  console.log(data);
  
  const toggleCheckbox = () => {
    if (data.company) {
      setIsChecked(!isChecked);
      if (!isChecked) {
        setTypeStructure("Particulier");
      } else {
        setTypeStructure("Association");
      }
    }
  };

  const handleNext = () => {
    // Validation des données si nécessaire
    onNext({
      typeStructure,
      name,
      firstname,
      address,
      city,
      zip,
      nameAssociation,
      numero,
      website,
    });
  };

  useEffect(() => {
    toggleCheckbox();
  }, []);
  return (
    <div className="flex w-screen overflow-hidden step1">
      <div className="w-1/2 bg-gray-300 bg-left-step1"></div>
      <div className="w-1/2 p-10">
        <h1 className="my-10">Qui êtes-vous ?</h1>
        <div
          className={
            "w-full max-w-lg toggleButton " + (!data.company ? "hidden" : "")
          }
        >
          <div className="flex  flex-nowrap">
            <div
              className={
                !isChecked
                  ? "leading-2 fonseca uppercase "
                  : "leading-2 uppercase "
              }
            >
              Association
            </div>
            <div className="mx-3">
              <input
                type="checkbox"
                className="switch"
                onClick={toggleCheckbox}
              />
            </div>
            <div
              className={
                isChecked
                  ? "leading-2 fonseca uppercase "
                  : "leading-2 uppercase "
              }
            >
              Particulier
            </div>
          </div>
          {!isChecked ? (
            <div className="flex flex-wrap fields -mx-3 mt-5 mb-8">
              <div className="w-full md:w-100 px-3 mb-6 md:mb-0">
                <div className="group">
                  <input
                    required
                    type="text"
                    className="input"
                    onChange={(e) => setNameAssociation(e.target.value)}
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Nom de l'association</label>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="w-full max-w-lg fields mt-5">
          <div className="flex flex-wrap -mx-3 mb-8">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <div className="group">
                <input
                  required
                  type="text"
                  className="input"
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Nom</label>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <div className="group">
                <input
                  required
                  type="text"
                  className="input"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Prénom</label>
                {/* <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p> */}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-8">
            <div className="w-full md:w-100 px-3 mb-6 md:mb-0">
              <div className="group">
                <input
                  required
                  type="text"
                  className="input"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Adresse</label>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-8">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <select
                onChange={(e) => setCity(e.target.value)}
                id="underline_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option selected>Ville</option>
                <option value="paris">Paris</option>
                <option value="lyon">Lyon</option>
                <option value="rennes">Rennes</option>
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <div className="group">
                <input
                  required
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  type="text"
                  className="input"
                  onChange={(e) => setZip(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Code Postale</label>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-8">
            <div
              className={
                "w-full px-3 mb-6 md:mb-0 " +
                (!isChecked ? "md:w-1/2" : "md:w-100")
              }
            >
              <div className="group">
                <input
                  required
                  type="text"
                  pattern="\d*"
                  className="input"
                  onChange={(e) => setNumero(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Numéro</label>
              </div>
            </div>
            {!isChecked ? (
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <div className="group">
                  <input
                    required
                    type="text"
                    className="input"
                    onChange={(e) => setWebSite(e.target.value)}
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Site web</label>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <button
          onClick={handleNext}
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step1;