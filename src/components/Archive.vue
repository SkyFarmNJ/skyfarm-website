<template>
<v-container px-10 fluid>
  <v-select
    v-model=file
    :items=list
    item-text=1
    item-value=0
     @input="getFile()"
    >

  </v-select>
  {{file}}
  <PdfControls
    :data=content.data
    v-if=content.data
    >
  </PdfControls>
</v-container>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        headers: null,
        content: {data: null, contentType: null, url: null}
    }),
    methods: {
        getFile() {
            console.log("[Archive:getFile]: " + this.file)
            axios.get('/members/' + this.file, this.headers)
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
    },
    props: {
        list: {
            type: Array,
        },
        file: {
            type: String
        },
    },
    components: {
        PdfControls: () => import('./PdfControls.vue')
    },
    mounted() {
        this.headers = {
            headers: {
                Authorization: `Basic ${this.$store.getters.token}`
            }
        }
    }
}
</script>
