<template>
  <v-container>
    <v-layout justify-center align-center>
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

      <v-app-bar
        v-if="playing && !modal"
        dense
        fixed
        bottom
        color="green darken-3"
      >
        <v-icon left>mdi-movie-open</v-icon>
        <v-toolbar-title class="mx-auto"
          ><i>Playing:</i>
          <strong>{{ item_playing.info.title }}</strong></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn small dark color="red darken-3" @click="stopMovie(item_playing)">
          <span class="d-none d-sm-flex">Stop movie</span
          ><v-icon>mdi-stop</v-icon></v-btn
        >
      </v-app-bar>

      <v-dialog v-model="modal" max-width="800">
        <movie
          v-if="item.info"
          :item="item"
          :playing="playing"
          :playing_this="playing_this"
          @change="changeStatus"
        />
      </v-dialog>

      <v-item-group>
        <v-toolbar color="transparent">
          <v-spacer></v-spacer>
          <v-text-field
            placeholder="Search movie by name"
            append-icon="mdi-magnify"
            class="mt-5"
            solo
            clearable
            v-model="filter_name"
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-toolbar>
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
                  max-width="350"
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                >
                  <v-img
                    min-height="450"
                    min-width="280"
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
    let prom = await this.getMovies()
  },
  data() {
    return {
      loading: false,
      playing: false,
      filter: false,
      modal: false,
      playing_this: false,

      item: {},
      items: [],
      allItems: [],
      categories: [],

      item_playing: undefined,
      src_path: config.api.src_movie_cover,

      filter_name: '',
    }
  },
  watch: {
    filter_name() {
      if (this.filter_name == null || this.filter_name.length == 0) {
        this.items = this.allItems
      } else {
        this.items = this.allItems.filter((item) =>
          item.info.title.toLowerCase().includes(this.filter_name.toLowerCase())
        )
      }
    },
  },
  methods: {
    async getMovies() {
      let response = []
      this.loading = true
      let url = config.api.url + 'files/'
      let prom = await axios
        .post(url, {
          path: config.api.movies_path,
          type: 'movies',
        })
        .catch(function (error) {
          console.log(error)
        })
      if (prom.data.files) {
        response = prom.data.files
      }
      this.loading = false
      this.items = response
      this.allItems = response
    },
    async stopMovie(movie) {
      this.loading = true
      let url = config.api.url + 'files/close'
      let prom = await axios
        .post(url, {
          type: 'video',
        })
        .catch(function (error) {
          console.log(error)
        })
      this.playing_this = false
      this.item_playing = undefined
      this.playing = false
      this.loading = false
    },
    openDialog(item) {
      if (this.item_playing) {
        if (item.info.id == this.item_playing.info.id) {
          this.playing_this = true
        } else {
          this.playing_this = false
        }
      }
      this.modal = true
      this.item = item
    },
    changeStatus(state) {
      if (state.playing) {
        this.item_playing = state.movie
        this.playing_this = true
        this.playing = true
      } else {
        this.item_playing = undefined
        this.playing_this = false
        this.playing = false
      }
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