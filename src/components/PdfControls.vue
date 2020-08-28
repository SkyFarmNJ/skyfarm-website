<template>
<v-container>
  <v-row justify="center">
    <v-toolbar>
    <v-btn @click="changePage(-1)">
      <v-icon>mdi-arrow-left-bold</v-icon>
    </v-btn>
    <v-text-field
      v-model.number=curPage
      outlined
      style="top: 25%; width: 10%"
      type="number"
      ></v-text-field>
    <v-btn @click="changePage(1)">
      <v-icon>mdi-arrow-right-bold</v-icon>
    </v-btn>
    <v-btn
      @click="open(url())"
      >
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
    <!--
    <v-btn @click="$refs.pdfComponent.print()">
      <v-icon>mdi-printer</v-icon>
    </v-btn>
    -->
    <v-btn @click="close" v-if="overlay">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    </v-toolbar>
  </v-row>
  <v-row> <!--  style="width: 100%"> -->
    <pdf
      :src="{
            url: url(),
            httpHeaders: header(),
            }"
      @num-pages="numPages = $event"
      :page=curPage
      ref="pdfComponent"
      >
    </pdf>
  </v-row>
</v-container>
</template>

<script>
export default {
    props: {
        file: {
            type: String
        },
        overlay: {
            type: Boolean,
            default: false,
        }
    },
    data: () => ({
        numPages: 1,
        curPage: 1,
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
        },
        close() {
            this.$emit('close', null)
        },
        header() {
            return {Authorization: `Basic ${this.$store.getters.token}`}
        },
        url() {
            return `/members/${this.file}`
        },
        open(url) {
            window.open(url)
        },
    },
    watch: {
        file: function() {this.curPage = 1},
        curPage: function() {
            if (this.curPage <= 0) this.curPage = 1
            else if (this.curPage > this.numPages) this.curPage = this.numPages
        },
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
