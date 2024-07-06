import axios from 'axios';
import { Keys, getFromAsyncStorage } from '../utils/asyncStorage';
import client from '../api/client';

export const PetsService = {
    async getPetsData() {
        try {
            const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
            const response = await axios.get(client + `pet/list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                } 
            });
            console.log(response);
            
            return response.data.list;
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des données des animaux :', error);
            return [];
        }
    },
   
    async getPetById(id: string) {
        try {
            const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
            const response = await axios.get(client + `pet/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                } 
            });
            return response.data;
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des données des animaux :', error);
            return null; 
        }
    },
 
    async getPetsLiked(){
        try {
            const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
            const response = await axios.get(client + `pet/applications`, {
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

    async deletePetById(id: string) {
        try {
            const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
            const response = await axios.post(client + `pet/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                } 
            });
            return response;
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des données des animaux :', error);
            return null;
        }
    },

    getPetsOfCompany() {
        // return Promise.resolve(this.getPetsData().slice(0, 5));
        return Promise.resolve(this.getPetsData());
    },

    getPetsOfCompanyLiked() {
        return Promise.resolve(this.getPetsLiked());
    },
    
}