import env from '../../build/env';
import axios from 'axios';

const ajaxUrl = env === 'development'
    ? ''
    : env === 'production'
        ? ''
        : 'http://114.118.17.4:8080/api/v1';

const service = axios.create({
    baseURL: ajaxUrl,
    withCredentials: true,
    timeout: 5000
});

// Alter defaults after instance has been created
service.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (config.url.match(/\/authRuleList|users|authGroupList/)) {
        config.baseURL = 'http://127.0.0.1:3000/api/v1';
        // config.baseURL = '';
    }
    return config;
}, function (error) {
    // Do something with request error
    // debugger;
    return Promise.reject(error);
});

service.interceptors.response.use(function (response) {
    // Do something with response data
    // debugger
    return response;
}, function (error) {
    // debugger
    // Do something with response error
    return Promise.reject(error);
});

export default service;
