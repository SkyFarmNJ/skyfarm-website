import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import LoadScript from 'vue-plugin-load-script';
//import VueRouter from 'vue-router';
import {library} from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faMapMarker, faPhone, faEnvelope, faCalendar, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//import routes from './routes';
import store from './store'
import router from './router'

//Vue.use(VueRouter)
Vue.use(LoadScript)

Vue.config.productionTip = false

//const router = new VueRouter({routes})

library.add(faFacebook)
library.add(faTwitter)
library.add(faInstagram)
library.add(faMapMarker)
library.add(faPhone)
library.add(faEnvelope)
library.add(faCalendar)
library.add(faCheck)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
    vuetify,
    render: h => h(App),
    router,
    store
}).$mount('#app')
