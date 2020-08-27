<template>
  <v-container px-10 fluid>

    <v-row class="text-left">
      <v-col cols="12" mb-5 class="text-center">
        <h2>Club Documents</h2>
      </v-col>
    </v-row>

    <v-row class="text-left">
      <v-col cols="12" mb-5>

        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Description</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in docs"
                :key="item.name"
                @click="openPdf(item.file)"
                >
                <td>{{ item.name }}</td>
                <td>{{ item.desc }}</td>
                <td>
                  <v-btn icon>
                    <v-icon>mdi-open-in-app</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-open-in-new</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-download</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>


      </v-col>
    </v-row>

    <v-overlay :value="overlay">
      <PdfControls
        :file=file
        :overlay=true
        @close="overlay = false"
        ></PdfControls>
    </v-overlay>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        overlay: false,
        docs: [],
        file: '',
    }),
    components: {
        PdfControls: () => import('./PdfControls.vue')
    },
    methods: {
        openPdf(file) {

            this.file = file
            this.overlay = true
        }
    },
    mounted() {
        window.addEventListener('keydown', this.handleArrowKeys)
        this.headers = {
            headers: {
                Authorization: `Basic ${this.$store.getters.token}`
            }
        }
        this.list = []
        axios.get("/members/docs.csv", this.headers)
            .then(res => {
                console.log(res)
                res.data
                    .split('\n')
                    .filter(Boolean)
                    .map(substr => substr.split(','))
                    .forEach(([name, desc, file]) => {
                        var item = { name: name, desc: desc, file: file  }
                        this.docs.push(item)
                    })
            })
            .catch(err => console.log(err))
                }
    }

</script>
<!--
<style lang="scss">
  .v-overlay__content {
  width: 100%
  }
</style>
-->
