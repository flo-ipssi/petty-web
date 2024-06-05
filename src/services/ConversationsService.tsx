import axios from "axios";
import { Keys, getFromAsyncStorage } from "../utils/asyncStorage";

export const ConversationsService = {
    async getListConversationsData() {
        try {
            const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
            const response = await axios.get(
                `http://localhost:8989/conversation/list`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.conversations;
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de la récupération des données des animaux :",
                error
            );
            return [];
        }
    },

    async getConversationsData(id: any) {
        try {
            const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
            const response = await axios.get(
                `http://localhost:8989/conversation/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de la récupération des données des animaux :",
                error
            );
            return [];
        }
    },

    getConversationsOfCompany() {
        return Promise.resolve(this.getListConversationsData());
    },

    getConversationsDetails(id: string | undefined) {
        return Promise.resolve(this.getConversationsData(id));
    }
};
