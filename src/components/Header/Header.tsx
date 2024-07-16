import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import "./Header.scss";
import Modal from "../Modal/Modal";
import { Keys, saveToAsyncStorage } from "../../utils/asyncStorage";
import { getAuthState, updateBusyState, updateLoggedInState, updateProfile } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import client from "../../api/client";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import Loader from "../Loader";

export const Header = () => {
  const [active, setActive] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { busy } = useSelector(getAuthState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(updateBusyState(true));
    try {
      // we want to send these information to our api
      const { data } = await axios.post(
        client + "auth/sign-in-to-owner",
        {
          email,
          password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      await saveToAsyncStorage(Keys.AUTH_TOKEN, data.token);
      dispatch(updateProfile(data.profile));
      dispatch(updateLoggedInState(true));
      dispatch(updateBusyState(false));
      navigate("/pets");
    } catch (error) {
      console.log("Sign in error: ", error);
    }
    dispatch(updateBusyState(false));
  };

  const formModal = () => {
    dispatch(updateBusyState(false));
    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Mot de passe
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        {/* <div className="flex justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Se rappeler de moi
            </label>
          </div>
          <a
            href="#"
            className="text-sm text-blue-700 hover:underline dark:text-blue-500"
          >
            Mot de passe oublié ?
          </a>
        </div> */}
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {busy ? (<Loader text="Chargement" />) : "Se connecter"}
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Vous n'êtes pas inscrit ? 
          <Link to="/signup"
            className="text-blue-700 hover:underline dark:text-blue-500">
            Créer un compte
          </Link>
        </div>
      </form>
    );
  };

  return (
    <>
      <header className="Header z-50 p-4 fixed top-0 w-100">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <img
              className="logo object-cover h-14 w-auto mx-auto"
              src={logo}
              alt=""
            />
          </h1>
          <nav
            className={`lg:flex flex-grow items-center ${active ? "block" : "hidden"
              }`}
          >
            <ul className="flex flex-col lg:flex-row lg:ml-auto mt-4 lg:mt-0">
              {/* <li><a href="#" className="block lg:inline-block text-gray-300 hover:text-white px-2 py-1">Accueil</a></li>
    <li><a href="#" className="block lg:inline-block text-gray-300 hover:text-white px-2 py-1">A propos</a></li>
    <li><a href="#" className="block lg:inline-block text-gray-300 hover:text-white px-2 py-1">Contact</a></li> */}
              <li>
                <Link
                  className="block mx-4 lg:inline-block border-x-indigo-200 hover:bg-gray-600 text-gray-400 hover:text-white px-2 py-1 rounded-lg"
                  to="/signup"
                >
                  Inscription
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
                  className="block mx-4 lg:inline-block border-x-indigo-200 hover:bg-gray-600 text-gray-400 hover:text-white px-2 py-1 rounded-lg"
                >
                  Connexion
                </a>
              </li>
            </ul>
          </nav>
          <button
            className="block lg:hidden"
            onClick={() => setActive(!active)}
          >
            {active ? <FaTimes size={20} /> : <FaBars size={20} />}{" "}
          </button>
        </div>
      </header>
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(!isLoginModalOpen)}
        title="Connexion"
        children={formModal()}
      />
    </>
  );
};
