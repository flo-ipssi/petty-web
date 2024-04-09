export const PetsService = {
    getPetsData() {
        return [
            {
                id: '1000',
                giver: 'f230fh0g3',
                type: 'Bamboo Watch',
                race: 'Bamboo Watch',
                name: 'Bamboo Watch',
                avatar: "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg",
                age: 4,
                status: "AVAILABLE",
                weight: 4,
                height: 20,
                sexe: 'Accessories',
                couleur: 'Accessories',
                description: 'Product Description',
                health: '',
                residenceRequirement: ''
            },
        ]
    },

    getPetsOfCompany() {
        return Promise.resolve(this.getPetsData().slice(0, 5));
    },
}