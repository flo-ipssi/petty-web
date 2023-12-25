import React, { FC } from 'react';
import './Download.scss';
import { PanInfo, motion } from "framer-motion";
import image from "../../assets/images/adopt-3.jpeg";
import logo from "../../assets/images/logo.svg";
import imgAndroid from "../../assets/images/Android-logo-png.svg";
import imgIphone from "../../assets/images/iPhone-logo.svg";
import { useNavigate } from "react-router-dom";

interface DownloadProps { }

const Download: FC<DownloadProps> = () => {

  const navigate = useNavigate();
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {

    const dragDistance = info.offset.x + info.point.x;
    console.log('dragDistance:', dragDistance);
    if (dragDistance < -300) {
      navigate('/');
    }
    if (dragDistance > 950) {
      navigate('/simplifions');
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragEnd={(event, info) => handleDragEnd(event, info)}
      style={{ cursor: 'grab' }}
      className="download mx-auto h-screen space-6 grid grid-rows-3 md:grid-cols-3 gap-4 content-center">
      <div className="bg-white p-6 row-span-3">
        <img className="logo mx-auto mb-12" src={logo} alt="" />
        <h1 className="text-3xl font-bold mb-4">Rendez vos animaux encore plus heureux</h1>
        <p className='text-lg '>Rencontrez d’autres propriétaires et faites jouer vos animaux !</p>
        <div className="h-56 grid grid-cols-2 gap-4 content-center">
          <div>
            <img className="imgIphone" src={imgIphone} alt="" />
          </div>
          <div>
            <img className="imgAndroid" src={imgAndroid} alt="" />
          </div>
        </div>
      </div>
      <div className="relative col-span-2 gap-4 row-span-2 animals md:h-screen h-0">
        <div className="absolute bottom-0 left-32 h-16 w-16 font-bold text-1xl">RESEAUX SOCIAUX</div>
        <div className="absolute bottom-0 left-56 h-16 w-16 ...">RESEAUX SOCIAUX</div>
      </div>
    </motion.div>
  );

}
export default Download;
