<template>
  <v-app overflow-x-hidden>
    <v-app-bar
      app
      color="black"
      dark
      dense
      elevated
      >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>


      <v-container
        v-if="$vuetify.breakpoint.mdAndUp"
        >
        <v-btn v-for="(c, i) in contactInfo"
               :key=i
               text
               disabled
             >
          <font-awesome-icon color="blue" :icon="{prefix: 'fas', iconName: c.icon}"/> {{c.text}}
          </v-btn>
      </v-container>

      <v-card
        v-else
        href="tel:908.419.5443"
        >
        <v-icon>mdi-phone</v-icon> 908.419.5443
      </v-card>

      <v-spacer/>

      <v-btn
        v-for="(x, i) in socials"
        :key=i
        :href=x.url
        icon large
        style = "min-width: 0"
        >
        <font-awesome-icon :icon="{prefix: 'fab', iconName: x.icon}"/>
      </v-btn>

      <v-btn @click="inOrOut">
        {{(auth) ? "Logout" : "Login"}}
      </v-btn>

      <template v-slot:extension v-if="$vuetify.breakpoint.mdAndUp">
         <v-img
              :src="require('./assets/skyfarm_logo_fixed.png')"
              class="mt-1"
              contain
           height="50"/>
          <v-tabs align-with-title>
            <v-tab
              v-for="(opt, i) in options"
              :key=i
              :to=opt.route>
              {{opt.text}}</v-tab>
          </v-tabs>
        </template>

    </v-app-bar>

    <v-overlay :value="overlay">
      <login-form
        @exit="overlay = false"
        ></login-form>
    </v-overlay>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      >
      <v-list
        nav
        dense
        >
        <v-list-item-group
          >
          <v-list-item
            v-for="(opt, i) in options"
            :key=i
            :to=opt.route
            >
            <v-list-item-title>{{opt.text}}</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-img
        v-if="$vuetify.breakpoint.smAndDown"
        :src="require('./assets/logo-2.png')"
        class="mt-5"
        contain
        height="50"/>
      <v-divider/>
      <router-view/>
    </v-main>

    <v-footer dark>
      <v-container fluid>
        <v-row class="mb-5">

          <v-card href="https://www.google.com">
            <div class="d-flex flex-no-wrap justify-space-between">

              <v-avatar
                class="ma-3"
                size="50"
                tile
                >
                <font-awesome-icon class="fa-3x" :icon="{prefix: 'fas', iconName: 'calendar'}"/>
              </v-avatar>

              <v-card-title
                >
                Sky Farm members only event calendar
              </v-card-title>

            </div>
          </v-card>

          <v-spacer/>

          <v-card>
            <div class="d-flex flex-no-wrap justify-space-between">

              <v-avatar
                class="ma-3"
                size="50"
                tile
                >
                <font-awesome-icon class="fa-3x" :icon="{prefix: 'fas', iconName: 'check'}"/>
              </v-avatar>

              <v-card-title
                >
                Schedule a tour!
              </v-card-title>

            </div>
          </v-card>

          <v-spacer/>

          <v-card disabled>
            <div class="d-flex flex-no-wrap justify-space-between">

              <v-avatar
                class="ma-3"
                size="50"
                tile
                >
                <v-img :src="require('./assets/12.png')"></v-img>
              </v-avatar>

              <v-card-title
                >
                Sky Farm is an AANR affiliated facility.
              </v-card-title>

            </div>
          </v-card>

        </v-row>
        <v-row>
          <v-divider/>
        </v-row>
        <v-row>
          Copyright 2020 Skyfarm all rights reserved. Made with Vue. Build: {{build}}
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import LoginForm from './components/LoginForm';

export default {
    name: 'App',
    components: {LoginForm},
    data: () => ({
        drawer: false,
        build: (process.env.VUE_APP_BUILD_NUMBER == null) ? "N/A" : process.env.VUE_APP_BUILD_NUMBER,
        overlay: false,
        options: [
            {text:'Home',             route:'/'},
            {text:'About Us',         route:'/about'},
            {text:'History',          route:'/history'},
            {text:'Membership',       route:'/membership'},
            {text:'FAQ',              route:'/faq'},
            {text:'Member Access',    route:'/docs'}
        ],
        contactInfo: [
            {text:'New Jersey',             icon:'map-marker'},
            {text:'908-419-5443',           icon:'phone'},
            {text:'membership@skyfarm.com', icon:'envelope'}
        ],
        socials: [
            {url: "https://www.facebook.com/skyfarmnj", icon: "facebook"},
            {url: "https://twitter.com/intent/follow?original_referer=http%3A%2F%2Fwww.skyfarm.com%2F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=SkyFarmNJ&tw_p=followbutton", icon: "twitter"},
        ]
    }),
    methods: {
        inOrOut() {
            if (this.auth) {
                this.$store.dispatch('logout')
            } else {
                this.overlay = true
            }
        }
    },
    computed: {
        auth() {return this.$store.getters.ifAuthenticated}
    },
    created() {
        this.$store.dispatch('AutoLogin')
    }
};
</script>
