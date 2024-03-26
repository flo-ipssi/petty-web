import React, { FC, useState } from 'react';
import './Step3.scss';

interface Step3Props {
  data: any;
  onPrevious: () => void;
  onNext: (data: any) => void;
}

const Step3: FC<Step3Props> = ({ data, onPrevious, onNext }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleNext = () => {
    // Validation des données si nécessaire
    onNext({ ...data, email, password });
  };

  console.log(data);

  return (
    <div className="flex w-screen overflow-hidden step2">
      <div className="w-2/3 p-10">
        <h1 className="my-10">Dernière étape</h1>
        <div className="w-full max-w-lg">
          <div className="w-full max-w-lg fields mt-5">
            <div className="flex flex-wrap -mx-3 mb-8">
              <div className="w-full md:w100 px-3 md:mb-6">
                <div className="group">
                  <input
                    required
                    type="text"
                    className="input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Email</label>
                </div>
              </div>
              <div className="w-full md:w100 px-3 md:mb-6">
                <div className="group">
                  <input
                    required
                    type="password"
                    className="input"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Mot de passe</label>
                </div>
              </div>
              <div className="w-full md:w00 px-3 md:mb-6">
                <div className="group">
                  <input
                    required
                    type="password"
                    className="input"
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Confirmer mot de passe</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onPrevious}
          className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded me-6"
          type="button"
        >
          Précèdent
        </button>
        <button
          onClick={handleNext}
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
        >
          Suivant
        </button>
      </div>
      <div className="w-1/3 bg-gray-300 bg-right"></div>
    </div>
  );
};

export default Step3;
