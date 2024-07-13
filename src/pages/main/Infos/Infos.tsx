import { FC } from 'react';
import './Infos.scss';
import { motion } from "framer-motion";
import logo from '../../../assets/images/adopt.svg';
import icon from '../../../assets/images/icon-no-label.svg';

interface InfosProps { }

const Infos: FC<InfosProps> = () => {
  // const navigate = useNavigate();

  // const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {

  //   const dragDistance = info.offset.x + info.point.x;
  //   console.log('dragDistance:', dragDistance);
  //   if (dragDistance < -300) {
  //     navigate('/download');
  //   }
  //   if (dragDistance > 950) {
  //     navigate('/objectives');
  //   }
  // };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      // onDragEnd={(event, info) => handleDragEnd(event, info)}
      style={{ cursor: 'grab' }}
      className="infos min-h-screen flex items-center justify-center space-6 mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 hidden sm:block">
          <h2 className="text-5xl garet-bold mb-6">Nous simplifions la recherche pour l’adoption</h2>
          <img
            src={logo}
            className="adoption-image my-8"
            alt={`Image adoption`}
          />
        </div>

        <div className="py-12 pr-12 my-32">
          <ul className="list-none">
            <li className='border-b-4 border-black mb-16'>
              <h3 className='font-bold text-4xl garet-bold my-6'>Cherchez</h3>
              <p className='mb-8 text-xl'>Faites défiler les animaux en appliquant vos filtres et votre localisation</p>
            </li>
            <li className='border-b-4 border-black mb-16'>
              <h3 className='font-bold text-4xl garet-bold my-6'>Rencontrez</h3>
              <p className='mb-8 text-xl'>Prenez contact avec le propriétaire de l’animal (association ou particulier)</p>
            </li>
            <li className='border-b-4 border-black'>
              <h3 className='font-bold text-4xl garet-bold my-6'>Adoptez</h3>
              <p className='mb-8 text-xl'>Vous pouvez enfin accueillir votre nouveau membre de la famille !</p>
            </li>
          </ul>
        </div>
      </div>
      <img
        src={icon}
        className="rotate6"
        alt={`Image `}
        style={{
          zIndex: "-9",
          position: 'fixed',
          top: "-80px",
          left: "77vw",
        }}
      />
    </motion.div>
  )
};

export default Infos;
