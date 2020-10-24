<template>
  <v-container>
    <v-layout justify-center align-center class="black">
      <v-dialog v-model="loading" persistent width="100">
        <v-card color="black" dark>
          <v-container>
            <center>
              <v-progress-circular
                indeterminate
                color="primary"
                class="mb-0"
              ></v-progress-circular>
            </center>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="modal" max-width="800">
        <movie v-if="item.info" :item="item" />
      </v-dialog>

      <v-item-group>
        <v-row xs12>
          <v-col
            v-for="(item, index) in items"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
          >
            <v-item>
              <v-hover v-slot="{ hover }">
                <v-card
                  @click="openDialog(item)"
                  class="mx-auto poster"
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                >
                  <v-img
                    height="500"
                    :lazy-src="src_path + item.info.poster_path"
                    :src="src_path + item.info.poster_path"
                  >
                  </v-img>
                </v-card>
              </v-hover>
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
import Movie from '~/components/Movie.vue'

export default {
  components: {
    Movie,
  },
  async mounted() {
    let promPub = await this.getMovies()
  },
  data() {
    return {
      items: [],
      loading: false,
      src_path: config.api.src,
      modal: false,
      item: {},
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
    openDialog(item) {
      this.modal = true
      this.item = item
    },
  },
}
</script>

<style scoped>
.poster {
  transition: opacity 0.4s ease-in;
}

@media (min-width: 960px) {
  .poster:not(.on-hover) {
    opacity: 0.7;
  }
}
</style>