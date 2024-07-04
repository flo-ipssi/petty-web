import { FC, useState } from "react";
import { motion } from "framer-motion";
import adopt_Image from "../../../../assets/Design/Design/Adopt 2.jpeg";
import makeAdopt from "../../../../assets/Design/Design/Maitre et chien 1.jpeg";

interface Step0Props {
  onNext: (data: any) => void;
}

const Step0: FC<Step0Props> = ({ onNext }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState(false);

  const handleNext = () => {
    onNext({ company });
  };

  return (
    <div className="pt-24">
      <h1 className="text-center my-10">Que voulez vous ?</h1>
      <div className="grid grid-cols-2 gap-4 place-content-center h-auto ">
        <motion.div
          onClick={() => {
            setCompany(false);
            setTitle("Adoption");
          }}
          transition={{ duration: 0.3 }}
          whileHover={{
            scale: 1.1,
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 60px 40px -7px",
          }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer max-w-xs h-100 rounded overflow-hidden shadow-lg m-4 p-4 flex flex-col items-center"
        >
          <h2 className="font-bold text-xl mb-2 text-center">Adoption</h2>
          <img src={adopt_Image} />
          <p className="text-gray-700 text-base text-center">
            Offrez-leur un foyer chaleureux
          </p>
        </motion.div>
        <motion.div
          onClick={() => {
            setCompany(true);
            setTitle("Faire adopter");
          }}
          transition={{ duration: 0.3 }}
          whileHover={{
            scale: 1.1,
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 60px 40px -7px",
          }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer max-w-xs h-100 rounded overflow-hidden shadow-lg m-4 p-4 flex flex-col items-center"
        >
          <h2 className="font-bold text-xl mb-2 text-center">Faire adopter</h2>

          <img src={makeAdopt} />

          <p className="text-gray-700 text-base text-center">
            Offrez un nouveau départ à un compagnon
          </p>
        </motion.div>
      </div>
      {title == "" ? null : (
        <button
          onClick={handleNext}
          className="mx-auto mt-10 bg-teal-500 hover:bg-teal-700
             border-teal-500 hover:border-teal-700 border-4 
             text-white py-1 px-2 rounded garet-bold flex items-center text-2xl uppercase "
          type="button"
        >
          {title}
        </button>
      )}
    </div>
  );
};

export default Step0;