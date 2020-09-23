import Vue from 'vue';
import VueRouter  from 'vue-router';
import VueGtag from "vue-gtag";
import HelloWorld from './components/HelloWorld.vue'
Vue.use(VueRouter)

function cmp(suffix) {
    return () => import(`./components/${suffix}.vue`);
}

const routes = [
    { path: '/',           component: HelloWorld},
    { path: '/about',      component: cmp('AboutUs')},
    { path: '/membership', component: cmp('Membership')},
    { path: '/history',    component: cmp('History')},
    { path: '/faq',        component: cmp('FAQ')},
    { path: '/tour',       component: cmp('Tour')},
    { path: '/next',       component: cmp('Next')},
    { path: '/reviews',    component: cmp('Reviews')},
    { path: '/members',    component: cmp('MemberPage'),
      children: [
          { path: 'home',         component: cmp('MemberHome'), alias:''  },
          { path: 'archive/:dir', component: cmp('Archive')},
          { path: 'payment',      component: cmp('Payment')},
          { path: 'thanks',       component: cmp('ThankYou'), name: "ThankYou"},
      ]
    }
]

export default new VueRouter({routes,scrollBehavior () {
  return { x: 0, y: 0 }
}})

var gaid = 'UA-443750-6';  // Dev
if ( document.location.host == 'www.skyfarm.com' && document.location.pathname == '/main/' ) {
    gaid = 'UA-443750-5';  // Prod
}

Vue.use(VueGtag, {
  config: { 
      id: gaid
  }
});
