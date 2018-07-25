
import env from '../../build/env';
import axios from 'axios';
import router from '../router/router';
import store from '../store/index';

const ajaxUrl = env === 'development'
    ? ''
    : env === 'production'
        ? ''
        : 'http://114.118.17.4:8080/api/v1';

    //     const ajaxUrl = env === 'development'
    // ? 'http://192.168.192.128:3000/api/v1'
    // : env === 'production'
    //     ? ''
    //     : 'http://192.168.192.128:3000/api/v1';
const devUrl = env === 'development'
    ? 'http://127.0.0.1:3000/api/v1'
    : env === 'production'
        ? 'http://114.118.17.4:8080/api/v1'
        : '';

const service = axios.create({
    baseURL: ajaxUrl,
    withCredentials: true,
    timeout: 5000
});

// Alter defaults after instance has been created

service.interceptors.request.use(function (config) {
    if(store.state.token){   
         config.headers.common['Authorization']=store.state.token;
    }
    if (config.url.match(/\/user_token/)) {
        config.baseURL = 'http://127.0.0.1:3000';
        // config.baseURL = '';
    }
    // Do something before request is sent
    if (config.url.match(/\/authRuleList|authUserList|authGroupList|userList|users|approval_list|approval_field_list|approval_create|approval_save|procedure_nodes|procedure_create|user_group_list/)) {
        config.baseURL = devUrl;
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
    debugger
    switch(error.response.status){
        case 401:
          store.commit('del_token'); 
          router.push({ 
                name: 'login'
            });
      }
    return Promise.reject(error);
});

export default service;
