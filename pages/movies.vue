<template>
  <v-container>
    <v-layout justify-center align-center class="black">
      <v-dialog v-model="loading" persistent width="100">
        <v-card color="black" dark>
          <v-container>
            <center>
              <v-progress-circular
                indeterminate
                color="secondary"
                class="mb-0"
              ></v-progress-circular>
            </center>
          </v-container>
        </v-card>
      </v-dialog>
      <v-item-group>
        <v-row xs12>
          <v-col
            v-for="(item, index) in items"
            :key="index"
            cols="6"
            sm="4"
            lg="3"
          >
            <v-item>
              <v-card class="mx-auto">
                <v-img
                  height="400"
                  :lazy-src="src_path + item.info.poster_path"
                  :src="src_path + item.info.poster_path"
                ></v-img>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import config from '~/assets/config.js'

export default {
  async mounted() {
    let promPub = await this.getMovies()
  },
  data() {
    return {
      items: [],
      loading: false,
      src_path: config.api.src,
    }
  },
  methods: {
    async getMovies() {
      let response = []
      this.loading = true
      let url = config.api.url + 'files/'
      let prom = await axios
        .post(url, {
          path: config.api.movies_path,
          type: 'movie',
        })
        .catch(function (error) {
          console.log(error)
        })
      if (prom.data.files) {
        response = prom.data.files
      }
      this.loading = false
      this.items = response
    },
  },
}
</script>
