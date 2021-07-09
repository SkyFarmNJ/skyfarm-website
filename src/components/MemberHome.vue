<template>
  <v-container px-10 fluid>

    <v-row class="text-left" v-if="auth">
      <v-col md="9" mb-5 class="text-left" name="news-block">
        <h2 class="d-block d-md-none">Club News</h2>
        <h1 class="d-none d-md-block">Club News</h1>

        <hr>
        <v-row
           v-for="(item, i) in stories"
           :key=i
           class="text-left"
          >
          <v-col cols="12">
            <v-img :src="getImage(item)" width="60"  class="float-right d-block d-md-none"></v-img>
            <v-img :src="getImage(item)" width="100" class="float-right d-none d-md-block"></v-img>
            <h3 class="d-block d-md-none" v-html="item.title"></h3>
            <h2 class="d-none d-md-block" v-html="item.title"></h2>
            <component
              :is="test(item.html, i)"
              ></component>
            <hr/>
          </v-col>
          <!--
          <v-col lg="12"
                 v-if="!rmore[i]">
            <p v-html="item.html.slice(0, 200) + '...'"></p>
            <b><a @click="activateReadMore(i)">
              read more
            </a></b>
          </v-col>

          <v-col lg="12"
                 v-if="rmore[i]">
            <p v-html="item.html"></p>
            <a class="" @click="deactivateReadMore(i)">
              read less
            </a>
          </v-col>
          <v-col lg="12"><hr></v-col>
          -->
        </v-row>

      </v-col>

      <v-col  mb-5 class="text-center">
        <v-card class="mt-4">
          <v-card-title>
            Camp Documents
          </v-card-title>
          <v-card-subtitle class="text-left">
            Knowing the rules
          </v-card-subtitle>
          <v-card-text class="text-left">
            <v-btn
               to='/members/archive/docs?file=Camp Rules July 2021.pdf'
               >
              Camp Rules
            </v-btn><br>
            <v-btn
               class="mt-2"
               to='/members/archive/docs?file=Bylaws-7-14-19-Word.pdf'
               >
              Sky Farm Bylaws
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>
            Online Payments
          </v-card-title>
          <v-card-text class="text-left">
            Skip the mailbox and pay your guest fees, grounds fees and more online.  We accept PayPal, Venmo and Credit Cards.
          </v-card-text>
          <v-card-action class="text-left">
            <v-btn
               class="mb-2"
               to='/members/payment'
               color="primary"
               >
              Make a Payment
            </v-btn>
          </v-card-action>
        </v-card>



      </v-col>
    </v-row>



  </v-container>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        stories: null,
        headers: null,
        rmore: [],
    }),

    methods: {
        test(html, i) {
            var vm = this
            return {
                render: function(h) {
                    return h('div', {
                        domProps: {
                            innerHTML: (vm.rmore[i])
                                ? html + '<a id="fancy_tag">Read Less</a>'
                                : ((this.$vuetify.breakpoint.xs) ? '' : html.split('</p><p>',1)) + '</p><a id="fancy_tag">Read More</a>'
                        },
                        on: {
                            click: (e) => {
                                if (e.target.id == "fancy_tag") vm.$set(vm.rmore, i, !vm.rmore[i])
                                vm.$gtag.event((vm.rmore[i] ? 'read more' : 'read less'), { event_label: vm.stories[i].title })
                            }
                        },
                    })
                },
                data: function() {return{}},
            }
        },
        getStories() {
            this.initHeaders()
            console.log("[MemberHome]: getStories: " + this.headers.Authorization)
            axios.get(`/members/news.json`, this.headers)
                .then(res => {
                    console.log("[MemberHome]: res: " + res)
                    this.stories = res.data.posts
                })
                .catch(err => console.log(err))
        },
        getImage(item) {
            if ( item.tags[0] ) return "https://www.skyfarm.com/Images/" + item.tags[0].name + ".png"
        },
        initHeaders() {
            this.headers = {
                headers: {
                    Authorization: `Basic ${this.$store.getters.token}`
                }
            }
            console.log("[MemberPage.initHeaders] token: " + this.$store.getters.token )
        },

        activateReadMore (i){
            this.$set(this.rmore,i,true);
            console.log("[MemberPage.activateReadMore] item: : " + i + " is " + this.rmore[i])
        },
        deactivateReadMore (i){
            this.$set(this.rmore,i,false);
            console.log("[MemberPage.deactivateReadMore] item: : " + i + " is " + this.rmore[i])
        },

    },

    mounted() {
        if (this.$store.getters.ifAuthenticated) this.getStories()
        this.$gtag.pageview({ page_path: this.$route.path, page_title: 'Member Home'})
    },

    computed: {
        auth() {
            return this.$store.getters.ifAuthenticated
        },
    },
}
</script>
