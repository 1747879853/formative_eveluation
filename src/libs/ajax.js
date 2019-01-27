
import env from '../../build/env';
import axios from 'axios';
import router from '../router/router';
import store from '../store/index';

const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1:3000/api/v1'
    : env === 'production'
        ? 'http://47.100.174.14:9999/api/v1'
        : '';

const devUrl = env === 'development'
    ? 'http://127.0.0.1:3000/api/v1'
    : env === 'production'
        ? 'http://47.100.174.14:9999/api/v1'
        : '';

const service = axios.create({
    // baseURL: ajaxUrl,
    withCredentials: true,
    timeout: 5000
});

// Alter defaults after instance has been created

service.interceptors.request.use(function (config) {
    if (store.state.token) {
        config.headers.common['Authorization'] = store.state.token;
    }

    // Do something before request is sent

    if (config.url.match(/\/user_token|authRuleList|authGroupList|authUserList/)) {

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
    switch (error.response.status) {
        //router跳转不了，还未解决。
        case 401:
            alert('登录信息已过期，请重新登录！');
            store.commit('logout', null);
            store.commit('clearOpenedSubmenu');
            store.commit('clearAllTags');
            store.commit('del_token');
            store.commit('del_auth_rules');
            window.location.href="#/login";
            break;
        case 403:
            alert('您的权限不足！');
            window.location.href="#/home";
            break;
        case 500:
            alert('操作失败，服务器发生了错误！');
            break;
        default:
    }
    return Promise.reject(error);
});

export default service;
