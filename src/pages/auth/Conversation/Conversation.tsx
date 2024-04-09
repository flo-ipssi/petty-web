import { Carousel } from 'primereact/carousel';
import { Image } from 'primereact/image';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Conversation = () => {
    const { id } = useParams(); // Récupérer l'ID de la conversation depuis les paramètres d'URL
    const [conversation, setConversation] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);
    const icon = (<i className="pi pi-search"></i>)

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    const handleMessageSend = () => {
        if (message.trim() !== '') {
            const newMessage = { text: message, sender: 'user' };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setMessage('');
            // Scroll au bas du chat lors de l'envoi d'un message
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

            // Simulation de la réponse de l'autre partie
            setTimeout(() => {
                const replyMessage = { text: 'Sure! How about tomorrow at 2 PM?', sender: 'other' };
                setMessages(prevMessages => [...prevMessages, replyMessage]);
                // Scroll au bas du chat après la réponse
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }, 1000);
        }
    };

    // Fonction pour proposer un rendez-vous
    const proposeMeeting = () => {
        // Logique pour proposer un rendez-vous
        alert(`Proposing a meeting with ${conversation.firstName}`);
    };

    // Fonction pour signaler l'utilisateur
    const reportUser = () => {
        // Logique pour signaler l'utilisateur
        alert(`Reporting user: ${conversation.firstName}`);
    };

    // Fonction pour clôturer pour adoption
    const closeForAdoption = () => {
        // Logique pour clôturer pour adoption
        alert(`Closing for adoption with ${conversation.firstName}`);
    };
    useEffect(() => {
        // Simulation de données de conversation
        const fakeConversation = {
            id: 1,
            firstName: 'John',
            profileImage: 'profile1.jpg',
            housingPhotos: [
                'https://www.fac-habitat.com/upload/residences/28/_DSC9435_1.jpg?h=41',
                'https://www.fac-habitat.com/upload/residences/28/Auguste-Rodin_image9.jpg?h=41',
                'https://www.fac-habitat.com/upload/residences/28/Auguste-Rodin_image6.jpg?h=41',
                'https://v.seloger.com/s/cdn/x/visuels/0/q/b/a/0qbaw9iakvl4e82pzurttn7pftb681dsqnp2fb81g.jpg',
                'https://v.seloger.com/s/cdn/x/visuels/0/x/t/h/0xthv6licblma89q2ccfmzritprt2q3ci2ps752t0.jpg',
                'https://v.seloger.com/s/cdn/x/visuels/0/h/n/p/0hnp3vpxswyvr4nkx8s5p4tjrmjjo3s8zd1waxldg.jpg'],
            animalName: 'Buddy',
            animalPhoto: 'animal1.jpg',
        };

        // Simulation de données de messages
        const fakeMessages = [
            { text: 'Hello!', sender: 'user' },
            { text: 'Hi, how can I help you?', sender: 'other' },
            { text: 'I would like to adopt Buddy.', sender: 'user' },
            { text: 'That\'s great! When would you like to meet?', sender: 'other' },
        ];

        setConversation(fakeConversation);
        setMessages(fakeMessages);

        // Scroll au bas du chat lors du chargement des messages
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, []);

    ////////////BACK
    // const [conversation, setConversation] = useState(null);
    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //   // Récupérer la conversation depuis le serveur
    //   axios.get(`/api/conversations/${id}`)
    //     .then(response => {
    //       setConversation(response.data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching conversation:', error);
    //     });

    //   // Récupérer les messages de la conversation
    //   axios.get(`/api/conversations/${id}/messages`)
    //     .then(response => {
    //       setMessages(response.data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching messages:', error);
    //     });
    // }, [id]);

    // const handleMessageSend = () => {
    //     if (message.trim() !== '') {
    //       axios.post(`/api/conversations/${id}/messages`, { text: message })
    //         .then(response => {
    //           setMessages(prevMessages => [...prevMessages, response.data]);
    //           setMessage('');
    //           // Scroll au bas du chat lors de l'envoi d'un message
    //           chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    //         })
    //         .catch(error => {
    //           console.error('Error sending message:', error);
    //         });
    //     }
    //   };

    return (
        <div className="relative md:ml-64 bg-blueGray-50">
            <div className="flex pt-4 px-4 overflow-y-auto">
                <div className="flex-1 p-4">
                    <div className="flex flex-col mx-auto items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                            src="https://i.notretemps.com/1800x0/smart/2021/01/26/5-bonnes-raisons-davoir-un-animal-de-compagnie.jpg" alt="" />
                        <div className="flex flex-col justify-between px-4 leading-normal">
                            <h5 className=" text-gray-500 mt-1 mb-2 text-xl font-bold tracking-tight text-center 
                             dark:text-white">
                                {`Animal: ${conversation?.animalName}`}
                            </h5>
                            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <div className="w-full">
                                <div className="flex justify-center  ">
                                    <div className="mr-4 p-1 text-center">
                                        <span className="text-md font-bold block uppercase tracking-wide text-blueGray-600">
                                            22
                                        </span>
                                        <span className="text-sm text-blueGray-400">Candidatures</span>
                                    </div>
                                    <div className="mr-4 p-1 text-center">
                                        <span className="text-md font-bold block uppercase tracking-wide text-blueGray-600">
                                            10
                                        </span>
                                        <span className="text-sm text-blueGray-400">Photos</span>
                                    </div>
                                    <div className="lg:mr-4 p-1 text-center">
                                        <span className="text-md font-bold block uppercase tracking-wide text-blueGray-600">
                                            01/01/2026
                                        </span>
                                        <span className="text-sm text-blueGray-400">Date limite</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border h-100  mt-10 p-4 rounded-lg overflow-y-auto mb-4" ref={chatContainerRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right flex flex-row-reverse' : 'text-left flex flex-row'}`}>
                                <div className={`rounded-lg py-3 px-4 w-fit ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
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
                            onChange={e => setMessage(e.target.value)}
                        />
                        <button
                            onClick={handleMessageSend}
                            className="px-4 py-2  text-white rounded bg-blue-500 hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </div>
                </div>
                <div className="flex-1 p-4">
                    {conversation && (
                        <div className='pt-20'>
                            <div className="flex items-center mb-4">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full flex justify-center">
                                            <div className="relative">
                                                <img src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]" />
                                            </div>
                                        </div>
                                        <div className="w-full text-center mt-20">
                                            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                                <div className="p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">3,360</span>
                                                    <span className="text-sm text-slate-400">Photos</span>
                                                </div>
                                                <div className="p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">2,454</span>
                                                    <span className="text-sm text-slate-400">Followers</span>
                                                </div>

                                                <div className="p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">564</span>
                                                    <span className="text-sm text-slate-400">Following</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-2">
                                        <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">{conversation.firstName}</h3>
                                        <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>Paris, France
                                        </div>
                                    </div>
                                    <div className="mt-6 py-6 border-t border-slate-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full px-4">
                                                <p className="font-light leading-relaxed text-slate-600 mb-4">An artist of considerable range, Mike is the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h4 className="font-semibold mb-2">Housing Photos:</h4>
                                <div className="flex gap-2 overflow-y-auto h-40">
                                    {conversation.housingPhotos.map((photo: string | undefined, index: any) => (
                                        <Image key={index} src={photo} alt={`Housing ${index + 1}`} indicatorIcon={icon} preview className="w-32 max-h-24 rounded-md" />
                                    ))}
                                </div>

                            </div>
                            <div className="flex gap-4">
                                <button onClick={proposeMeeting} className="px-4 py-2  text-white bg-blue-500 rounded hover:bg-blue-600">
                                    Propose Meeting
                                </button>
                                <button onClick={reportUser} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                    Report User
                                </button>
                                <button onClick={closeForAdoption} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                    Close for Adoption
                                </button>

                                <Link to="/conversations" className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mt-4 inline-block">
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
