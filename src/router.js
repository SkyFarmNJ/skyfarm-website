import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'
import AboutUs from './components/AboutUs.vue'
import MemberPage from './components/MemberPage.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: HelloWorld},
    { path: '/about', component: AboutUs},
    { path: '/docs', component: MemberPage}
]

export default new VueRouter({routes})
