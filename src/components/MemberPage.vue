<template>
<v-container fluid>
  <v-list
    v-if="auth"
    >
    <v-list-item
      v-for="(item, i) in list"
      :key=i
      :href="`http://red.local/members/${item[1]}`"
      >
      <v-list-item-title
        >{{item[0]}}</v-list-item-title>
    </v-list-item>
  </v-list>

  <v-alert type="error" prominent v-else>
    You must be logged in to view this page.
  </v-alert>

</v-container>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        list: null
    }),
    methods: {

    },
    mounted() {
        axios.get("http://red.local/members/docs.csv", {
            headers: {
                Authorization: `Basic ${this.$store.getters.token}`
            }
        })
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
