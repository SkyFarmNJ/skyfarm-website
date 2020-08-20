import HelloWorld from './components/HelloWorld.vue'
import AboutUs    from './components/AboutUs.vue'
import MemberPage from './components/MemberPage.vue'
import Membership from './components/Membership.vue'

const routes = [
    { path: '/', component: HelloWorld},
    { path: '/about', component: AboutUs},
    { path: '/docs', component: MemberPage}
    { path: '/membership', component: Membership},
]

export default routes;
