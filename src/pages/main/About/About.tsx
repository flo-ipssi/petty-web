import { FC } from "react";
import "./About.scss";
import { PanInfo, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cats from "../../../assets/images/cats.svg";

interface AboutProps {}

const About: FC<AboutProps> = () => {
  const navigate = useNavigate();

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const dragDistance = info.offset.x + info.point.x;
    console.log("dragDistance:", dragDistance);
    if (dragDistance < -300) {
      navigate("/objectives");
    }
    if (dragDistance > 950) {
      navigate("/");
    }
  };
  return (
    <motion.div
      drag="x"
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragEnd={(event, info) => handleDragEnd(event, info)}
      style={{ cursor: "grab" }}
      className="about py-48 lg:h-screen md:h-screen space-6 flex sm:flex-row xs:flex-col items-center content-center"
    >
      <div className="p-6 w-100 ">
        <h1 className=" text-6xl font-semibold my-8 first-letter:uppercase ">
          à propos de Petty
        </h1>
        <p className="my-4">
          Bienvenue dans le monde de Petty, une application innovante dédiée à
          l'adoption animale. Petty a été conçue pour faciliter le processus
          d'adoption en reliant de manière efficace les associations et les
          particuliers. 
        </p>
        <p className="my-4">
          Grâce à Petty, vous pouvez trouver l'animal idéal en utilisant des
          filtres avancés tels que l'espèce, la race, l'âge, la taille et les
          besoins spécifiques. Chaque profil est accompagné de photos et de
          vidéos pour mieux connaître chaque animal. La plateforme offre
          également un accès à une vaste base de données d'associations
          partenaires, avec des mises à jour régulières sur les nouveaux
          arrivants et les événements liés à l'adoption.
        </p>
        <p className="my-4">
          En plus des associations, Petty permet aux particuliers de proposer
          leurs animaux à l'adoption. Vous pouvez communiquer directement avec les propriétaires
          actuels pour en savoir plus sur l'animal et organiser des rencontres.
          Le processus d'adoption est simplifié grâce à une interface intuitive
          qui vous guide à travers chaque étape.
        </p>
        <p className="my-8 font-bold">
          En choisissant Petty, vous contribuez à une cause noble et aidez à
          sauver des vies animales. Rejoignez dès aujourd'hui notre communauté
          et donnez une seconde chance aux animaux en quête d'amour et de foyer.
          Ensemble, faisons la différence, une adoption à la fois.
        </p>
      </div>
      <div className="py-8 w-100 hidden sm:block">
        <img src={cats} className="" alt={`Cats`} />
      </div>
    </motion.div>
  );
};

export default About;
