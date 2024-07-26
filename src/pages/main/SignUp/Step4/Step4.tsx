import { FC, useRef, useState } from "react";
import "./Step4.scss";
import ReCAPTCHA from "react-google-recaptcha";
import client from "../../../../api/client";
import Loader from "../../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, updateBusyState } from "../../../../store/auth";

interface Step4Props {
  data: any;
  onPrevious: () => void;
  onSubmit: (data: any) => void;
}


const Step4: FC<Step4Props> = ({ data, onPrevious, onSubmit }) => {
  const images = data?.images ? data.images : null;
  const reCaptchaKey = import.meta.env.VITE_REACT_APP_SITE_KEY;

  const captchaRef = useRef<ReCAPTCHA>(null);
  const [conditionsAccepted, setConditionsAccepted] = useState(false);
  const [isAdult, setIsAdult] = useState(false);

  const dispatch = useDispatch();
  const { busy } = useSelector(getAuthState);

  const handleNext = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(updateBusyState(true));
    if (conditionsAccepted == false || isAdult == false) {
      alert("Cochez les cases requises");
      return false;
    }
    if (captchaRef?.current?.getValue()) {
      const reCaptcha = captchaRef.current.getValue();

      dispatch(updateBusyState(true));
      captchaRef.current.reset();

      try {
        const response = await fetch(client + "auth/recaptcha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ reCaptcha }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const serverResponse = await response.json();
        if (serverResponse.success == true) {
          onSubmit({ ...data, conditionsAccepted, isAdult });
        }
        dispatch(updateBusyState(false));
      } catch (error) {
        console.log(error);
      }
      dispatch(updateBusyState(false));
    }
    dispatch(updateBusyState(false));
  };

  const handleConditionsChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setConditionsAccepted(event.target.checked);
  };

  const handleIsAdultChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsAdult(event.target.checked);
  };

  function hasNoEmptyElements(array: any[]) {
    return array.every((element) => {
      return element !== null && element !== undefined && element !== '';
    });
  }
  return (
    <form
      onSubmit={handleNext}
      className=" text-center content-center flex flex-col mt-20 gap-4 pb-24 pt-20"
    >
      <h2 className="mb-2 text-3xl font-bold tracking-tight text-white-900 dark:text-white">
        Prêt pour la grande aventure ?
      </h2>

      <div
        className="m-auto flex flex-col  items-center 
        bg-white border border-gray-200  rounded-lg shadow 
        md:flex-row recap"
      >
        <div className="p-6">
          <h2 className="mb-6 text-xl font-bold tracking-tight ">Profil</h2>
          <img
            className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={
              data.profileImage ? URL.createObjectURL(data.profileImage) : ""
            }
            alt=""
          />
        </div>
        <div className="flex flex-col w-min-50 justify-between py-4 leading-normal mx-2">
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
              <span className="font-bold">Téléphone :</span>
              <span className="leading-tight">{data.phone}</span>
            </li>
          </ul>
        </div>
        <div className="m-auto flex flex-col mt-0 py-6 w-96">
          {!data.company && !hasNoEmptyElements(images) ? (
            <div>
              <h2 className="mb-6 text-xl font-bold tracking-tight ">
                Gallerie
              </h2>
              <div className="flex flex-wrap">
                {images?.map((image: any, index: number) => (
                  <div key={index}>
                    <img
                      className="min-h-10 h-36 px-4 w-auto shrink rounded-lg"
                      src={image ? URL.createObjectURL(image) : ""}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <>
            <h2 className="mb-2 text-xl font-bold tracking-tight ">
              Mise en garde
            </h2>
            <p className="mb-4 text-red-500">
              Toute information incorrecte ou utilisation à des fins
              malveillantes pourra entraîner des poursuites légales.
            </p>
          </>
          <div className="mb-2 flex items-center mx-auto">
            <input
              type="checkbox"
              id="conditions"
              checked={conditionsAccepted}
              onChange={handleConditionsChange}
              className="mr-2"
            />
            <label htmlFor="conditions" className="text-gray-700">
              J'accepte les conditions d'utilisation.
            </label>
          </div>
          <div className="mb-4 flex items-center mx-auto">
            <input
              type="checkbox"
              id="isAdult"
              checked={isAdult}
              onChange={handleIsAdultChange}
              className="mr-2"
            />
            <label htmlFor="isAdult" className="text-gray-700">
              Je confirme que je suis majeur.
            </label>
          </div>
        </div>
      </div>

      <div className="mx-auto ">
        <ReCAPTCHA sitekey={reCaptchaKey} ref={captchaRef} className="mb-6" />
        <button
          onClick={onPrevious}
          className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded me-6"
          type="button"
        >
          Précèdent
        </button>
        <button
          type="submit"
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        >
          {busy ? (<Loader text="Chargement" />) : "Soumettre"}

        </button>
      </div>
    </form>
  );
};

export default Step4;
