import { Carousel } from "primereact/carousel";
import { Image } from "primereact/image";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ConversationsService } from "../../../services/ConversationsService";
import { capitalizeFirstLetter } from "../../../helpers/format";
import { MessagesService } from "../../../services/MessagesService";
import Loader from "../../../components/Loader";

const Conversation = () => {
    const chatContainerRef = useRef(0);
    const icon = <i className="pi pi-search"></i>;
    const { pathname } = useLocation();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [infosUser, setInfosUser] = useState(null);
    const [infosAnimal, setInfosAnimal] = useState(null);
    const [nbApplied, setNbApplied] = useState(0);
    const [consersationId, setConsersationId] = useState("");
    const [ownerId, setOwnerId] = useState(null);

    const responsiveOptions = [
        {
            breakpoint: "1400px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "1199px",
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: "767px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "575px",
            numVisible: 1,
            numScroll: 1,
        },
    ];

    // Fonction pour proposer un rendez-vous
    const proposeMeeting = () => {
        alert(`Proposing a meeting with ${conversation.firstName}`);
    };

    // Fonction pour signaler l'utilisateur
    const reportUser = () => {
        alert(`Reporting user: ${conversation.firstName}`);
    };

    // Fonction pour clôturer pour adoption
    const closeForAdoption = () => {
        alert(`Closing for adoption with ${conversation.firstName}`);
    };

    const handleMessageSend = async () => {
        if (message.trim() !== "") {
            const newMessage = { text: message, sender: "user" };
            try {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                setMessage("");
                // Scroll au bas du chat lors de l'envoi d'un message
                chatContainerRef.current.scrollTop =
                    chatContainerRef.current.scrollHeight;

                MessagesService.sendMessage(newMessage, ownerId, consersationId);
            } catch (error) {
                console.error(error);
            }

            // Simulation de la réponse de l'autre partie
            // setTimeout(() => {
            //     const replyMessage = {
            //         text: "Sure! How about tomorrow at 2 PM?",
            //         sender: "other",
            //     };
            //     setMessages((prevMessages) => [...prevMessages, replyMessage]);
            //     // Scroll au bas du chat après la réponse
            //     chatContainerRef.current.scrollTop =
            //         chatContainerRef.current.scrollHeight;
            // }, 1000);
        }
    };

    function fetchDetailsConversation() {
        const paramConversationId = pathname.split("/");
        ConversationsService.getConversationsData(paramConversationId[2]).then(
            (data) => {
                if (data) {
                    const profilUrl = data.conversation.userUploads.find(
                        (item: { profil: boolean }) => item.profil === true
                    );
                    setInfosUser({
                        infos: data.conversation.fromUser,
                        uploads: data.conversation.userUploads,
                        url: profilUrl ? profilUrl.file.url : null,
                    });

                    const animalUrl = data.conversation.petUploads.find(
                        (item: { profil: boolean }) => item.profil === true
                    );
                    setInfosAnimal({
                        infos: data.conversation.petInfo,
                        uploads: data.conversation.petUploads,
                        url: animalUrl ? animalUrl.file.url : null,
                    });
                    console.log(data.conversation);
                    setNbApplied(data.appliedNumber);
                    setConsersationId(data.conversation._id);
                    setOwnerId(data.conversation.petInfo.owner);
                }
            }
        );
    }

    function fetchMessages() {
        const paramConversationId = pathname.split("/");
        MessagesService.getMessages(paramConversationId[2]).then((data) => {
            if (data) {
                setMessages(data.messages);

                // Scroll au bas du chat lors du chargement des messages
                chatContainerRef.current.scrollTop =
                    chatContainerRef.current.scrollHeight;
            }
        });
    }

    const renderChat = () => {
        return (
            <>
                <div
                    className="border h-100  mt-10 p-4 rounded-lg overflow-y-auto mb-4"
                    ref={chatContainerRef}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-4 ${msg.owner == ownerId
                                    ? "text-right flex flex-row-reverse"
                                    : "text-left flex flex-row"
                                }`}
                        >
                            <div
                                className={`rounded-lg py-3 px-4 w-fit ${msg.owner == ownerId
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-black"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        className="flex-1 border rounded py-2 px-4 mr-2"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        onClick={handleMessageSend}
                        className="px-4 py-2  text-white rounded bg-blue-500 hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </>
        );
    };

    useEffect(() => {
        fetchDetailsConversation();

        const intervalId = setInterval(() => {
            fetchMessages();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="relative md:ml-64 bg-blueGray-50">
            <div className="flex pt-4 px-4 overflow-y-auto">
                <div className="flex-1 p-4">
                    <div className="flex flex-col mx-auto items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img
                            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                            src={infosAnimal?.url}
                            alt=""
                        />
                        <div className="flex flex-col justify-between px-4 leading-normal">
                            <h5
                                className=" text-gray-800 mt-1 mb-2 text-xl font-bold tracking-tight text-center 
                             dark:text-white"
                            >
                                {`Animal: ${capitalizeFirstLetter(infosAnimal?.infos.name)}`}
                            </h5>
                            <h6
                                className=" text-gray-500 mt-1 mb-2 font-bold tracking-tight text-center 
                             dark:text-white"
                            >
                                {capitalizeFirstLetter(infosAnimal?.infos.species)}
                            </h6>
                            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <div className="w-full">
                                <div className="flex justify-center  ">
                                    <div className="mr-4 p-1 text-center">
                                        <span className="text-md font-bold block uppercase tracking-wide text-blueGray-600">
                                            {nbApplied}
                                        </span>
                                        <span className="text-sm text-blueGray-400">
                                            Candidatures
                                        </span>
                                    </div>
                                    <div className="mr-4 p-1 text-center">
                                        <span className="text-md font-bold block uppercase tracking-wide text-blueGray-600">
                                            {infosAnimal?.uploads.length}
                                        </span>
                                        <span className="text-sm text-blueGray-400">Photos</span>
                                    </div>
                                    <div className="lg:mr-4 p-1 text-center">
                                        <span className="text-md font-bold block uppercase tracking-wide text-blueGray-600">
                                            01/01/2026
                                        </span>
                                        <span className="text-sm text-blueGray-400">
                                            Date limite
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {messages?.length > 0 ? (
                        renderChat()
                    ) : (
                        <div className="flex flex-col mx-auto mt-40 items-center ">
                            <Loader />
                        </div>
                    )}
                </div>
                <div className="flex-1 p-4">
                    {infosUser != "undefined" && (
                        <div className="pt-20">
                            <div className="flex items-center mb-4">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full flex justify-center">
                                            <div className="relative">
                                                <img
                                                    src={infosUser?.url}
                                                    className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full text-center mt-20">
                                            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                                <div className="p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                                                        {infosUser?.uploads.length}
                                                    </span>
                                                    <span className="text-sm text-slate-400">Photos</span>
                                                </div>
                                                <div className="p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                                                        2,454
                                                    </span>
                                                    <span className="text-sm text-slate-400">
                                                        Followers
                                                    </span>
                                                </div>

                                                <div className="p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                                                        564
                                                    </span>
                                                    <span className="text-sm text-slate-400">
                                                        Following
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-2">
                                        <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                                            {infosUser?.infos.name}
                                        </h3>
                                        <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                                            Paris, France
                                        </div>
                                    </div>
                                    <div className="mt-6 py-6 border-t border-slate-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full px-4">
                                                <p className="font-light leading-relaxed text-slate-600 mb-4">
                                                    An artist of considerable range, Mike is the name
                                                    taken by Melbourne-raised, Brooklyn-based Nick Murphy
                                                    writes, performs and records all of his own music,
                                                    giving it a warm.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h4 className="font-semibold mb-2">Housing Photos:</h4>
                                <div className="flex gap-2 overflow-y-auto h-40">
                                    {infosUser?.uploads
                                        .filter(
                                            (item: { category: string }) =>
                                                item.category == "Residence"
                                        )
                                        .map((photo: string | undefined, index: any) => (
                                            <Image
                                                key={index}
                                                src={photo.file.url}
                                                alt={`Housing ${index + 1}`}
                                                indicatorIcon={icon}
                                                preview
                                                className="w-32 max-h-24 rounded-md"
                                            />
                                        ))}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={proposeMeeting}
                                    className="px-4 py-2  text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    Propose Meeting
                                </button>
                                <button
                                    onClick={reportUser}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Report User
                                </button>
                                <button
                                    onClick={closeForAdoption}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Close for Adoption
                                </button>

                                <Link
                                    to="/conversations"
                                    className="px-4 py-2 text-center bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                >
                                    Back to Conversations
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Conversation;
