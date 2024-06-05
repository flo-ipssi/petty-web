import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import logo from "../../assets/images/logo.svg";
import "./Header.scss";
import Modal from "../Modal/Modal";
import { Keys, saveToAsyncStorage } from "../../utils/asyncStorage";
import { updateLoggedInState, updateProfile } from "../../store/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import client from "../../api/client";

export const Header = () => {
  const [active, setActive] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigate()

  const handleSubmit = async () => {
    try {
      // we want to send these information to our api
      const { data } = await client.post("/auth/sign-in", {
        email,
        password,
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      });
      await saveToAsyncStorage(Keys.AUTH_TOKEN, data.token);
      dispatch(updateProfile(data.profile));
      dispatch(updateLoggedInState(true));
    } catch (error) {
      console.log("Sign in error: ", error);
    }
  };

  const formModal = () => {
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
        <div className="flex justify-between">
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
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Se connecter
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Vous n'êtes pas inscrit ?{" "}
          <a
            href="#"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Créer un compte
          </a>
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
            className={`lg:flex flex-grow items-center ${
              active ? "block" : "hidden"
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
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6V6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13V13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM11 18C11 17.4477 11.4477 17 12 17V17C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19V19C11.4477 19 11 18.5523 11 18ZM3 5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H4C3.44772 6 3 5.55228 3 5ZM4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H4ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"
              />
            </svg>
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
