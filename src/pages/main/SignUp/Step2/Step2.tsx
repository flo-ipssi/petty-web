import React, { FC, useState, useEffect } from "react";
import "./Step2.scss";
import UploadResidence from "../../../../components/form/UploadResidence/UploadResidence";

interface Step2Props {
  data: any;
  onPrevious: () => void;
  onNext: (data: any) => void;
}

const Step2: FC<Step2Props> = ({ data, onPrevious, onNext }) => {
  const [uploadResidences, setUploadResidences] = useState(Array(8).fill(null));

  const handleFileChange = (index: number) => (imageData: string | null) => {
    console.log(
      `Nouvelles données d'image à l'index ${index} :`,
      imageData
    );
    const updatedUploadResidences = [...uploadResidences];
    updatedUploadResidences[index] = imageData;
    setUploadResidences(prevState => {
      const updatedUploadResidences = [...prevState];
      updatedUploadResidences[index] = imageData;
      return updatedUploadResidences;
    });
  };


  const handleNext = () => {
    // Validation des données si nécessaire
    onNext({ uploadResidences });
  };

  useEffect(() => {
    if (data.company) {
      handleNext();
    }
  }, []);

  return (
    <div className="flex w-screen overflow-hidden step2">
      <div className="w-4/6 p-10">
        <h1 className="my-10">Comment est votre logement ?</h1>
        <div className="residence mt-5 overflow-auto">
          <div className="flex flex-wrap">
            {uploadResidences.map((_, index) => (
              <div className="me-10 mb-10 ">
                <UploadResidence
                  key={index}
                  onFileChange={handleFileChange(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onPrevious}
          className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded me-6"
          type="button"
        >
          Précèdent
        </button>
        <button
          onClick={handleNext}
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
        >
          Suivant
        </button>
      </div>
      <div className="w-2/6 bg-gray-300 bg-right"></div>
    </div>
  );
};
export default Step2;
