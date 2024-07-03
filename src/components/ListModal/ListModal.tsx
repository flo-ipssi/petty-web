import { FC, useEffect, useState } from "react";
import Modal from "react-modal";
import "./ListModal.scss";
import ListComponent from "./ListComponent";
import { Keys, getFromAsyncStorage } from "../../utils/asyncStorage";
import axios from "axios";
import AlertForm from "../form/AlertForm";

interface ListModalProps {
  petId: string;
  isOpen: boolean;
  onRequestClose: any;
  list: any;
}


const ListModal: FC<ListModalProps> = ({ isOpen, onRequestClose, list, petId }) => {
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [listCandidates, setListCandidates] = useState(list);


  const startConversation = async (data: any, petId: string) => {
    const form = {
      from: data._id,
      toPet: petId,
      status: "accept"
    };
  
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      const response = await axios.post(
        `http://localhost:8989/conversation/create`, form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données des animaux :",
        error
      );
      return null;
    }
  };
  
  
  
  const deleteConversation = async ( data: any, petId: string, index: number) => {
    const form = {
      from: data._id,
      toPet: petId,
      status: "refused"
    };
  
  
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      const response = await axios.post(
        `http://localhost:8989/conversation/delete/`,form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.status === 200) {
        const updatedCandidates = [...listCandidates];
        updatedCandidates.splice(index, 1);
        setListCandidates(updatedCandidates);
      }
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données des animaux :",
        error
      );
      return null;
    }
  };
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="ListModal"
    >
      <button onClick={onRequestClose} className="modal-close-button">
        &times;
      </button>
      <h2 className="text-center p-4 uppercase">Liste des candidats</h2>
      <div className="listCandidate overflow-y">
        {listCandidates?.map((item: any, index: number) => (
          <ListComponent
            data={item}
            index={index}
            startConversation={() => startConversation(item, petId)}
            deleteConversation={() => deleteConversation(item, petId, index)}
          />
        ))}
      </div>
      <div className="modal-buttons">
        <button onClick={onRequestClose} className="modal-button">
          Fermer
        </button>
      </div>

      <AlertForm type='success' visible={showAlert} message="test" />
    </Modal>
  );
};

export default ListModal;
