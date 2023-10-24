import axios from 'axios';

export default class fetchImgs {
    constructor() {
        this.query = '';
        this.page = 1;
    }
    nextPage() {
        this.page += 1;
    }
    firstPage() {
        this.page = 1;
    }

    async fetchData() {
        const BASE_URL = 'https://pixabay.com/api/';
        const API_KEY = '34272831-3ed6bcfb2b9ae97f1edcdbcde';
        
        try {
            const response = await axios.get(
                `${BASE_URL}?key=${API_KEY}&q=${this.query}&per_page=15&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`);
            this.nextPage();
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
};