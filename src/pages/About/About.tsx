import React, { FC } from 'react';
import './About.scss';
import { PanInfo, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import cats from "../../assets/images/cats.jpeg";

interface AboutProps { }

const About: FC<AboutProps> = () => {
  const navigate = useNavigate();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
   
    const dragDistance = info.offset.x + info.point.x;
    console.log('dragDistance:', dragDistance);
    if (dragDistance < -300) {
      navigate('/objectives');
    }
    if (dragDistance > 950) {
      navigate('/');
    }
  };
  return (
    <motion.div
      drag="x"
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragEnd={(event, info) => handleDragEnd(event, info)}
      style={{cursor: 'grab'}}
      className="about h-screen space-6 grid grid-cols-1 md:grid-cols-2 content-center">
      <div className="p-8 ">
        <h1 className=' text-6xl font-semibold my-8 first-letter:uppercase '>à propos de Petty</h1>
        <p className='my-2'>Info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info </p>
        <p className='my-2'>Info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info info </p>
        <p className='my-8 font-bold'>Info info info info info info info info info info info info info info info info info info info info info info info info info info </p>

      </div>
      <div className="p-6">
        <img
          src={cats}
          className=""
          alt={`Cats`}
        />
        {/* <Link to="/">
          <h2>Retour</h2>
        </Link>

        <Link to="/objectives">
          <h2>Suivant</h2>
        </Link> */}
      </div>
    </motion.div>)
};

export default About;
