import { FC, useEffect, useState } from 'react';
import icon from "../../assets/images/Adopt.png";
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { FaEye, FaSearch, FaTimes } from 'react-icons/fa';
import { Tag } from 'primereact/tag';
import { PetsService } from '../../services/PetsService';
import { InputText } from 'primereact/inputtext';
import ListModal from '../../components/ListModal/ListModal';


interface Animal {
  _id: string;
  candidates: any;
}
interface MatchingProps { }

const Matching: FC<MatchingProps> = () => {
  const [animals, setAnimals] = useState([]);
  const [currentAnimal, setCurrentAnimal] = useState("");
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  // Modal Config 
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [listCandidate, setListCandidate] = useState<any[]>([]);


  const openModal = (candidates: any) => {
    const listArray = Array.isArray(candidates) ? candidates : [candidates];
    setListCandidate(listArray);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const imageBodyTemplate = (animal: {
    uploads: any[];
    name: any;
  }) => {
    const avatar = animal.uploads.find(
      (media: { profil: boolean }) => media.profil === true
    );
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
  };

  const handlePetTemplate = (animal: Animal) => {
    return (
      <div className="flex align-items-center gap-2">
        <button
          onClick={() => { setCurrentAnimal(animal._id); openModal(animal.candidates); }}
          className="p-button font-bold bg-blue-600 p-2"
        >
          <FaEye color="white" />
        </button>
        <button
          className="p-button font-bold bg-red-600 p-2"
        // onClick={() => {openModal}}
        >
          <FaTimes color="white" />
        </button>
      </div>
    );
  };

  const candidateLengthTemplate = (animal: { likes: string | any[]; }) => {
    const likesArray = Array.isArray(animal.likes) ? animal.likes : [animal.likes];
    const lengthCandidate = likesArray.length;

    return <Tag value={lengthCandidate} severity="success" className='m-auto'></Tag>;
  };

  function fetchListPets() {
    PetsService.getPetsOfCompanyLiked().then((data) => {
      setAnimals(data);
    });
  }

  const onGlobalFilterChange = (event: any) => {
    const value = event.target.value;
    let _filters = { ...filters };
    if ('value' in _filters['global']) {
      _filters['global'].value = value;
    }

    setFilters(_filters);
  };

  const renderHeader = () => {
    const globalFilter = filters["global"];
    const value = globalFilter && "value" in globalFilter ? globalFilter.value : "";

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
              placeholder="Affinez les recherches"
            />
          </span>
        </div>
      </div>
    );
  };

  const header = renderHeader();


  useEffect(() => {

    fetchListPets()
  }, [])
  return (
    <div className="relative md:ml-64 bg-blueGray-50">
      <ListModal isOpen={modalIsOpen} onRequestClose={closeModal} list={listCandidate} petId={currentAnimal} />
      <nav
        className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
      >
        <div
          className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
        >
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="./index.html"
          >Matching</a>
          <ul
            className="flex-col md:flex-row list-none items-center hidden md:flex"
          >
            <a className="text-blueGray-500 block" href="#pablo" >
              <div className="items-center flex">
                <span
                  className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
                ><img
                    alt="..."
                    className="w-full rounded-full align-middle border-none shadow-lg"
                    src={icon}
                  /></span>
              </div>
            </a>
            <div
              className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
              // style="min-width: 12rem;"
              id="user-dropdown"
            >
              <a
                href="#pablo"
                className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Action</a>
              <a
                href="#pablo"
                className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              >Another action</a>
              <a
                href="#pablo"
                className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              >Something else here</a>
              <div className="h-0 my-2 border border-solid border-blueGray-100"></div>
              <a
                href="#pablo"
                className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              >Seprated link</a >
            </div>
          </ul>
        </div>
      </nav>
      <div className="relative bg-pink-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          Candidature
                        </h5>
                        <span className="font-semibold text-xl text-blueGray-700">
                          350,897
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                          <i className="far fa-chart-bar"></i>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                      <span className="text-emerald-500 mr-2">
                        <i className="fas fa-arrow-up"></i> 3.48%
                      </span>
                      <span className="whitespace-nowrap">
                        Since last month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          Le plus demandé
                        </h5>
                        <span className="font-semibold text-xl text-blueGray-700">
                          Charlie
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <img src={icon} className=' shadow-lg rounded-full  w-12 h-12' />
                      </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                      <span className="mr-2">
                        <i className="fas fa-arrow-down"></i> 350
                      </span>
                      <span className="whitespace-nowrap text-green-500">
                        Likes
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-10 mx-auto w-full -m-4">
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
          <Column header="Animal" body={imageBodyTemplate}></Column>
          <Column
            field="species"
            header="Type"
            bodyClassName={"capitalize"}
          ></Column>
          <Column
            header="Status"
            body={candidateLengthTemplate}
            bodyClassName={"capitalize"}
          ></Column>
          <Column header="Choix" body={handlePetTemplate}></Column>
        </DataTable>
      </div>
    </div>
  )
};

export default Matching;
