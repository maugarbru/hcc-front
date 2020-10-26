<template>
  <v-card>
    <v-img
      max-height="500"
      :lazy-src="src_path + item.info.backdrop_path"
      :src="src_path + item.info.backdrop_path"
    >
    </v-img>

    <v-container>
      <v-row class="mx-auto">
        <v-col cols="12" sm="6">
          <h1>
            {{ item.info.title }}
          </h1>
          <span class="primary--text mr-0" style="font-size: 1rem;">
            {{ item.info.release_date.slice(0, 4) }}
          </span>
        </v-col>
        <v-col v-if="!playing" cols="12" sm="6">
          <v-btn
            :loading="loading"
            block
            color="green darken-3"
            @click="playMovie(item)"
          >
            Play movie
            <v-icon right>mdi-play</v-icon>
          </v-btn>
        </v-col>
        <v-row class="mx-auto" v-if="playing && !playing_this">
          <v-col cols="12" class="mb-n6">
            <small class="secondary--text"
              ><i>A movie is playing already</i>
            </small>
          </v-col>
          <v-col cols="12">
            <v-btn
              :loading="loading"
              class="mx-auto"
              color="primary"
              block
              @click="playMovie(item)"
            >
              Play this movie
              <v-icon right>mdi-play</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mx-auto" v-if="playing_this">
          <v-col cols="12" class="mb-n6">
            <small class="green--text"
              ><i>This movie is playing right now!</i>
            </small>
          </v-col>
          <v-col cols="12">
            <v-btn
              :loading="loading"
              class="mx-auto"
              color="red darken-3"
              block
              @click="stopMovie(item)"
            >
              Stop movie
              <v-icon right>mdi-stop</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-row>
      <v-container>
        <v-chip-group class="mx-auto" column
          ><v-chip
            v-for="(genre, index) in item.info.genre_ids"
            :key="index"
            draggable
            outlined
            color="primary"
            class="white--text"
          >
            {{ genre.name }}
          </v-chip></v-chip-group
        >
      </v-container>
      <v-container
        ><blockquote align="justify">
          {{ item.info.overview }}
        </blockquote></v-container
      >
    </v-container>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer />
      <div>
        <v-row class="mx-auto">
          <v-rating
            v-model="item.info.vote_average"
            :length="10"
            background-color="grey lighten-3"
            color="primary"
            readonly
            small
            half-increments
          ></v-rating>
        </v-row>
        <div align="center" class="grey--text mx-auto">
          <small
            >{{ item.info.vote_average }} ({{ item.info.vote_count }})</small
          >
        </div>
      </div>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import config from '~/assets/config.js'

export default {
  props: {
    item: Object,
    playing: Boolean,
    playing_this: Boolean,
  },
  data() {
    return {
      src_path: config.api.src_movie_backdrop,
      loading: false,
      play: false,
    }
  },
  methods: {
    async playMovie(movie) {
      this.loading = true
      let self = this
      let url = config.api.url + 'files/open'
      let prom = await axios
        .post(url, {
          path: config.api.movies_path + movie.path,
          type: 'video',
        })
        .catch(function (error) {
          console.log(error)
        })

      setTimeout(() => {
        self.$emit('change', {
          movie: movie,
          playing: true,
        })
        self.loading = false
      }, 1500)
    },
    async stopMovie(movie) {
      this.loading = true
      let self = this
      let url = config.api.url + 'files/close'
      let prom = await axios
        .post(url, {
          type: 'video',
        })
        .catch(function (error) {
          console.log(error)
        })
      setTimeout(() => {
        self.$emit('change', {
          playing: false,
        })
        self.loading = false
      }, 1500)
    },
  },
}
</script>