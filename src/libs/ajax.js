import env from '../../build/env';
import axios from 'axios';


const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1:8888'
    : env === 'production'
        ? 'https://www.url.com'
        : 'https://debug.url.com';

const service = axios.create({
    //baseURL: ajaxUrl,
    timeout: 5000
});

export default service;