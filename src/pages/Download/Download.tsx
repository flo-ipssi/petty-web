import React, { FC } from 'react';
import './Download.scss';
import { motion } from "framer-motion";
import image from "../../assets/images/adopt-3.jpeg";
import logo from "../../assets/images/logo.svg";
import imgAndroid from "../../assets/images/Android-logo-png.svg";
import imgIphone from "../../assets/images/iPhone-logo.svg";

interface DownloadProps { }

const Download: FC<DownloadProps> = () => {
  return (
    <motion.div className="download mx-auto h-screen space-6 grid grid-rows-3 md:grid-cols-2 gap-4 content-center">

      <div className="bg-white p-6 rounded-md shadow-md row-span-3">
        <img src={logo} alt="" />
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

      <div className="row-span-2">
        <img src={image} alt="" />
      </div>
    </motion.div>
  );

}
export default Download;
