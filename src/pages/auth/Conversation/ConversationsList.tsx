import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import { ConversationsService } from "../../../services/ConversationsService";
import { useSelector } from "react-redux";
import { getAuthState } from "../../../store/auth";

interface Message {
  _id: string;
  is_Seen: boolean;
  owner: string;
  message: string;
}

export default function ConversationsList() {
  const [listConversations, setListConversations] = useState<[]>();
  const { profile } = useSelector(getAuthState);

  const userTemplate = (conversation: {
    userUploads: any[];
    petInfo: {
      name:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | null
        | undefined;
    };
  }) => {
    const userFile = conversation.userUploads.find(
      (item: { category: string; profil: any }) =>
        item.profil == true && item.category == "User"
    );
    if (!userFile) {
      return (
        <div className="flex align-items-center gap-2">Image Not found</div>
      );
    }

    return (
      <div className="flex align-items-center gap-2">
        <img
          src={userFile.file.url}
          alt={userFile.file.url}
          className="relative inline-block h-12 w-12 rounded-full object-cover object-center"
        />
        <span className="font-semibold mt-3 ms-1">
          {conversation.petInfo.name}
        </span>
      </div>
    );
  };

  const petTemplate = (conversation: {
    petUploads: any[];
    fromUser: {
      name:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | null
        | undefined;
    };
  }) => {
    const petFile = conversation.petUploads.find(
      (item: { profil: any }) => item.profil == true
    );

    return (
      <div className="flex align-items-center gap-2">
        <img
          src={petFile.file.url}
          alt={petFile.file.url}
          className="relative inline-block h-12 w-12 rounded-full object-cover object-center"
        />
        <span className="font-semibold mt-3 ms-1">
          {conversation.fromUser.name}
        </span>
      </div>
    );
  };

  const renderHousingPhotos = (conversation: { userUploads: any[] }) => {
    const housingPhotos = conversation.userUploads.filter(
      (item) => item.category === "Residence"
    );

    return (
      <div className="flex gap-2">
        {housingPhotos.slice(0, 3).map((photo, index) => (
          <img
            key={index}
            src={photo.file.url}
            alt={`Housing ${index + 1}`}
            className="w-14 h-14 rounded-md"
          />
        ))}
      </div>
    );
  };

  const renderLastMessage = ({ messages }: { messages: Message[] }) => {
    if (!messages || messages.length === 0) {
      return (
        <div className="flex items-center gap-2">
          <p className="truncate w-40">Débutez la conversation</p>
        </div>
      );
    }

    const { is_Seen, owner, message } = messages[0];

    const messageClass =
      (is_Seen && owner != profile?.id)
        ? "truncate w-40 "
        : "truncate w-40 font-semibold";

    return (
      <div className="flex items-center gap-2">
        <p className={messageClass}>{message}</p>
        {is_Seen && owner != profile?.id ? (
          <div className="rounded-full bg-black h-2 w-2 relative right-8"></div>
        ) : null}
      </div>
    );
  };

  const renderActions = (conversation: { _id: any }) => {
    return (
      <Link
        to={`/conversation/${conversation._id}`}
        className="p-button p-component p-button-text p-button-rounded"
      >
        View Conversation
      </Link>
    );
  };

  function fetchListConversations() {
    ConversationsService.getConversationsOfCompany().then((data) => {
      setListConversations(data);
    });
  }

  useEffect(() => {
    fetchListConversations();
  }, []);

  return (
    <div className="relative md:ml-64 bg-blueGray-50">
      <div className="lg:flex gap-4 items-stretch m-6">
        <div className="flex flex-col justify-center items-center w-full pt-4">
          <div className=" mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
            <div className="relative flex flex-grow w-min pr-6 !flex-row items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center text-brand-500 dark:text-white">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                <p className="font-dm text-sm font-medium text-gray-600">
                  Matchs
                </p>
                <h4 className="text-xl text-center font-bold text-navy-700 dark:text-white">
                  0 
                </h4>
              </div>
            </div>
            <div className="relative flex flex-grow w-min pr-6 !flex-row items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center text-brand-500 dark:text-white">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      className="h-6 w-6"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                <p className="font-dm text-sm font-medium text-gray-600">
                  Signalements
                </p>
                <h4 className="text-xl text-center font-bold text-navy-700 dark:text-white">
                  0
                </h4>
              </div>
            </div>
            <div className="relative flex flex-grow w-min pr-6 !flex-row items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center text-brand-500 dark:text-white">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      className="h-6 w-6"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                <p className="font-dm text-sm font-medium text-gray-600">
                  Adoptions
                </p>
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                  0
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <DataTable value={listConversations}>
              <Column body={petTemplate} header="Animal"></Column>
              <Column body={userTemplate} header="Candidat"></Column>
              <Column
                body={renderHousingPhotos}
                header="Housing Photos"
              ></Column>
              <Column
                body={renderLastMessage}
                header="Dernier message"
              ></Column>
              <Column body={renderActions} header="Actions"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
