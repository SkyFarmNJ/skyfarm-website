<template>
<v-container px-10 fluid>
  <v-select
    v-model=file
    :items=list
    item-text=1
    item-value=0
    >

  </v-select>
  {{file}}
  <PdfControls
    :url=file
    v-if=file
    >
  </PdfControls>
</v-container>
</template>

<script>
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
    }
}
</script>
