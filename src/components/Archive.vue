<template>
<v-container px-10 fluid>
  <v-row>
    <v-toolbar>
      <v-col cols="4">
      <v-select
        v-model=file
        :items=list
        item-text=1
        item-value=0
        >
      </v-select>
      </v-col>
      <v-spacer/>
      {{file}}
    </v-toolbar>
  </v-row>
  <v-row>
  <PdfControls
    :file=file
    v-if="file.includes('.pdf')"
    >
  </PdfControls>
  <div
    v-else
    v-html=content.data
    >
  </div>
  </v-row>
</v-container>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        content: ''
    }),
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
    methods: {
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
    },
    watch: {
        file: function() {
            if (this.file.includes('.htm')) this.getFile(`/members/${this.file}`)
        }
    },
}
</script>
