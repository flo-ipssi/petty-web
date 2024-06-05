import React, { FC, useState, useEffect } from 'react';
import logo from '../../../assets/images/icon-no-label.svg';
import "./Home.scss";
import { PanInfo, motion } from "framer-motion";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams('');

  const positions = [
    { width: "400px", height: "400px", top: "1vh", left: "-10vw", rotation: "rotate" },
    { width: "350px", height: "350px", top: "55vh", left: "-7vw", rotation: "rotate2" },
    { width: "280px", height: "280px", top: "80vh", left: "20vw", rotation: "rotate3" },
    { width: "380px", height: "380px", top: "75vh", left: "46vw", rotation: "rotate4" },
    { width: "450px", height: "450px", top: "63vh", left: "78vw", rotation: "rotate5" },
    { width: "500px", height: "500px", top: "-15vh", left: "76vw", rotation: "rotate6" },
    { width: "200px", height: "200px", top: "-5vh", left: "45vw", rotation: "rotate7" }
  ];
  useEffect(() => {
    setImagePositions(positions);
    if(searchParams.get("success")){
      const value = searchParams.get("success");
      setSearchParams(value);
    }
    
  }, []);
  const navigate = useNavigate();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragDistance = info.offset.x + info.point.x;
    if (dragDistance < -400) {
      navigate('/about');
    }
  };
  return (
    <motion.div
      drag="x"
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragEnd={(event, info) => handleDragEnd(event, info)}
      style={{ cursor: 'grab',
      // width: '100vw',
      // height: '100vh',
      // background: 'linear-gradient(to right, #36D1DC, #5B86E5)',
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center',
      fontSize: '24px',}}
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
