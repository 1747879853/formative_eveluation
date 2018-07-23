import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {      
        token:''
    },
    mutations: {        
        set_token(state, token) {
        state.token = token
        sessionStorage.token = token
        },
        del_token(state) {
        state.token = ''
        sessionStorage.removeItem('token')
        }
    },
    actions: {

    },
    modules: {
        app,
        user
    }
});

export default store;
