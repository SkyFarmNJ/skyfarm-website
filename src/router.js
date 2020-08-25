import Vue from 'vue';
import VueRouter  from 'vue-router';
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
    { path: '/docs',       component: cmp('MemberPage'),
      children: [
          { path: '',          component: cmp('ClubDocs')  },
          { path: 'minutes',   component: cmp('Minutes')   }
      ]
    }
]

export default new VueRouter({routes})
