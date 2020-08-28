<template>
<v-container px-10 fluid>
  <v-row>
    <v-toolbar>
      <v-col cols="3">
      <v-select
        v-model=file
        :items=list
        item-text="name"
        item-value="file"
        >
      </v-select>
      </v-col>
      <b>{{title}}</b>
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
//import axios from 'axios'

export default {
    data: () => ({
        content: '',
	title: null
    }),
    props: {
        list: {
            type: Array,
        },
        file: {
            type: String
        },
        desc: {
            type: Map
        }
    },
    components: {
        PdfControls: () => import('./PdfControls.vue')
    },
    watch: {
        file: function(val) {
            this.title = this.desc.get(val)
        }
    }
}
</script>
