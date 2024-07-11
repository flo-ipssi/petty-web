import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-white.png";
import {
  Keys,
  getFromAsyncStorage,
  removeFromAsyncStorage,
} from "../utils/asyncStorage";
import client from "../api/client";
import { FaBars, FaTimes } from "react-icons/fa";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth";

const SideBar = () => {
  const { profile } = useSelector(getAuthState);

  // const openDropdown = (event: Event | undefined, dropdownID: string) => {
  //   let element = event?.target as HTMLElement;
  //   while (element.nodeName !== "A") {
  //     element = element.parentNode as HTMLElement;
  //   }
  //   const dropdownElement = document.getElementById(dropdownID);
  //   if (dropdownElement) {
  //     dropdownElement.classList.toggle("hidden");
  //     dropdownElement.classList.toggle("block");
  //   }
  // };

  const toggleNavbar = (collapseID: string) => {
    const element = document.getElementById(collapseID);
    if (element) {
      element.classList.toggle("hidden");
      element.classList.toggle("bg-white");
      element.classList.toggle("m-2");
      element.classList.toggle("py-3");
      element.classList.toggle("px-6");
    }
  };

  const handleLogout = async () => {
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      if (!token) return;
      await fetch(client + "auth/log-out?fromAll=yes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      await removeFromAsyncStorage(Keys.AUTH_TOKEN);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="md:left-0 md:block md:fixed
     md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap
      md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center 
      justify-between relative md:w-64 z-10 "
    >
      <div className="hidden md:block bg-pink-600 text-left md:pb-2 text-blueGray-600 mr-0  whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
        {" "}
        <img src={Logo} className="mx-auto" width={80} />
      </div>
      <div className="md:flex-col py-2 px-6 md:items-stretch md:min-h-full md:flex-nowrap flex flex-wrap items-center justify-between w-full mx-auto">
        <button
          className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          onClick={() => toggleNavbar("example-collapse-sidebar")}
        >
          <FaBars size={30} color={colors.OVERLAY} />
        </button>
        <ul className="md:hidden items-center flex flex-wrap list-none">
          <li className="inline-block relative">
            <a className="text-blueGray-500 block" href="#pablo">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={profile?.avatar}
                  alt="Rounded Image"
                  className="w-full h-full object-cover"
                />
              </div>
            </a>
          </li>
        </ul>
        <div
          className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"
          id="example-collapse-sidebar"
        >
          <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <a
                  className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  href="#"
                >
                  Petty
                </a>
              </div>
              <div className="w-6/12 flex justify-end">
                <button
                  type="button"
                  className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onClick={() => toggleNavbar("example-collapse-sidebar")}
                >
                  <FaTimes size={25} />
                </button>
              </div>
            </div>
          </div>
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                to="/"
                className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
              >
                <i className="fas fa-tv opacity-75 mr-2 text-sm"></i>
                Dashboard
              </Link>
            </li>
            <li className="items-center">
              <Link
                to="/matching"
                className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
              >
                <i className="fas fa-tv opacity-75 mr-2 text-sm"></i>
                Matching
              </Link>
            </li>
            <li className="items-center">
              <Link
                to="/conversations"
                className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
              >
                <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>
                Messagerie
              </Link>
            </li>
            <li className="items-center">
              <Link
                className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                to="/pets"
              >
                <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>
                Animaux
              </Link>
            </li>
            {/* <li className="items-center">
              <a
                className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                href="#/login"
              >
                <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>
                Equipe
              </a>
            </li> */}
          </ul>
          <hr className="my-4 md:min-w-full" />
          <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li className="inline-flex">
              <Link
                to="/profile"
                className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
              >
                <i className="fas fa-paint-brush mr-2 text-blueGray-400 text-base"></i>
                Profil
              </Link>
            </li>

            <li className="inline-flex">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-1 px-2 rounded-full"
              >
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
