import React, { FC, useState, useEffect, useRef } from "react";
import "./Step2.scss";
import { AiFillCloseCircle, AiOutlineCloudUpload, AiOutlineCodepen, AiOutlineCodepenCircle } from "react-icons/ai";
import isDefinedAndNotNull from "../../../../helpers/form";


interface Step2Props {
  data: any;
  onPrevious: () => void;
  onNext: (data: any) => void;
}

const Step2: FC<Step2Props> = ({ data, onPrevious, onNext }) => {
  const [images, setImages] = useState(Array(8).fill(null));
  const [profileImage, setProfileImage] = useState(null);
  const initialized = useRef(false)

  // Function to handle file selection
  const handleFileChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(event.target.files[0]);
    setImages(newImages);
  };
  const handleProfileFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // const newImage = URL.createObjectURL(file);
      setProfileImage(file);
    }
  };
  // Function to clear image by index
  const clearImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handleNext = () => {
    // Validation des données si nécessaire
    onNext({ images, profileImage });
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      if (data.company) {
        handleNext();
      }
      setImages(isDefinedAndNotNull(data.images) ? data.images : Array(8).fill(null));
      setProfileImage(
        isDefinedAndNotNull(data.profileImage) ? data.profileImage : null
      );
    }
  }, []);

  return (
    <div className="flex w-screen overflow-hidden step2">
      <div className="w-4/6 p-10">
        <h1 className="my-10">Comment est votre logement ?</h1>
        <div className="residence mt-5 overflow-auto">
          <div className="flex flex-wrap">
            {images.map((image, index) => (
              <div key={index}
                className="custum-file-upload m-2 relative"
                style={image ? {
                  backgroundImage: `url("${URL.createObjectURL(image)}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: 0
                } : null} >
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, e)}
                  className="hidden"
                  id={`file-input-${index}`}
                />
                <label
                  htmlFor={`file-input-${index}`}
                  className="block cursor-pointer"
                >
                  {image && (
                    <>
                      {/* <img
                        src={image}
                        alt="Preview"
                        className="max-w-full h-auto"
                      /> */}
                      <AiFillCloseCircle
                        size={30}
                        color="red"
                        className="absolute top-0 right-0 redButton"
                        onClick={() => clearImage(index)}
                      />
                    </>
                  )}
                  {!image && (
                    <div className="text-center">
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                              fillRule="evenodd"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      Sélectionnez une image
                    </div>
                  )}
                </label>
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
      <div className="w-2/6 bg-gray-400 bg-right grid grid-cols-1 gap-4 content-center relatives">
        <h2 className="text-center">Importer une photo de vous</h2>
        <div
          className="custum-file-upload-profil  
          m-2  justify-self-center"
          style={profileImage ? {
            backgroundImage: `url("${URL.createObjectURL(profileImage)}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: 0
          } : null} >
          <input
            type="file"
            onChange={(e) => handleProfileFileChange(e)}
            className="hidden"
            id={`file-input-profileImage`}
          />
          <label
            htmlFor={`file-input-profileImage`}
            className="text-center contents justify-self-center cursor-pointer"
          >
            {profileImage && (
              <>
                <AiOutlineCodepenCircle 
                  size={50}
                  color="red"
                  className="relative redButtonProfile"
                  onClick={() => setProfileImage(null)}
                />
              </>
            )}
            {!profileImage && (
              <div className="m-auto">
                  <AiOutlineCloudUpload 
                    size={100}
                    color="white"
                  /> 
              </div>
            )}
          </label>
        </div>
        <div>
        <p className="text-xl text-center text-white capitalize font-semibold">{data.name}</p>
        <p className="text-xl text-center text-white capitalize font-semibold">{data.city}</p>
        </div>
      </div>
    </div>
  );
};
export default Step2;
