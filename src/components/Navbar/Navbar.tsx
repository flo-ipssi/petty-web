import { FC, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import {
  FaHome,
  FaBullseye,
  FaLightbulb,
  FaDownload,
  FaPaw,
} from "react-icons/fa";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <div>
      {/* Menu pour les écrans mobiles */}
      <div className="Navbar bg-white text-center lg:hidden">
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white w-full p-4 shadow-md">
          <div className="grid grid-cols-4 gap-4">
            <div onClick={handleToggle} className=" text-center mx-auto">
              <Link to="/">
                <FaHome />
              </Link>
            </div>
            <div onClick={handleToggle} className="capitalize text-center mx-auto">
              <Link to="/about">
                <FaPaw />
              </Link>
            </div>
            <div onClick={handleToggle} className=" text-center mx-auto">
              <Link to="/objectives">
                <FaBullseye />
              </Link>
            </div>
            {/* <div onClick={handleToggle} className=" text-center mx-auto">
              <Link to="/simplifions">
                <FaLightbulb />
              </Link>
            </div> */}
            <div onClick={handleToggle} className=" text-center mx-auto">
              <Link to="/download">
                <FaDownload />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Menu pour les écrans plus grands */}
      <div className="Navbar bg-transparent text-center hidden lg:block">
        <div className="fixed bottom-0 font-bold uppercase left-1/2 transform -translate-x-1/2 bg-white w-full p-4 shadow-md">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/about">
                à propos de Petty
              </Link>
            </div>
            <div>
              <Link to="/objectives">Objectifs</Link>
            </div>
            {/* <div>
              <Link to="/simplifions">Simplification</Link>
            </div> */}
            <div>
              <Link to="/download">Télécharger</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
