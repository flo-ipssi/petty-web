import React, { FC, useEffect, useRef, useState } from "react";
import { AnimalData } from "../../../@types/pet";
import { AiOutlineCloudUpload, AiOutlineCodepenCircle } from "react-icons/ai";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import { Keys, getFromAsyncStorage } from "../../../utils/asyncStorage";
import { useNavigate } from "react-router-dom";
import InputForm from "../../../components/form/InputForm";
import SelectForm from "../../../components/form/SelectForm";
import TextAreaForm from "../../../components/form/TextAreaForm";

interface PetFormProps {
    initialValues?: AnimalData | undefined;
}

const PetFom: FC<PetFormProps> = ({ initialValues }) => {
    const navigate = useNavigate();

    const [id, setId] = useState(initialValues?.name || "");
    const [name, setName] = useState(initialValues?.name || "");
    const [species, setSpecies] = useState(initialValues?.species || "");
    const [breed, setBreed] = useState(initialValues?.breed || "");
    const [age, setAge] = useState(initialValues?.age || null);
    const [gender, setGender] = useState(initialValues?.gender || "");
    const [weight, setWeight] = useState(initialValues?.weight || null);
    const [size, setSize] = useState(initialValues?.size || null);
    const [color, setColor] = useState(initialValues?.color || "");
    const [location, setLocation] = useState(initialValues?.location || "");
    const [description, setDescription] = useState(initialValues?.description || "");
    const [healthStatus, setHealthStatus] = useState(initialValues?.healthStatus || "");
    const [energyLevel, setLevelEnergy] = useState(initialValues?.energyLevel || "");
    const [compatibilityWithOtherAnimals, setCompatibilityOtherAnimals] = useState(initialValues?.compatibilityWithOtherAnimals || "");
    const [activityLevel, setLevelActivity] = useState(initialValues?.activityLevel || "");
    const [story, setStory] = useState(initialValues?.story || "");
    const [residenceRequirements, setRequirementsResidence] = useState(initialValues?.residenceRequirements || "");
    const [vaccinationStatus, setVaccinationSituation] = useState(initialValues?.vaccinationStatus || "");
    const [sterilizationStatus, setSterilizationSituation] = useState(initialValues?.sterilizationStatus || "");
    const [dewormingStatus, setDewormingSituation] = useState(initialValues?.dewormingStatus || "");
    const [chipStatus, setChipSituation] = useState(initialValues?.chipStatus || "");
    const [
        antiparasiteTreatmentStatus,
        setSituationAntiparasiteTreatment,
    ] = useState(initialValues?.antiparasiteTreatmentStatus || "");

    // Options array 
    const speciesOptions = [
        { value: 'chien', label: 'Chien' },
        { value: 'chat', label: 'Chat' },
        { value: 'autre', label: 'Autre' }
    ];

    const gendersOptions = [
        { value: 'male', label: 'Mâle' },
        { value: 'femelle', label: 'Femelle' }
    ];

    const levelOptions = [
        { value: 'faible', label: 'Faible' },
        { value: 'moyen', label: 'Moyen' },
        { value: 'élevé', label: 'Élevé' }
    ];

    const locationsOptions = [
        { value: 'paris', label: 'Chien' },
        { value: 'lyon', label: 'Chat' },
        { value: 'marseille', label: 'Autre' }
    ];

    // Medias
    const [photoProfil, setPhotoProfil] = useState(null);
    const [files, setFiles] = useState<{ uri: string; name: string }[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState('');

    const handlePhotoProfilChange = (event: { target: { files: any[] } }) => {
        const file = event.target.files[0];
        setPhotoProfil(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            const newFiles = Array.from(fileList);
            if (files.length + newFiles.length <= 8) {
                setFiles(prevFiles => [...prevFiles, ...newFiles]);
            } else {
                alert("Vous ne pouvez pas sélectionner plus de 8 photos.");
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const removeFile = (indexToRemove: number) => {
        const newFiles = files.filter((_, index) => index !== indexToRemove);
        setFiles(newFiles);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !name ||
            !species ||
            !breed ||
            !age ||
            !gender ||
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
            age: age.toString(),
            gender,
            weight: weight.toString(),
            size: size.toString(),
            color,
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
            antiparasiteTreatmentStatus
        };

        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) {
            console.error('Absence de token');
            return;
        };

        try {
            const response = await axios.post('http://localhost:8989/pet/create', dataToSend, {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
            });


            // Si la requête est réussie, envoyer la photo
            const petId = response.data.pet.id;
            if (petId && photoProfil) {
                const formData = new FormData();
                formData.append('photoProfil', photoProfil);
                files.forEach((file, index) => {
                    formData.append(`file${index}`, file);
                });

                const photoResponse = await axios.post(`http://localhost:8989/pet/addMedias/${petId}`, formData, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${token}`,
                    },
                }).then(() => {
                    navigate('/pets', { state: "success" });
                });
                console.log(photoResponse);
            }
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
        }

    };

    useEffect(() => {
        if (initialValues && initialValues?.id) {
            setId(initialValues.id);
            setName(initialValues.name);
            setSpecies(initialValues.species);
            setBreed(initialValues.breed);
            setAge(initialValues.age);
            setGender(initialValues.gender);
            setWeight(initialValues.weight);
            setSize(initialValues.size);
            setColor(initialValues.color);
            setDescription(initialValues.description);
            setHealthStatus(initialValues.healthStatus);
            setLevelEnergy(initialValues.energyLevel);
            setCompatibilityOtherAnimals(initialValues.compatibilityWithOtherAnimals);
            setLevelActivity(initialValues.activityLevel);
            setStory(initialValues.story);
            setRequirementsResidence(initialValues.residenceRequirements);
            setVaccinationSituation(initialValues.vaccinationStatus);
            setSterilizationSituation(initialValues.sterilizationStatus);
            setDewormingSituation(initialValues.dewormingStatus);
            setChipSituation(initialValues.chipStatus);
            setSituationAntiparasiteTreatment(
                initialValues.antiparasiteTreatmentStatus
            );
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
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setErrorMessage('')}>
                            <FaTimes color="red" className="fill-current h-6 w-6 text-red-500" />
                        </span>
                    </div>) : null}
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
                                        : null
                                }
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoProfilChange}
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
                                                onClick={() => setPhotoProfil(null)}
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
                                {files.map((file, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="mr-2">{file.name}</span>
                                        <span
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => removeFile(index)}
                                        >
                                            &#10006;
                                        </span>
                                    </li>
                                ))}
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
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    min={0}
                                />
                            </div>
                            <div className="mb-4">
                                <InputForm
                                    label="Taille:"
                                    id="size"
                                    type="number"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    min={0} // Ajout de la valeur min pour le champ de taille
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
                                    onChange={(e) => setSituationAntiparasiteTreatment(e.target.value)}
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
