import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { PetsService } from "../../../services/PetsService";
import { Tag } from "primereact/tag";
import {
  FaTimes,
  FaPenSquare,
  FaPlus,
  FaHospital,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ConfirmationForm from "../../../components/form/ConfirmationForm";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

export default function Pets() {
  const [animals, setAnimals] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const showMenu = (
    visibility: boolean | ((prevState: boolean) => boolean)
  ) => {
    setMenuVisible(visibility);
  };

  const imageBodyTemplate = (animal: {
    uploads: any[];
    name: any;
  }) => {
    const avatar = animal.uploads.find(
      (media: { profil: boolean }) => media.profil === true
    );
    if (avatar) {

      const cacheHandler = "?lastmod=" + Math.floor(Date.now() / 1000);
      return (
        <div className="flex align-items-center gap-2 capitalize">
          <img
            src={avatar.file.url + cacheHandler}
            alt={avatar}
            className="w-10 rounded"
          />
          <span>{animal.name}</span>
        </div>
      );
    }
    return null
  };

  const deleteItem = (index) => { };

  const handlePetTemplate = (animal: any) => {
    // const dataString = encodeURIComponent(JSON.stringify(animal));
    return (
      <div className="flex align-items-center gap-2">
        <button
          onClick={() => {
            showMenu(true);
            setAnimal(animal);
          }}
          className="p-button font-bold bg-blue-600 p-2"
        >
          <FaEye color="white" />
        </button>
        <Link to={`/pet/form?id=${animal._id}`}>
          <div className="p-button font-bold bg-orange-600 p-2">
            <FaPenSquare color="white" />
          </div>
        </Link>
        <button
          className="p-button font-bold bg-red-600 p-2"
          onClick={() => handleDeletPet(animal._id)}
        >
          <FaTimes color="white" />
        </button>
      </div>
    );
  };

  const handleDisplayPopUp = (uploads: any[]) => {
    const photo = uploads.filter((upload) => upload.profil == true)[0];
    return photo.file.url;
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

  const handleDeletPet = (item: any) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const deletePet = () => {
    if (itemToDelete) {
      console.log(`Suppression de l'élément : ${itemToDelete}`);

      PetsService.deletePetById(itemToDelete).then((data) => {
        fetchListPets();
        setItemToDelete(null);
        setIsModalOpen(false);
        console.log(data);
      });
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  function fetchListPets() {
    PetsService.getPetsOfCompany().then((data) => {
      setAnimals(data);
    });
  }

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="pb-4 flex-row dark:bg-gray-900">
        <div className=" mt-1">
          <span className="p-input-icon-left">
            <FaSearch size={18} />
            <InputText
              id="table-search"
              className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="search"
              value={value || ""}
              onChange={(e) => onGlobalFilterChange(e)}
              placeholder="Search for items"
            />
          </span>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  useEffect(() => {
    fetchListPets();
    setLoading(false);
  }, []);

  return (
    <div>
      <ConfirmationForm
        isOpen={isModalOpen}
        onCancel={cancelDelete}
        onConfirm={deletePet}
      />
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
                        src={handleDisplayPopUp(animal?.uploads)}
                        alt={animal?.name}
                        className="w-64 h-64 object-cover mr-4"
                      />
                      <div>
                        <p className="capitalize">
                          <strong>Nom :</strong> {animal?.name}
                        </p>
                        <p className="capitalize">
                          <strong>Espece :</strong> {animal?.species}
                        </p>
                        <p className="capitalize">
                          <strong>Race :</strong> {animal?.breed}
                        </p>
                        <p className="capitalize">
                          <strong>Âge :</strong> {animal?.age}
                        </p>
                        <p className="capitalize">
                          <strong>Sexe :</strong> {animal?.gender}
                        </p>
                        <p className="capitalize">
                          <strong>Poids :</strong> {animal?.weight} kg
                        </p>
                        <p className="capitalize">
                          <strong>Taille :</strong> {animal?.size} cm
                        </p>
                        <p>
                          <strong>Couleur :</strong> {animal?.color}
                        </p>
                        <p>
                          <strong>Description :</strong> {animal?.description}
                        </p>
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
          <div
            className="mt-4 bg-green-200 border-green-400 text-green-700 border-l-4 p-4"
            role="alert"
          >
            <p className="font-bold">Succès !</p>
            <p>{successMessage}</p>
          </div>
        )}
        <div className="lg:flex gap-4 items-stretch m-6">
          <div className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[35%]">
            <div className="flex justify-center items-center space-x-5 h-full">
              <div>
                <p>Nombre d'animaux</p>
                <h2 className="text-4xl font-bold text-gray-600">
                  {animal.length > 0 ? animal.length : 0}
                </h2>
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
                </div>
                <DataTable
                  header={header}
                  filters={filters}
                  onFilter={(e) => setFilters(e.filters)}
                  className="flex-auto block py-8 pt-6 px-9 text-center"
                  value={animals}
                  scrollable
                  scrollHeight="400px"
                  style={{ minWidth: "50rem" }}
                >
                  <Column header="Nom" body={imageBodyTemplate}></Column>
                  <Column
                    field="species"
                    header="Type"
                    bodyClassName={"capitalize"}
                  ></Column>
                  <Column
                    field="breed"
                    header="Race"
                    bodyClassName={"capitalize"}
                  ></Column>
                  <Column
                    field="gender"
                    header="Genre"
                    bodyClassName={"capitalize text-center"}
                  ></Column>
                  <Column
                    field="age"
                    header="Age"
                    bodyClassName={"capitalize text-center"}
                  ></Column>
                  <Column
                    field="size"
                    header="Taille (cm)"
                    bodyClassName={"capitalize text-center"}
                  ></Column>
                  <Column
                    header="Status"
                    body={statusBodyTemplate}
                    bodyClassName={"capitalize"}
                  ></Column>
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
