import axios from 'axios';
import { Keys, getFromAsyncStorage } from '../utils/asyncStorage';

export const PetsService = {
    async getPetsData() {
        try {
            const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
            const response = await axios.get(`http://localhost:8989/pet/list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                } 
            });
            return response.data.list;
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des données des animaux :', error);
            return [];
        }
    },

    getPetsOfCompany() {
        // return Promise.resolve(this.getPetsData().slice(0, 5));
        return Promise.resolve(this.getPetsData());
    },
}