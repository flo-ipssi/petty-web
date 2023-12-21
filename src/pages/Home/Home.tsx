import React, { FC, useState, useEffect } from 'react';
import logo from '../../assets/images/icon-no-label.svg';
import logo_without_label from "../../assets/images/icon-label.svg";
import "./Home.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


interface HomeProps { }

type imageProps = {
  width: string,
  height: string,
  top: string,
  left: string,
  rotation: string
}

const Home: FC<HomeProps> = () => {
  const [imagePositions, setImagePositions] = useState<imageProps[]>([]);
  const positions = [
    { width: "370px", height: "370px", top: "1vh", left: "-7vw", rotation: "rotate" },
    { width: "300px", height: "300px", top: "63vh", left: "-7vw", rotation: "rotate2" },
    { width: "240px", height: "240px", top: "85vh", left: "10vw", rotation: "rotate3" },
    { width: "320px", height: "320px", top: "80vh", left: "46vw", rotation: "rotate4" },
    { width: "450px", height: "450px", top: "66vh", left: "82vw", rotation: "rotate5" },
    { width: "300px", height: "300px", top: "-10vh", left: "86vw", rotation: "rotate6" },
    { width: "150px", height: "150px", top: "-5vh", left: "50vw", rotation: "rotate7" }
  ];

  useEffect(() => setImagePositions(positions), []);

  return (
    <motion.div
      className="space-6 h-screen space-6 grid grid-cols-1 md:grid-cols-1 gap-4 content-center"
    >
      <div className='logo-background mx-auto'>
        <Link
          to='/about'
        >
          <h1 className='label-logo text-9xl brusher'>Petty</h1>
        </Link>
      </div>
      <div>
        {imagePositions.map((position, index) => (
          <img
            key={index}
            src={logo}
            className={position.rotation}
            alt={`Image ${index + 1}`}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              width: position.width,
              height: position.height
            }}
          />
        ))}
      </div>
    </motion.div>
  )
};

export default Home;
