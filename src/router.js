import Vue from 'vue';
import VueRouter  from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'
import AboutUs    from './components/AboutUs.vue'
import MemberPage from './components/MemberPage.vue'
import Membership from './components/Membership.vue'
import History    from './components/History.vue'
import FAQ        from './components/FAQ.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/',           component: HelloWorld},
    { path: '/about',      component: AboutUs   },
    { path: '/docs',       component: MemberPage},
    { path: '/membership', component: Membership},
    { path: '/history',    component: History   },
    { path: '/faq',        component: FAQ       }
]

export default new VueRouter({routes})
