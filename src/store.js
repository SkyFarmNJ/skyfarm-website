import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router.js'
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
                    localStorage.setItem('token', encodedUserPwd)
                    router.push('/docs')

                })
                .catch(err => {
                    console.log(err)
                })

        },
        logout ({commit}) {
            commit('clearAuth')
            localStorage.removeItem('token')
            router.push('/')
        },
        AutoLogin ({commit}) {
            const token = localStorage.getItem('token')
            if (!token) {
                return
            }
            commit('authUser', token)
        }
    },
    getters: {
        ifAuthenticated (state) {
            return state.notaToken != null
        },
        token (state) {
            return state.notaToken
        }
    }
})
