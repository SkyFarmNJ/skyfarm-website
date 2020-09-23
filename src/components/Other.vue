<template>
<v-container px-10 fluid>

<v-card v-if="auth">

<v-form>
<v-select
   v-model="select"
   :items="list"
></v-select>
</v-form>

</v-card>


  <v-alert type="error" prominent v-else>
    You must be logged in to view this page.
  </v-alert>

</v-container>
</template>

<script>
import axios from 'axios'
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
        this.list = []
        axios.get("/members/minutes.csv", this.headers)
            .then(res => {
                console.log(res)
                res.data
                    .split('\n')
                    .filter(Boolean)
                    .map(substr => substr.slice(1).split('",'))
                    .forEach(([key, val]) => {
                        var item = { label: val, value: key }
                        this.list.push(item)
                    })
            })
            .catch(err => console.log(err))

    },
    computed: {
        auth() {return this.$store.getters.ifAuthenticated}
    },
/*
    components: {
        pdf
    },
*/
    destroyed() {
        window.removeEventListener('keydown', this.handleArrowKeys)
    }
}
</script>
