import axios from 'axios';

export default axios.create({
    baseURL: `https://apipeves.herokuapp.com/`
});

// FASE PRODUCCION
// `http://localhost:8000/`

// FASE PRODUCCION
// `https://apipeves.herokuapp.com/`