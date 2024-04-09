import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PetsService } from "../../../services/PetsService";
import {
  FaHospital,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ConversationsList() {

  const conversationsData = [
    {
      id: 1,
      firstName: 'Anita',
      lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat ornare luctus. Quisque semper aliquet velit, nec elementum tellus molestie vel. Quisque feugiat, ipsum quis viverra feugiat, nisl quam ultricies nulla, in vulputate urna erat id sapien. Nam accumsan enim tellus, sit amet egestas sapien rutrum elementum. Nam faucibus elementum risus eget tristique. ",
      lastMessageSeen: false,
      profileImage: 'https://www.aidonslesnotres.fr/wp-content/uploads/2016/03/Etre-accompagne-au-quotidien-methode-naomi-feil-700x465-1.jpg',
      animal: {
        avatar: 'https://jardinage.lemonde.fr/images/dossiers/categories2/chat-141428-650-325.jpg',
        name: 'Jimmy',
      },
      housingPhotos: [
        'https://www.fac-habitat.com/upload/residences/28/_DSC9435_1.jpg?h=41', 
        'https://www.fac-habitat.com/upload/residences/28/Auguste-Rodin_image9.jpg?h=41', 
        'https://www.fac-habitat.com/upload/residences/28/Auguste-Rodin_image6.jpg?h=41'],
    },
    {
      id: 2,
      firstName: 'Alice',
      lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat ornare luctus. Quisque semper aliquet velit, nec elementum tellus molestie vel. Quisque feugiat, ipsum quis viverra feugiat, nisl quam ultricies nulla, in vulputate urna erat id sapien. Nam accumsan enim tellus, sit amet egestas sapien rutrum elementum. Nam faucibus elementum risus eget tristique. ",
      lastMessageSeen: true,
      profileImage: 'https://www.psychologue.net/site/article/52697/51923/shutterstock-657236170-1_ai1.jpg',
      animal: {
        avatar: 'https://mf.b37mrtl.ru/rbthmedia/images/all/2016/06/03/topimg.jpg',
        name: 'Toto',
      },
      housingPhotos: ['https://v.seloger.com/s/cdn/x/visuels/0/q/b/a/0qbaw9iakvl4e82pzurttn7pftb681dsqnp2fb81g.jpg',
       'https://v.seloger.com/s/cdn/x/visuels/0/x/t/h/0xthv6licblma89q2ccfmzritprt2q3ci2ps752t0.jpg', 
       'https://v.seloger.com/s/cdn/x/visuels/0/h/n/p/0hnp3vpxswyvr4nkx8s5p4tjrmjjo3s8zd1waxldg.jpg'],
    },
  ];

  const userTemplate = (conversation: { animal: { avatar: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => {
    return (
      <div className="flex align-items-center gap-2">
        <img src={conversation.animal.avatar} alt={conversation.animal.avatar}
          className="relative inline-block h-12 w-12 rounded-full object-cover object-center" />
        <span className="font-semibold mt-3 ms-1">{conversation.animal.name}</span>
      </div>
    )
  };

  const petTemplate = (conversation: { profileImage: string | undefined; firstName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
    return (
      <div className="flex align-items-center gap-2">
        <img src={conversation.profileImage} alt={conversation.profileImage}
          className="relative inline-block h-12 w-12 rounded-full object-cover object-center" />
        <span className="font-semibold mt-3 ms-1">{conversation.firstName}</span>
      </div>
    )
  };
  
  const renderHousingPhotos = (rowData: { housingPhotos: any[]; }) => {
    return (
      <div className="flex gap-2">
        {rowData.housingPhotos.slice(0, 3).map((photo, index) => (
          <img key={index} src={photo} alt={`Housing ${index + 1}`} className="w-14 h-14 rounded-md" />
        ))}
      </div>
    );
  };

  const renderLastMessage = (conversation: { lastMessage: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
    return (
      <div className="flex align-items-center gap-2">
        <p className="truncate w-40">{conversation.lastMessage}</p>
      </div>
    )
  };
  const renderActions = (rowData: { id: any; }) => {
    return (
      <Link to={`/conversation/${rowData.id}`} className="p-button p-component p-button-text p-button-rounded">
        View Conversation
      </Link>
    );
  };


  return (
    <div className="relative md:ml-64 bg-blueGray-50">
      <div className="lg:flex gap-4 items-stretch m-6">
        <div className="flex flex-col justify-center items-center w-full pt-4">
          <div className=" mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 2xl:grid-cols-6 3xl:grid-cols-6">
            <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center text-brand-500 dark:text-white">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                <p className="font-dm text-sm font-medium text-gray-600">Earnings</p>
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">$340.5</h4>
              </div>
            </div>
            <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
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
                      <path d="M298.39 248a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V236a12 12 0 0012 12z"></path>
                      <path d="M197 267a43.67 43.67 0 01-13-31v-92h-72a64.19 64.19 0 00-64 64v224a64 64 0 0064 64h144a64 64 0 0064-64V280h-92a43.61 43.61 0 01-31-13zm175-147h70.39a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V108a12 12 0 0012 12z"></path>
                      <path d="M372 152a44.34 44.34 0 01-44-44V16H220a60.07 60.07 0 00-60 60v36h42.12A40.81 40.81 0 01231 124.14l109.16 111a41.11 41.11 0 0111.83 29V400h53.05c32.51 0 58.95-26.92 58.95-60V152z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                <p className="font-dm text-sm font-medium text-gray-600">Spend this month</p>
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">$642.39</h4>
              </div>
            </div>
            <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center text-brand-500 dark:text-white">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                <p className="font-dm text-sm font-medium text-gray-600">Sales</p>
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">$574.34</h4>
              </div>
            </div>
            <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
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
                <p className="font-dm text-sm font-medium text-gray-600">Your Balance</p>
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">$1,000</h4>
              </div>
            </div>
            <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center text-brand-500 dark:text-white">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                <p className="font-dm text-sm font-medium text-gray-600">New Tasks</p>
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">145</h4>
              </div>
            </div>
            <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
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
                <p className="font-dm text-sm font-medium text-gray-600">Total Projects</p>
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">$2433</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <DataTable value={conversationsData}>
              <Column body={petTemplate} header="Candidat"></Column>
              <Column body={userTemplate} header="Animal"></Column>
              <Column header="Housing Photos" body={renderHousingPhotos}></Column>
              <Column header="Dernier message" body={renderLastMessage}></Column>
              <Column header="Actions" body={renderActions}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
