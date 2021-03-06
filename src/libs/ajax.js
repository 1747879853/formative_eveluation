
import env from '../../build/env';
import axios from 'axios';
import {router} from '../router/index';
import store from '../store/index';

const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1:3000/api/v1'
    : env === 'production'
        ? '/api/v1'
        : '';

const devUrl = env === 'development'
    ? 'http://127.0.0.1:3000/api/v1'
    : env === 'production'
        ? '/api/v1'
        : '';

const service = axios.create({
    baseURL: ajaxUrl,
    withCredentials: true,
    timeout: 5000
});

// Alter defaults after instance has been created

service.interceptors.request.use(function (config) {
    if (store.state.token) {
        config.headers.common['Authorization'] = store.state.token;
    }

    // Do something before request is sent

    if (config.url.match(/\/user_token|authRuleList|authGroupList|authUserList|userpass|teacherList|studentList|manystudent|classroomList|courseList|evaluationList|classStu|courseevalList|tccList|termList|tclassList|classgrade|studentgradeList/)) {

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
        case 401:
            alert('登录信息已过期，请重新登录！');
            router.push({
                replace: true,
                name: 'login'
            });
            break;
        case 403:
            alert('您的权限不足！');
            router.push({
                replace: true,
                name: 'error-403'
            });
            break;
        case 500:
            alert('操作失败，服务器发生了错误！');
            break;
        default:
    }
    return Promise.reject(error);
});

export default service;
