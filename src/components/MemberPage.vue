<template>
<v-container px-10 fluid>
  <v-expansion-panels
    v-if="auth"
    >
    <v-expansion-panel
      v-for="(item, i) in list"
      :key=i
      align="center"
      >
      <v-expansion-panel-header
        @click="getFile(`/members/${item[1]}`)"
        >{{item[0]}}</v-expansion-panel-header>
      <v-expansion-panel-content

        v-touch="{
                 left:  () => changePage(1),
                 right: () => changePage(-1)
                 }"
        >
        <div
          v-if="content.contentType == 'application/pdf'"
          >
          <v-col cols="12">
            <v-btn @click="changePage(-1)">
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-btn
              :href="content.url"
              @click="window.open(content.ur)"
              >
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn @click="changePage(1)">
              <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
          <pdf
            :src="content.url"
            @num-pages="numPages = $event"
            :page="curPage"
            ></pdf>
          </v-col>
        </div>
        <div v-else>
          {{content.data}}
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

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
import pdf from 'vue-pdf'

export default {
    data: () => ({
        list: null,
        headers: null,
        content: {data: null, contentType: null, url: null},
        numPages: 1,
        curPage: 1,
        user: '',
        pw: '',
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
        handleArrowKeys(event) {
            var delta
            if (event.keyCode == 37) delta = -1
            else if (event.keyCode == 39) delta = 1
            else return

            this.changePage(delta)
        },
        changePage(delta) {
            if (this.numPages == 1) return

            var tmp = this.curPage + delta
            if (tmp == 0) tmp = this.numPages
            else if (tmp > this.numPages) tmp = 1

            this.curPage = tmp
        }
    },
    mounted() {
        window.addEventListener('keydown', this.handleArrowKeys)
        this.headers = {
            headers: {
                Authorization: `Basic ${this.$store.getters.token}`
            }
        }
        axios.get("/members/docs.csv", this.headers)
            .then(res => {
                console.log(res)
                this.list = res.data
                    .split('\n')
                    .filter(Boolean)
                    .map(substr => substr.slice(1).split('",'))
            })
            .catch(err => console.log(err))
    },
    computed: {
        auth() {return this.$store.getters.ifAuthenticated}
    },
    components: {
        pdf
    },
    destroyed() {
        window.removeEventListener('keydown', this.handleArrowKeys)
    }
}
</script>
