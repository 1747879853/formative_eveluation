import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {      
        token:'',
        auth_rules:[]
    },
    mutations: {        
        set_token(state, token) {
        state.token = token
        localStorage.token = token
        },
        del_token(state) {
        state.token = ''
        localStorage.removeItem('token')
        },
        set_auth_rules(state, auth_rules) {
        state.auth_rules = auth_rules
        localStorage.auth_rules = auth_rules
        },
        del_auth_rules(state) {
        state.auth_rules = ''
        localStorage.removeItem('auth_rules')
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
