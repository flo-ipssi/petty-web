import React, { FC, useEffect, useRef, useState } from "react";
import { AnimalData } from "../../../@types/pet";
import { AiOutlineCloudUpload, AiOutlineCodepenCircle } from "react-icons/ai";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import { Keys, getFromAsyncStorage } from "../../../utils/asyncStorage";

interface PetFormProps {
    initialValues?: AnimalData | undefined;
    onSubmit?: void;
}

const PetFom: FC<PetFormProps> = ({ initialValues, onSubmit }) => {
    const [nom, setNom] = useState(initialValues?.nom || "");
    const [espece, setEspece] = useState(initialValues?.espece || "");
    const [race, setRace] = useState(initialValues?.race || "");
    const [age, setAge] = useState(initialValues?.age || null);
    const [sexe, setSexe] = useState(initialValues?.sexe || "");
    const [poids, setPoids] = useState(initialValues?.poids || null);
    const [taille, setTaille] = useState(initialValues?.taille || null);
    const [couleur, setCouleur] = useState(initialValues?.couleur || "");
    const [description, setDescription] = useState(initialValues?.description || "");
    const [etatSante, setEtatSante] = useState(initialValues?.etatSante || "");
    const [niveauEnergie, setNiveauEnergie] = useState(initialValues?.niveauEnergie || "");
    const [compatibiliteAutresAnimaux, setCompatibiliteAutresAnimaux] = useState(initialValues?.compatibiliteAutresAnimaux || "");
    const [niveauActivite, setNiveauActivite] = useState(initialValues?.niveauActivite || "");
    const [histoire, setHistoire] = useState(initialValues?.histoire || "");
    const [exigencesResidence, setExigencesResidence] = useState(initialValues?.exigencesResidence || "");
    const [situationVaccination, setSituationVaccination] = useState(initialValues?.situationVaccination || "");
    const [situationSterilisation, setSituationSterilisation] = useState(initialValues?.situationSterilisation || "");
    const [situationVermifugation, setSituationVermifugation] = useState(initialValues?.situationVermifugation || "");
    const [situationPucage, setSituationPucage] = useState(initialValues?.situationPucage || "");
    const [
        situationTraitementAntiParasitaire,
        setSituationTraitementAntiParasitaire,
    ] = useState(initialValues?.situationTraitementAntiParasitaire || "");

    // Medias
    const [photoProfil, setPhotoProfil] = useState(null);
    const [files, setFiles] = useState<{ uri: string; name: string }[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handlePhotoProfilChange = (event: { target: { files: any[] } }) => {
        const file = event.target.files[0];
        setPhotoProfil(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            const newFiles = Array.from(fileList);
            if (files.length + newFiles.length <= 8) {
                // Récupérer les URI et les noms des nouveaux fichiers
                const newFilesData = newFiles.map(file => ({
                  uri: URL.createObjectURL(file),
                  name: file.name
                }));
                // Ajouter les nouveaux fichiers à la liste des fichiers
                setFiles([...files, ...newFilesData]);
            } else {
                alert("Vous ne pouvez pas sélectionner plus de 8 photos.");
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
        console.log(files);
        
    };

    const removeFile = (indexToRemove: number) => {
        const newFiles = files.filter((_, index) => index !== indexToRemove);
        setFiles(newFiles);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (
            !nom ||
            !espece ||
            !race ||
            !age ||
            !sexe ||
            !poids ||
            !taille ||
            !photoProfil
        ) {
            setErrorMessage("Veuillez remplir tous les champs obligatoires (*)");
            return;
        }

        const formData = new FormData();
        formData.append('name', nom);
        formData.append('espece', espece);
        formData.append('race', race);
        formData.append('age', age.toString());
        formData.append('sexe', sexe);
        formData.append('poids', poids.toString());
        formData.append('taille', taille.toString());
        formData.append('couleur', couleur);
        formData.append('description', description);
        formData.append('etatSante', etatSante);
        formData.append('niveauEnergie', niveauEnergie);
        formData.append('compatibiliteAutresAnimaux', compatibiliteAutresAnimaux);
        formData.append('niveauActivite', niveauActivite);
        formData.append('histoire', histoire);
        formData.append('exigencesResidence', exigencesResidence);
        formData.append('situationVaccination', situationVaccination);
        formData.append('situationSterilisation', situationSterilisation);
        formData.append('situationVermifugation', situationVermifugation);
        formData.append('situationPucage', situationPucage);
        formData.append('situationTraitementAntiParasitaire', situationTraitementAntiParasitaire);
        formData.append('photoProfil', photoProfil);
        files.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });

        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) {
            console.error('Absence de token');
            return;
        };

        try {
            
            const response = await axios.post('http://localhost:8989/pet/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);

        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
        }

        console.log(formData);
    };

    useEffect(() => {
        if (initialValues) {
            setNom(initialValues.nom);
            setEspece(initialValues.espece);
            setRace(initialValues.race);
            setAge(initialValues.age);
            setSexe(initialValues.sexe);
            setPoids(initialValues.poids);
            setTaille(initialValues.taille);
            setCouleur(initialValues.couleur);
            setDescription(initialValues.description);
            setEtatSante(initialValues.etatSante);
            setNiveauEnergie(initialValues.niveauEnergie);
            setCompatibiliteAutresAnimaux(initialValues.compatibiliteAutresAnimaux);
            setNiveauActivite(initialValues.niveauActivite);
            setHistoire(initialValues.histoire);
            setExigencesResidence(initialValues.exigencesResidence);
            setSituationVaccination(initialValues.situationVaccination);
            setSituationSterilisation(initialValues.situationSterilisation);
            setSituationVermifugation(initialValues.situationVermifugation);
            setSituationPucage(initialValues.situationPucage);
            setSituationTraitementAntiParasitaire(
                initialValues.situationTraitementAntiParasitaire
            );
        }
    }, []);

    return (
        <div className="relative md:ml-64 bg-blueGray-50">
            <div className="mx-auto bg-white rounded-lg overflow-hidden ">
                <h1 className="text-2xl font-bold mb-6 px-6 pt-6">
                    Formulaire d'adoption d'animal
                </h1>
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
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => removeFile(index)}
                                        >
                                            &#10006;
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="md:flex">
                        <div className="md:w-1/2 px-6 pb-8">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="nom"
                                >
                                    Nom de l'animal:
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nom"
                                    type="text"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="espece"
                                >
                                    Espèce:
                                </label>
                                <select
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="espece"
                                    value={espece}
                                    onChange={(e) => setEspece(e.target.value)}
                                >
                                    <option value="">Sélectionner une espèce</option>
                                    <option value="chien">Chien</option>
                                    <option value="chat">Chat</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="race"
                                >
                                    Race:
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="race"
                                    type="text"
                                    value={race}
                                    onChange={(e) => setRace(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="age"
                                >
                                    Âge:
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="age"
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="sexe"
                                >
                                    Sexe:
                                </label>
                                <select
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="sexe"
                                    value={sexe}
                                    onChange={(e) => setSexe(e.target.value)}
                                >
                                    <option value="">Sélectionner le sexe</option>
                                    <option value="male">Mâle</option>
                                    <option value="femelle">Femelle</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="poids"
                                >
                                    Poids:
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="poids"
                                    type="number"
                                    value={poids}
                                    onChange={(e) => setPoids(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="taille"
                                >
                                    Taille:
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="taille"
                                    type="number"
                                    value={taille}
                                    onChange={(e) => setTaille(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="couleur"
                                >
                                    Couleur:
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="couleur"
                                    type="text"
                                    value={couleur}
                                    onChange={(e) => setCouleur(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="description"
                                >
                                    Description:
                                </label>
                                <textarea
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="etatSante"
                                >
                                    État de santé:
                                </label>
                                <textarea
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="etatSante"
                                    value={etatSante}
                                    onChange={(e) => setEtatSante(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="compatibiliteAutresAnimaux"
                                >
                                    Compatibilité avec d'autres animaux:
                                </label>
                                <textarea
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="compatibiliteAutresAnimaux"
                                    value={compatibiliteAutresAnimaux}
                                    onChange={(e) =>
                                        setCompatibiliteAutresAnimaux(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="md:w-1/2 px-6 pb-8">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="niveauActivite"
                                >
                                    Niveau d'activité:
                                </label>
                                <select
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="niveauActivite"
                                    value={niveauActivite}
                                    onChange={(e) => setNiveauActivite(e.target.value)}
                                >
                                    <option value="">Sélectionner un niveau d'activité</option>
                                    <option value="faible">Faible</option>
                                    <option value="moyen">Moyen</option>
                                    <option value="élevé">Élevé</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="histoire"
                                >
                                    Histoire de l'animal:
                                </label>
                                <textarea
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="histoire"
                                    value={histoire}
                                    onChange={(e) => setHistoire(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="exigencesResidence"
                                >
                                    Exigences de résidence:
                                </label>
                                <textarea
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="exigencesResidence"
                                    value={exigencesResidence}
                                    onChange={(e) => setExigencesResidence(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="situationVaccination"
                                >
                                    Situation de vaccination:
                                </label>
                                <textarea
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="situationVaccination"
                                    value={situationVaccination}
                                    onChange={(e) => setSituationVaccination(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="situationSterilisation"
                                >
                                    Situation de stérilisation/castration:
                                </label>
                                <textarea
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="situationSterilisation"
                                    value={situationSterilisation}
                                    onChange={(e) => setSituationSterilisation(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="situationVermifugation"
                                >
                                    Situation de vermifugation:
                                </label>
                                <textarea
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="situationVermifugation"
                                    value={situationVermifugation}
                                    onChange={(e) => setSituationVermifugation(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="situationPucage"
                                >
                                    Situation de puçage:
                                </label>
                                <textarea
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="situationPucage"
                                    value={situationPucage}
                                    onChange={(e) => setSituationPucage(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="situationTraitementAntiParasitaire"
                                >
                                    Situation de traitement anti-parasitaire:
                                </label>
                                <textarea
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="situationTraitementAntiParasitaire"
                                    value={situationTraitementAntiParasitaire}
                                    onChange={(e) =>
                                        setSituationTraitementAntiParasitaire(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="niveauEnergie"
                                >
                                    Niveau d'énergie:
                                </label>
                                <select
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="niveauEnergie"
                                    value={niveauEnergie}
                                    onChange={(e) => setNiveauEnergie(e.target.value)}
                                >
                                    <option value="">Sélectionner un niveau d'énergie</option>
                                    <option value="faible">Faible</option>
                                    <option value="moyen">Moyen</option>
                                    <option value="élevé">Élevé</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-24">
                        <button
                            type="submit"
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
