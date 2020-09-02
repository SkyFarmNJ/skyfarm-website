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
            return new Promise((resolve, reject) => {
                const encodedUserPwd = btoa(`${authData.user}:${authData.pw}`);
                //axios.get("/members/docs.csv", {
                axios.get("/cgi-bin/request.cgi", {
                    //auth: { username: authData.user, password: authData.pw},
                    headers: { 'X-WWW-Validation': encodedUserPwd }
                })
                    .then(res => {
                        console.log(res)
                        commit('authUser', encodedUserPwd)
                        localStorage.setItem('token', encodedUserPwd)
                        router.push('/members')
                        console.log("[store.login] auth ok")
                        resolve(true)
                    })
                    .catch(err => {
                        console.log("[store.login] auth failed: " + err)
                        reject(false)
                    })
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
