<template>
  <v-container px-10 fluid>

    <v-row class="text-left" v-if="auth">
      <v-col lg="9" mb-5 class="text-left" name="news-block">
        <h1>Club News</h1>
        <hr>

        <v-row
           v-for="(item, i) in stories"
           :key=i
           class="text-left"
           >
          <v-col lg="12">
            <h2 v-html="item.title"></h2>
          </v-col>
          <v-col lg="12"
		 v-if="!rmore[i]">
            <p v-html="item.html.slice(0, 200) + ' ...'"></p>
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
        </v-row>
      </v-col>

      <v-col  mb-5 class="text-center">
        <v-card>
          <v-card-title>
            COVID Notices
          </v-card-title>
          <v-card-subtitle class="text-left">
            Keeping The Farm Safe
          </v-card-subtitle>
          <v-card-text class="text-left">
            <v-btn
               color="error"
               to='/members/archive/docs?file=Sky Farm Covid 19 Guidelines v2_6.pdf'
               >
              Camp Rules
            </v-btn><br>
            <v-btn
               color="error"
               class="mt-2"
               to='/members/archive/docs?file=Sky Farm Covid 19 Pool and Spa Guidelines v1.1.pdf'
               >
              Pool Rules
            </v-btn>

          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>
            Camp Documents
          </v-card-title>
          <v-card-subtitle class="text-left">
            Knowning the rules
          </v-card-subtitle>
          <v-card-text class="text-left">
            <v-btn
               to='/members/archive/docs?file=Camp Rules September 2019.pdf'
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
    },

    computed: {
        auth() {
            return this.$store.getters.ifAuthenticated            
        }
    },
}
</script>
