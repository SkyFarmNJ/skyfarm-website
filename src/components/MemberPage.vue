<template>
<v-container px-10 fluid>
  <v-expansion-panels
    v-if="auth"
    >
    <v-expansion-panel
      v-for="(item, i) in list"
      :key=i
      >
      <v-expansion-panel-header
        @click="getFile(`http://red.local/members/${item[1]}`)"
        >{{item[0]}}</v-expansion-panel-header>
      <v-expansion-panel-content>{{content}}</v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-alert type="error" prominent v-else>
    You must be logged in to view this page.
  </v-alert>

</v-container>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        list: null,
        headers: null,
        content: null,
    }),
    methods: {
        getFile(url) {
            axios.get(url, this.headers)
                .then(res => {
                    console.log(res)
                    this.content = res
                })
                .catch(err => console.log(err))
        }
    },
    mounted() {
        this.headers = {
            headers: {
                Authorization: `Basic ${this.$store.getters.token}`
            }
        }
        axios.get("http://red.local/members/docs.csv", this.headers)
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
    }
}
</script>
