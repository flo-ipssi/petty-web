import axios from "axios";
import { Keys, getFromAsyncStorage } from "../utils/asyncStorage";
import client from "../api/client";

export const MessagesService = {
    async retrieveMessages(conversation: any) {
        try {
            const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
            const response = await axios.post(
                client+ `message/`,
                {
                    conversationId: conversation,
                },
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
    
    getMessages(conversation: any) {
        return Promise.resolve(this.retrieveMessages(conversation));
    },

    async sendMessage( message: any, owner: any, conversation: any) {
        try {
            const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
            const response = await axios.post(
                client + `message/send`,
                {
                    messageText: message.text,
                    ownerId: owner,
                    conversationId: conversation,
                },
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

    send(message: { text: string; sender: string; }, owner: string, conversation: string) {
        return Promise.resolve(this.sendMessage(message, owner, conversation));
    },
};
