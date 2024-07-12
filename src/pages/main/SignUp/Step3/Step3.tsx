import { FC, SetStateAction, useEffect, useRef, useState } from 'react';
import './Step3.scss';
import { motion } from 'framer-motion';
import isDefinedAndNotNull from '../../../../helpers/form';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


interface Step3Props {
  data: any;
  onPrevious: () => void;
  onNext: (data: any) => void;
}

const Step3: FC<Step3Props> = ({ data, onPrevious, onNext }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const initialized = useRef(false)
  const [validation, setValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  const validatePassword = (password: string) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const number = /\d/.test(password);

    setValidation({ length, uppercase, number });
  };

  const handlePasswordChange = (e: { target: { value: any; }; }) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleConfirmedPasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setConfirmedPassword(e.target.value);
    setPasswordMatch(true);

  };
  const handleNext = () => {
    if (password === confirmedPassword) {
      onNext({ ...data, email, password });
    } else {
      setPasswordMatch(false);
    }
  };

  useEffect(() => {

    if (!initialized.current) {
      initialized.current = true
      if (data) {
        setEmail(isDefinedAndNotNull(data.email) ? data.email : "");
      }
    }

  }, []);

  return (
    <div className="flex h-screen w-screen  overflow-hidden">
      <div className="w-2/3 p-10 flex-grow  items-center justify-center ">
        <div className="m-auto">
          <h1 className="my-10">Dernière étape</h1>
          <div className="w-full max-w-lg">
            <div className="w-full max-w-lg fields mt-5">
              <div className="flex flex-wrap -mx-3 mb-8">
                <div className="w-full md:w100 px-3 mb-6">
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
                <div className="w-full md:w100 px-3 mb-6">
                  <div className="group">
                    <input
                      required
                      type="password"
                      className="input"
                      onChange={handlePasswordChange}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Mot de passe</label>
                  </div>
                </div>
                <div className="w-full md:w00 px-3 mb-6">
                  <div className="group">
                    <input
                      required
                      type="password"
                      className="input"
                      onChange={handleConfirmedPasswordChange}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Confirmer mot de passe</label>
                  </div>
                </div>

                <div className="password-requirements grid grid-cols-1 gap-4 mx-4">
                  <div className="inline-flex leading-5" style={{ color: validation.length ? 'green' : 'red' }}>
                    {validation.length ? <FaCheckCircle /> : <FaTimesCircle />} Au moins 8 caractères
                  </div>
                  <div className="inline-flex leading-5" style={{ color: validation.uppercase ? 'green' : 'red' }}>
                    {validation.uppercase ? <FaCheckCircle /> : <FaTimesCircle />} Au moins 1 majuscule
                  </div>
                  <div className="inline-flex leading-5" style={{ color: validation.number ? 'green' : 'red' }}>
                    {validation.number ? <FaCheckCircle /> : <FaTimesCircle />} Au moins 1 chiffre
                  </div>
                </div>
                {!passwordMatch && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-red-500 w-full md:w00 px-3 md:mb-6"
                  >
                    Les mots de passe ne correspondent pas
                  </motion.div>
                )}
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
      <div className="hidden md:block w-1/3 bg-gray-300 bg-right bg-step3"></div>
    </div>
  );
};

export default Step3;
