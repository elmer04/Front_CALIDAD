import axios from 'axios';

export default axios.create({
    baseURL: `https://apipeves.herokuapp.com/`
});