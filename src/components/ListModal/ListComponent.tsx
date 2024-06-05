import { FC } from "react";
import "./ListComponent.scss";
import Carousel from "../Carrousel/Carousel";
interface ListComponentProps {
    data: any;
    index: number;
    startConversation?(): void
}

const ListComponent: FC<ListComponentProps> = ({ data , startConversation}) => (
    <div className="bg-white dark:bg-gray-900 border-2 border-grey-300 rounded-lg">
        <div className="grid max-w-screen-xl p-4 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
                    {data.name}
                </h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                    {data?.description}
                </p>
                <button
                    onClick={startConversation}
                    className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                    Engager la conversation
                </button>
                <button
                    className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-red-500 text-white border border-red-300 rounded-lg hover:bg-red-400 focus:ring-4 focus:ring-red-100 dark:text-white dark:border-red-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
                >
                    Supprimer la candidature
                </button>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
                <Carousel items={data?.uploads} />
            </div>
        </div>
    </div>
);

export default ListComponent;
