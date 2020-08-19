import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        notaToken: null
    },
    mutations: {
        authUser(state, str) {
            state.notaToken = str
        },
        clearAuth(state) {
            state.notaToken = null
        }
    },
    actions: {
        login ({commit}, authData) {
            const encodedUserPwd = btoa(`${authData.user}:${authData.pw}`);
            axios.get("http://red.local/members/", {
                auth: { username: authData.user, password: authData.pw}
            })
                .then(res => {
                    console.log(res)
                    commit('authUser', encodedUserPwd)
                })
                .catch(err => {
                    console.log(err)
                })

        },
        logout ({commit}) {
            commit('clearAuth')
        }
    },
    getters: {
        ifAuthenticated (state) {
            return state.notaToken != null
        }
    }
})
