import { FC } from 'react';
import './Goal.scss';
import { motion } from "framer-motion";
import iconHumanDog from "../../../assets/images/Maitre-et-chien.svg";
import logo from '../../../assets/images/icon-no-label.svg';

interface GoalProps { }

const Goal: FC<GoalProps> = () => {

  // const navigate = useNavigate();

  // const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {

  //   const dragDistance = info.offset.x + info.point.x;
  //   if (dragDistance < -300) {
  //     navigate('/download');
  //   }
  //   if (dragDistance > 950) {
  //     navigate('/about');
  //   }
  // };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      // onDragEnd={(event, info) => handleDragEnd(event, info)}
      style={{ cursor: 'grab' }}
      className="goal min-h-screen flex items-center justify-center space-6 mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 ">
          <img
            src={iconHumanDog}
            className="sm:relative xs:h-10 h-32 sm:mr-10"
            alt={`Cats`}
          />
          <div className="card-marron">
            <hr className="mb-12" />
            <h2 className="text-2xl font-bold mb-6">Rencontrer</h2>
            <h3 className='font-bold mb-10'>Créez des liens entre vos animaux</h3>
            <p>Utilisez cet espace rencontrer d’autres propriétaires, filtrez selon l’endroit, l’espèce, la race et les traits de personnalités des animaux.</p>
          </div>
        </div>
        <div className="p-6">
          <div className="card-marron">
            <hr className="mb-12" />
            <h2 className="text-2xl font-bold mb-6">Adopter</h2>
            <h3 className='font-bold mb-10'>Tombez sur le coup de coeur animal !</h3>
            <p>Utilisez cet espace pour chercher le futur membre de votre famille, contactez le propriétaire etc etc etc.</p>
          </div>
        </div>
      </div>
      <img
        src={logo}
        className= "rotate5"
        alt={`Image `}
        style={{
          zIndex:"-9",
          position: 'fixed',
          top: "60vh",
          left: "77vw",
        }}
      />
    </motion.div>
  )
};

export default Goal;
