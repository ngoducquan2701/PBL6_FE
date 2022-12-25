import axios from 'axios';

 const baseURL = axios.create({
    baseURL: 'https://quanvn.click/api/',
    headers: {'X-Custom-Header': 'foobar'}
});

export default baseURL;