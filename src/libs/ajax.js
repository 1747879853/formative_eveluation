
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
    // ? 'http://192.168.66.68:3000/api/v1'
    : env === 'production'
        ? 'http://114.118.17.4:8080/api/v1'
        : '';

const devUrl2 = env === 'development'
    ? 'http://127.0.0.1:3000'
    : env === 'production'
    ? 'http://114.118.17.4:8080'
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
        config.baseURL = devUrl2;
        // config.baseURL = devUrl;
        // config.baseURL = '';
    }
    // Do something before request is sent
    if (config.url.match(/\/authRuleList|authUserList|authGroupList|users|userList|approval_admin_list|approval_list|approval_list_inuse|approval_field_list|approval_create|approval_save|approval_to_me|approval_to_me_done|approval_from_me|approval_info|approval_pass|approval_reject|approval_admin_start|approval_admin_stop|procedure_nodes|procedure_create|user_group_list|costList|workList/)) {

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
