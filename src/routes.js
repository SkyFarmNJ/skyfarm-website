import HelloWorld from './components/HelloWorld.vue'
import AboutUs from './components/AboutUs.vue'
import MemberPage from './components/MemberPage.vue'

const routes = [
    { path: '/', component: HelloWorld},
    { path: '/about', component: AboutUs},
    { path: '/docs', component: MemberPage}
]

export default routes;
