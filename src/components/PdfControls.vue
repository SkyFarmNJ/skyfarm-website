<template>
<v-container fluid>
  <v-row justify="center">
    <v-btn @click="changePage(-1)">
      <v-icon>mdi-arrow-left-bold</v-icon>
    </v-btn>
    <v-btn
      :href="url"
      @click="window.open(url)"
      >
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
    <v-btn @click="changePage(1)">
      <v-icon>mdi-arrow-right-bold</v-icon>
    </v-btn>
  </v-row>
  <v-row>
    <pdf
      :src="`/members/${url}`"
      @num-pages="numPages = $event"
      :page=curPage
      ></pdf>
    </v-row>
</v-container>
</template>

<script>
export default {
    props: {
        url: {
            type: String
        }
    },
    data: () => ({
        numPages: 1,
        curPage: 1
    }),
    methods: {
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
    watch: {
        url: function() {this.curPage = 1}
    },
    components: {
        pdf: () => import('vue-pdf')
    },
    mounted() {
        window.addEventListener('keydown', this.handleArrowKeys)
    },
    destroyed() {
        window.removeEventListener('keydown', this.handleArrowKeys)
    },
}
</script>
