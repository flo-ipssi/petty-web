import React, { FC, useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import { Keys, getFromAsyncStorage } from "../../../utils/asyncStorage";
import { useLocation, useNavigate } from "react-router-dom";
import InputForm from "../../../components/form/InputForm";
import SelectForm from "../../../components/form/SelectForm";
import TextAreaForm from "../../../components/form/TextAreaForm";
import { PetsService } from "../../../services/PetsService";
import {
    gendersOptions,
    levelOptions,
    locationsOptions,
    speciesOptions,
} from "../../../api/fieldsValues";
import client from "../../../api/client";

interface PetFormProps { }

const PetFom: FC<PetFormProps> = ({ }) => {
    const navigate = useNavigate();
    const params = useLocation();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState("");
    const [size, setSize] = useState('');
    const [color, setColor] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [healthStatus, setHealthStatus] = useState("");
    const [energyLevel, setLevelEnergy] = useState("");
    const [compatibilityWithOtherAnimals, setCompatibilityOtherAnimals] =
        useState("");
    const [activityLevel, setLevelActivity] = useState("");
    const [story, setStory] = useState("");
    const [residenceRequirements, setRequirementsResidence] = useState("");
    const [vaccinationStatus, setVaccinationSituation] = useState("");
    const [sterilizationStatus, setSterilizationSituation] = useState("");
    const [dewormingStatus, setDewormingSituation] = useState("");
    const [chipStatus, setChipSituation] = useState("");
    const [antiparasiteTreatmentStatus, setSituationAntiparasiteTreatment] =
        useState("");

    // Medias
    const [photoProfil, setPhotoProfil] = useState<File | Blob>();
    const [files, setFiles] = useState<({ uri: string; name: string; } | Blob)[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handlePhotoProfilChange = (event: { target: { files: any[] } }) => {
        const file = event.target.files[0];
        setPhotoProfil(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            const newFiles = Array.from(fileList).map((file: File) => {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    return {
                        uri: fileReader.result as string,
                        name: file.name,
                    };
                };
                fileReader.readAsDataURL(file);
                return { uri: "", name: file.name };
            });
            if (files.length + newFiles.length <= 8) {
                setFiles((prevFiles) => [...prevFiles, ...newFiles]);
            } else {
                alert("Vous ne pouvez pas sélectionner plus de 8 photos.");
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };


    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !name ||
            !species ||
            !breed ||
            !age ||
            !gender ||
            !location ||
            !weight ||
            !size ||
            !description ||
            !healthStatus ||
            !photoProfil
        ) {
            setErrorMessage("Veuillez remplir tous les champs obligatoires (*)");
            return;
        }

        const dataToSend = {
            name: name,
            species,
            breed,
            age: age as string,
            gender,
            weight: weight as string,
            size: size as string,
            color,
            location,
            description,
            healthStatus,
            energyLevel,
            compatibilityWithOtherAnimals,
            activityLevel,
            story,
            residenceRequirements,
            vaccinationStatus,
            sterilizationStatus,
            dewormingStatus,
            chipStatus,
            antiparasiteTreatmentStatus,
        };

        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) {
            console.error("Absence de token");
            setErrorMessage("Absence de token");
            return;
        }

        try {
            let url = client + "pet/create";
            if (id) {
                url = client + `pet/update/${id}`;
            }
            const response = await axios.post(url, dataToSend, {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
            });

            // Si la requête est réussie, envoyer la photo
            const petId = response.data.pet.id;
            if (petId && photoProfil) {
                let urlMedias = client + `pet/addMedias/${petId}`;
                if (id) {
                    urlMedias = client + `pet/updateMedias/${id}`;
                }
                const formData = new FormData();
                formData.append("photoProfil", photoProfil);

                const filePromises = files.map(async (file, index) => {
                    let blob: Blob;
                    let fileName: string;

                    if ("uri" in file) {
                        blob = await fetch(file.uri).then((r) => r.blob());
                        fileName = file.name;
                    } else if (file instanceof File) {
                        blob = file;
                        fileName = file.name || `file${index}`;
                    } else {
                        throw new Error("Invalid file type");
                    }


                    return { blob, fileName };
                });

                Promise.all(filePromises).then((fileInfos) => {
                    fileInfos.forEach(({ blob, fileName }, index) => {
                        formData.append(`file${index}`, blob, fileName);
                    });

                });
                const photoResponse = await axios.post(urlMedias, formData, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (photoResponse.status === 200) {
                    navigate("/pets");
                }
            }
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Une erreur s'est produite :", error);
                setErrorMessage(error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const createFileObject = async (item: { file: { url: string | URL | Request; publicId: string } }) => {
        const response = await fetch(item.file.url);
        const blob = await response.blob();
        return blob;
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(params.search);
        const formDataString = searchParams.get("id");
        if (formDataString) {
            PetsService.getPetById(formDataString).then((animal) => {
                const { result, profil, othersFiles } = animal;

                createFileObject(profil[0]).then((item) => {
                    setPhotoProfil(item);
                });

                setFiles([]);
                const filePromises = othersFiles.map((item: { file: any; id?: any; }) => createFileObject(item));

                Promise.all(filePromises).then((files) => {
                    setFiles(files);
                });

                setId(result._id);
                setName(result.name);
                setSpecies(result.species);
                setBreed(result.breed);
                setAge(result.age);
                setGender(result.gender);
                setWeight(result.weight);
                setSize(result.size);
                setColor(result.color);
                setLocation(result.location);
                setDescription(result.description);
                setHealthStatus(result.healthStatus);
                setLevelEnergy(result.energyLevel);
                setCompatibilityOtherAnimals(result.compatibilityWithOtherAnimals);
                setLevelActivity(result.activityLevel);
                setStory(result.story);
                setRequirementsResidence(result.residenceRequirements);
                setVaccinationSituation(result.vaccinationStatus);
                setSterilizationSituation(result.sterilizationStatus);
                setDewormingSituation(result.dewormingStatus);
                setChipSituation(result.chipStatus);
                setSituationAntiparasiteTreatment(result.antiparasiteTreatmentStatus);
            });
        }
    }, []);

    return (
        <div className="relative md:ml-64 bg-blueGray-50">
            <div className="mx-auto bg-white rounded-lg overflow-hidden ">
                <h1 className="text-2xl font-bold mb-6 px-6 pt-6">
                    Formulaire d'adoption d'animal
                </h1>
                {/* Message d'error */}
                {errorMessage ? (
                    <div
                        className="bg-red-100 border border-red-400 m-6 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">{errorMessage}</span>
                        <span
                            className="absolute top-0 bottom-0 right-0 px-4 py-3"
                            onClick={() => setErrorMessage("")}
                        >
                            <FaTimes
                                color="red"
                                className="fill-current h-6 w-6 text-red-500"
                            />
                        </span>
                    </div>
                ) : null}
                <form onSubmit={handleSubmit}>
                    <div className="md:flex">
                        <div className="mb-4 w-1/2">
                            <div
                                className="custum-file-upload-profil m-2 mx-auto justify-self-center"
                                style={
                                    photoProfil
                                        ? {
                                            backgroundImage: `url("${URL.createObjectURL(
                                                photoProfil
                                            )}")`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            border: 0,
                                        }
                                        : {}
                                }
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={() => handlePhotoProfilChange}
                                    className="hidden"
                                    id={`file-input-photoProfil`}
                                />
                                <label
                                    htmlFor={`file-input-photoProfil`}
                                    className="text-center contents justify-self-center cursor-pointer"
                                >
                                    {photoProfil && (
                                        <div className="bg-white rounded-full">
                                            <FaTimesCircle
                                                size={30}
                                                color="red"
                                                className="relative redButtonProfile"
                                                onClick={() => setPhotoProfil(undefined)}
                                            />
                                        </div>
                                    )}
                                    {!photoProfil && (
                                        <div className="m-auto">
                                            <AiOutlineCloudUpload size={80} color="grey" />
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className="mb-4 w-1/2">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="autresPhotos"
                            >
                                Autres photos:
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="autresPhotos"
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                            />
                            <ul className="mt-2">
                                {files.map((file, index) => {
                                    const objectUrl = file instanceof Blob ? URL.createObjectURL(file) : "";
                                    const fileName = (file as { uri: string; name: string; }).name || `Pet${index + 1}`;
                                    const styles = {
                                        backgroundImage: `url("${objectUrl}")`, backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        width: "40px",
                                        height: "30px",
                                    };
                                    return (
                                        <li key={index} className="flex items-center">
                                            <div className="w-full h-full" style={styles}></div>
                                            <span className="mx-2 my-2">
                                                {fileName ? fileName : `Pet${index + 1}`}
                                            </span>
                                            <span
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => removeFile(index)}
                                            >
                                                &#10006;
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="md:flex">
                        <div className="md:w-1/2 px-6 pb-8">
                            <div className="mb-4">
                                <InputForm
                                    label="Nom de l'animal:"
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <SelectForm
                                    label="Espèce:"
                                    id="species"
                                    value={species}
                                    onChange={(e) => setSpecies(e.target.value)}
                                    options={speciesOptions}
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    label="Race:"
                                    id="breed"
                                    type="text"
                                    value={breed}
                                    onChange={(e) => setBreed(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    label="Âge:"
                                    id="age"
                                    type="number"
                                    min={1}
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <SelectForm
                                    label="Genre:"
                                    id="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    options={gendersOptions}
                                />
                            </div>
                            <div className="mb-4">
                                <SelectForm
                                    label="Localisation:"
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    options={locationsOptions}
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    label="Poids:"
                                    id="weight"
                                    type="number"
                                    min={1}
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    label="Taille:"
                                    id="size"
                                    type="number"
                                    min={1}
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <InputForm
                                    label="Couleur:"
                                    id="color"
                                    type="text"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <TextAreaForm
                                    label="Description:"
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <TextAreaForm
                                    label="État de santé:"
                                    id="healthStatus"
                                    value={healthStatus}
                                    onChange={(e) => setHealthStatus(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <TextAreaForm
                                    label="Compatibilité avec d'autres animaux:"
                                    id="compatibilityWithOtherAnimals"
                                    value={compatibilityWithOtherAnimals}
                                    onChange={(e) => setCompatibilityOtherAnimals(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="md:w-1/2 px-6 pb-8">
                            <div className="mb-4">
                                <SelectForm
                                    label="Niveau d'activité:"
                                    id="activityLevel"
                                    value={activityLevel}
                                    onChange={(e) => setLevelActivity(e.target.value)}
                                    options={levelOptions}
                                />
                            </div>
                            <div className="mb-4">
                                <TextAreaForm
                                    label="Histoire de l'animal:"
                                    id="story"
                                    value={story}
                                    onChange={(e) => setStory(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <TextAreaForm
                                    label="Exigences de résidence:"
                                    id="residenceRequirements"
                                    value={residenceRequirements}
                                    onChange={(e) => setRequirementsResidence(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <TextAreaForm
                                    label="Situation de vaccination:"
                                    id="vaccinationStatus"
                                    value={vaccinationStatus}
                                    onChange={(e) => setVaccinationSituation(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <TextAreaForm
                                    label="Situation de stérilisation/castration:"
                                    id="sterilizationStatus"
                                    value={sterilizationStatus}
                                    onChange={(e) => setSterilizationSituation(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <TextAreaForm
                                    label="Situation de vermifugation:"
                                    id="dewormingStatus"
                                    value={dewormingStatus}
                                    onChange={(e) => setDewormingSituation(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <TextAreaForm
                                    label="Situation de puçage:"
                                    id="chipStatus"
                                    value={chipStatus}
                                    onChange={(e) => setChipSituation(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <TextAreaForm
                                    label="Situation de traitement anti-parasitaire:"
                                    id="antiparasiteTreatmentStatus"
                                    value={antiparasiteTreatmentStatus}
                                    onChange={(e) =>
                                        setSituationAntiparasiteTreatment(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <SelectForm
                                    label="Niveau d'énergie:"
                                    id="energyLevel"
                                    value={energyLevel}
                                    onChange={(e) => setLevelEnergy(e.target.value)}
                                    options={levelOptions}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-24">
                        <button
                            onClick={() => handleSubmit}
                            className="bg-transparent hover:bg-blue-500 text-blue-700 
                                font-semibold hover:text-white py-2 px-4 
                                border border-blue-500 hover:border-transparent rounded"
                        >
                            Confirmer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PetFom;
