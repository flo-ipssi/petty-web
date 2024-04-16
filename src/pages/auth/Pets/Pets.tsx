import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { PetsService } from "../../../services/PetsService";
import { Tag } from "primereact/tag";
import {
  FaBullseye,
  FaCheck,
  FaTimes,
  FaPenSquare,
  FaPlus,
  FaHospital,
  FaEye,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Pets() {
  const [animals, setAnimals] = useState([]);
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  const [successMessage, setSuccessMessage] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const showMenu = (visibility) => {
    setMenuVisible(visibility);
  };

  const imageBodyTemplate = (animal: {
    uploads: any[];
    name:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | null
      | undefined;
  }) => {
    const avatar = animal.uploads.find(
      (media: { profil: boolean }) => media.profil === true
    );
    return (
      <div className="flex align-items-center gap-2 capitalize">
        <img src={avatar.file.url} alt={avatar} className="w-10 rounded" />
        <span >{animal.name}</span>
      </div>
    );
  };

  // Fonction pour supprimer un élément de la liste
  const deleteItem = (index) => {};

  const handlePetTemplate = (animal) => {
    return (
      <div className="flex align-items-center gap-2">
        <button
          onClick={() => showMenu(true)}
          className="p-button font-bold bg-blue-600 p-2"
        >
          <FaEye color="white" />
        </button>

        <Link to={{ pathname: "/pet/form" }}>
          <div className="p-button font-bold bg-orange-600 p-2">
            <FaPenSquare color="white" />
          </div>
        </Link>
        <button
          className="p-button font-bold bg-red-600 p-2"
          onClick={() => deleteItem(animal.id)}
        >
          <FaTimes color="white" />
        </button>
      </div>
    );
  };

  const statusBodyTemplate = (product: { status: string }) => {
    return <Tag value={product.status} severity={getSeverity(product)}></Tag>;
  };

  const getSeverity = (product: { status: string }) => {
    switch (product.status) {
      case "available":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";
    }
  };
  useEffect(() => {
    PetsService.getPetsOfCompany().then((data) => {
      setAnimals(data);
      console.log(data);
    });

    // Pour la modal , vous pouvez appeler votre API pour récupérer
    // les détails de l'animal en utilisant l'ID de l'animal dans match.params.animalId
    // Exemple :
    // fetchAnimalDetails(match.params.animalId).then((data) => {
    //   setAnimal(data);
    //   setLoading(false);
    // });
    // Assurez-vous d'ajuster cette logique à votre cas d'utilisation réel
    // Pour l'instant, je vais simplement simuler des données
    // const simulatedAnimalData = {
    //     id: "Math.params.animalId",
    //     name: 'Fido',
    //     espece: 'Chien',
    //     race: 'Labrador',
    //     age: 3,
    //     sexe: 'Mâle',
    //     poids: 25,
    //     taille: 60,
    //     couleur: 'Noir',
    //     description: 'Un chien très sympathique et joueur.',
    //     // Ajoutez d'autres champs si nécessaire
    // };
    // setAnimal(simulatedAnimalData);
    setLoading(false);
  }, []);
  // }, [match.params.animalId]);

  return (
    <div>
      <div className="relative z-10 flex justify-center items-center">
        {menuVisible && (
          <div className="w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0">
            <div className="2xl:container 2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
              <div className="w-96 md:w-auto dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
                <button onClick={() => showMenu(false)}>
                  <FaTimes
                    size={30}
                    className="w-20 md:w-24 lg:w-28 absolute right-0 top-10"
                  ></FaTimes>
                </button>
                {loading ? (
                  <p>Chargement...</p>
                ) : (
                  <div className="p-6">
                    <div className="flex mb-4">
                      {/* <img src={`https://example.com/animals/${animal?.id}/image`} alt={animal?.name} className="w-64 h-64 object-cover mr-4" /> */}
                      <img
                        src={`https://media.4-paws.org/1/c/e/f/1cefbff8cb079a4864a0745d0daf040baf2cd50a/IMG_20190721_172034-2976x2060-1920x1329.jpg`}
                        alt={animal?.name}
                        className="w-64 h-64 object-cover mr-4"
                      />
                      <div>
                        <p>
                          <strong>Nom :</strong> {animal?.name}
                        </p>
                        <p>
                          <strong>Espece :</strong> {animal?.species}
                        </p>
                        <p>
                          <strong>Race :</strong> {animal?.breed}
                        </p>
                        <p>
                          <strong>Âge :</strong> {animal?.age}
                        </p>
                        <p>
                          <strong>Sexe :</strong> {animal?.sex}
                        </p>
                        <p>
                          <strong>Poids :</strong> {animal?.weight} kg
                        </p>
                        <p>
                          <strong>Taille :</strong> {animal?.size} cm
                        </p>
                        <p>
                          <strong>Couleur :</strong> {animal?.color}
                        </p>
                        <p>
                          <strong>Description :</strong> {animal?.description}
                        </p>
                        {/* Ajoutez d'autres champs si nécessaire */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative md:ml-64 bg-blueGray-50">
        
                {/* Message de succès */}
                {successMessage && (
                    <div className="mt-4 bg-green-200 border-green-400 text-green-700 border-l-4 p-4" role="alert">
                        <p className="font-bold">Succès !</p>
                        <p>{successMessage}</p>
                    </div>
                )}
        <div className="lg:flex gap-4 items-stretch m-6">
          <div className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[35%]">
            <div className="flex justify-center items-center space-x-5 h-full">
              <div>
                <p>Nombre d'animaux</p>
                <h2 className="text-4xl font-bold text-gray-600">523</h2>
              </div>
              <FaHospital size={50} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg xs:mb-4 max-w-full shadow-md lg:w-[65%]">
            <div className="flex flex-wrap justify-between h-full">
              <div className="flex-1 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                <h2 className="text-4xl font-bold text-white">523</h2>
                <p className="text-white">Adopt</p>
              </div>

              <div className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                <i className="fas fa-exchange-alt text-white text-4xl"></i>
                <p className="text-white">Transferir</p>
              </div>

              <div className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                <i className="fas fa-qrcode text-white text-4xl"></i>
                <p className="text-white">Canjear</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full px-3 mb-6  mx-auto">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
              <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                  <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                    <span className="mr-3 font-semibold text-dark">
                      Liste des animaux
                    </span>
                    <Link
                      to={{ pathname: "/pet/form" }}
                      className="text-white p-button font-bold bg-cyan-600 p-2 mt-2"
                    >
                      <FaPlus color="white" className="me-2" /> Ajouter un
                      animal
                    </Link>
                  </h3>

                  <div className="pb-4 bg-white dark:bg-gray-900">
                    <label htmlFor="table-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="table-search"
                        className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items"
                      />
                    </div>
                  </div>
                </div>
                <DataTable
                  className="flex-auto block py-8 pt-6 px-9 text-center"
                  value={animals}
                  scrollable
                  scrollHeight="400px"
                  style={{ minWidth: "50rem" }}
                >
                  <Column header="Nom" body={imageBodyTemplate}></Column>
                  <Column field="species" header="Type" bodyClassName={'capitalize'}></Column>
                  <Column field="breed" header="Race" bodyClassName={'capitalize'}></Column>
                  <Column field="gender" header="Age" bodyClassName={'capitalize'}></Column>
                  <Column field="size" header="Taille (cm)"></Column>
                  <Column header="Status" body={statusBodyTemplate}  bodyClassName={'capitalize'}></Column>
                  <Column header="Edition" body={handlePetTemplate}></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
