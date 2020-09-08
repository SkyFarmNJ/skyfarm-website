<template>
<v-container px-10 fluid>

  <v-row v-if="auth">

    <v-tabs align-with-title>
      <v-tab
        v-for="dir in Object.keys(sections)"
        :key=dir
        :to=getRoute(dir)
        >
        {{sections[dir].name}}</v-tab>
    </v-tabs>

    <router-view
      :sections=this.sections
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
                   :error-messages=errorMsg
                   ></v-text-field>

                <v-text-field
                   v-model="pw"
                   id="password"
                   label="Password"
                   name="password"
                   prepend-icon="mdi-lock"
                   type="password"
                   :error=passError
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

</v-container>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        list: [],
        desc: new Map(),
        headers: null,
        passError: false,
        errorMsg: null,
        content: {data: null, contentType: null, url: null},
        numPages: 1,
        curPage: 1,
        user: '',
        pw: '',
        firstFile: '',
        sections: {
            'home': {
                name: 'Member Home',
                hasCsv: false,
            },
            'docs': {
                name: 'Club Documents',
                hasCsv: true,
                list: [],
            },
            'minutes': {
                name: 'Minutes',
                hasCsv: true,
                list: [],
            },
            'statements': {
                name: 'Financial Statements',
                hasCsv: true,
                list: [],
            },
            'newsletters': {
                name: 'Newsletters',
                hasCsv: true,
                list: [],
            },
            'payment': {
                name: 'Payments',
                hasCsv: false,
            },
        },
    }),
    methods: {
        login() {
            this.$store.dispatch('login', {user: this.user, pw: this.pw}).then(() => {
                this.initSections()
            }, () => {
                this.errorMsg  = "Login Failed."
                this.passError = true
            })
            this.close()
        },
        close() {
            this.$emit('exit', null)
        },
        getRoute(dir) {
            const prefix = '/members'
            if (!this.sections[dir].hasCsv) return `${prefix}/${dir}`
            else {
                if (this.sections[dir].list.length == 0) return ''
                return `${prefix}/archive/${dir}?file=${this.sections[dir].list[0].file}`
            }
        },
        getCsv(dir) {
            console.log("[MemberPage.getCsv]: headers: " + this.headers.Authorization)
            axios.get(`/members/${dir}.csv`, this.headers)
                .then(res => {
                    console.log("[MemberPage.getCsv]: res: " +res)
                    this.sections[dir].list = []
                    res.data
                        .split('\n')
                        .filter(Boolean)
                        .map(substr => substr.split(','))
                        .forEach(([name, desc, file]) => {
                            var item = { name: name,
                                         desc: desc,
                                         file: (file) ? file.replace('&', '&amp') : file
                                       }
                            this.sections[dir].list.push(item)
                        })
                })
                .catch(err => console.log(err))
        },
        initSections() {
            this.initHeaders()
            Object.keys(this.sections)
                .forEach(key => {
                    console.log("[MemberPage.initSections] Loading: " + key)
                    if (this.sections[key].hasCsv) this.getCsv(key)
                })
        },
        initHeaders() {
            this.headers = {
                headers: {
                    Authorization: `Basic ${this.$store.getters.token}`
                }
            }
            console.log("[MemberPage.initHeaders] token: " + this.$store.getters.token )
        },
    },

    mounted() {
        if (this.$store.getters.ifAuthenticated) this.initSections()
    },

    computed: {
        auth() {
            return this.$store.getters.ifAuthenticated
        }
    },
}
</script>
