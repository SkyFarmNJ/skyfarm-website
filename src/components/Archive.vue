<template>
<v-container px-10 fluid>
  <v-row>
    <v-toolbar>
      <v-col cols="3">
      <v-select
        v-model=file
        :items=getList()
        item-text="name"
        item-value="file"
        >
      </v-select>
      </v-col>
      <b>{{getDesc()}}</b>
      <v-spacer/>
      {{file}}
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
//import axios from 'axios'
//import router from '../router.js'

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
            default: function() {return this.$route.params.file}
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
        },
        /*
        checkList() {
            console.log(this.$route.params.dir)
            if (this.list.length == 0) this.$emit('update', this.$route.params.dir)
        },
        */
    },
    watch: {
        //list: function() {this.checkList()},
        /*
        file: function(val) {
            this.title = this.desc.get(val)
        }
        */
        /*file: function() {
            this.$router.push(`/members/archive/${this.$route.params.dir}/${this.file}`)
        }
        */
        '$route.params.file': function() {this.file = this.$route.params.file}
    },
     mouted() {
        /*
        console.log(`Archive mounted: file is ${this.$route.params.file}`)
        this.file = this.$route.params.file
        this.checkList()
        */
         //console.log('what the heck')
         //this.file = this.$route.params.file
    },
}
</script>
