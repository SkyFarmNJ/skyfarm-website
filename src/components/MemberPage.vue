<template>
<v-container px-10 fluid>

  <v-row v-if="auth">

    <v-tabs align-with-title>
      <v-tab
        v-for="(opt, i) in options"
        :key=i
        @click="(opt.param) ? getCsv(opt.param) : null"
        :to=opt.route
        >
        {{opt.text}}</v-tab>
    </v-tabs>

    <router-view
      :list=list
      :file=firstFile
      ></router-view>

  </v-row>

  <v-container v-else fluid
               class="mt-2"
               >
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <h2>LOGIN TO YOUR ACCOUNT</h2>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">

        <v-card style="box-shadow: none" class="mt-9">
          <h3>Pages for Sky Farm Members only.</h3>
          <p>If you are a current Sky Farm Member and need an account<br>
            email <a href="mailto:membership@skyfarm.com">membership@skyfarm.com</a> to have an account created for you.</p>

          <v-card>
            <v-card-text>
              <v-form>
                <v-text-field
                   v-model="user"
                   label="Username"
                   name="login"
                   prepend-icon="mdi-account"
                   type="text"
                   ></v-text-field>

                <v-text-field
                   v-model="pw"
                   id="password"
                   label="Password"
                   name="password"
                   prepend-icon="mdi-lock"
                   type="password"
                   @keydown.enter="login"
                   ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                 color="primary"
                 @click="login"
                 >
                Submit
              </v-btn>
            </v-card-actions>

          </v-card>

        </v-card>
    </v-row>

  </v-container>


<!--
  <v-alert type="error" prominent v-else>
    You must be logged in to view this page.
  </v-alert>
-->

</v-container>
</template>

<script>
import axios from 'axios'
//import router from '../router.js'
//import pdf from 'vue-pdf'

export default {
    data: () => ({
        list: null,
        headers: null,
        content: {data: null, contentType: null, url: null},
        numPages: 1,
        curPage: 1,
        user: '',
        pw: '',
        firstFile: '',
        options: [
            { text: 'Club Documents',       route: '/members/clubdocs' },
            { text: 'Minutes'       ,       route: '/members/archive/minutes',     param: 'minutes'},
            { text: 'Financial Statements', route: '/members/archive/statements',  param: 'statements'},
            { text: 'Newsletters',          route: '/members/archive/newsletters', param: 'newsletters'},
        ]
    }),
    methods: {
        login() {
            this.$store.dispatch('login', {user: this.user, pw: this.pw})
            this.close()
        },
        close() {
            this.$emit('exit', null)
        },
        getFile(url) {
            axios.get(url, this.headers)
                .then(res => {
                    console.log(res)
                    this.content = {data: res.data,
                                    contentType: res.headers['content-type'],
                                    url: res.config.url
                                   }
                    console.log(res.headers['content-type'])
                })
                .catch(err => console.log(err))
        },
        getCsv(dir) {
            axios.get(`/members/${dir}.csv`, this.headers)
                .then(res => {
                    console.log(res)
                    this.list = res.data
                        .split('\n')
                        .filter(Boolean)
                        .map(substr => substr.slice(1).split('",'))
                    this.firstFile = this.list[0][0]
                })
                .catch(err => console.log(err))
        },
    },

    mounted() {
        this.headers = {
            headers: {
                Authorization: `Basic ${this.$store.getters.token}`
            }
        }
        if (this.$route.params.dir) this.getCsv(this.$route.params.dir)
    },

    computed: {
        auth() {return this.$store.getters.ifAuthenticated}
    },
//    components: {
//        pdf
//    },
}
</script>
