<template>
<v-container px-10 fluid>

  <v-row>
    <v-toolbar>
      <v-col lg="3" sm="12">
        <v-select
           v-model=file
           :items=getList()
           item-text="name"
           item-value="file"
           >
        </v-select>
      </v-col>
      <v-col lg="5" sm="12" class="text-center"
        v-if="$vuetify.breakpoint.mdAndUp"
        >
        <b>{{getDesc()}}</b>
      </v-col>
      <v-col lg="4" sm="12" class="text-right"
        v-if="$vuetify.breakpoint.mdAndUp"
        >
        {{file}}
      </v-col>
    </v-toolbar>
  </v-row>

  <v-row>
  <PdfControls
    :file=file
    >
  </PdfControls>
  </v-row>
</v-container>
</template>

<script>
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
            type: String,
            default: function() {return this.$route.query.file}
        },
        desc: {
            type: Map
        },
        sections: {
            type: Object
        },
    },
    components: {
        PdfControls: () => import('./PdfControls.vue')
    },
    methods: {
        getList() {
            return this.sections[this.$route.params.dir].list
        },
        getDesc() {
            var list = this.sections[this.$route.params.dir].list
            for (var x in list) {
                if (this.file == list[x].file) return list[x].desc
            }
            console.log("[Archive:getDesc()]: failed to find desc for " + this.file)
        },
    },
    watch: {
        file: function() {
            console.log('[Archive::watch::file]: ' + `/members/archive/${this.$route.params.dir}/${this.file}`)
            document.location.href = `#/members/archive/${this.$route.params.dir}?file=${this.file}`
            this.$ga.page('/memberhome/archive/?' + this.file)
        },

        '$route.query.file': function() {this.file = this.$route.query.file}
    },
}
</script>
