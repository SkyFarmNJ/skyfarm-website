<template>
<v-container px-10 fluid>
  <v-row>
    <v-toolbar>
      <v-col cols="4">
      <v-select
        v-model=file
        :items=list
        item-text="name"
        item-value="file"
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
    v-if=file
    >
  </PdfControls>
  </v-row>
</v-container>
</template>

<script>
//import axios from 'axios'

export default {
    data: () => ({
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
}
</script>
