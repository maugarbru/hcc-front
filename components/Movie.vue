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
  },
  data() {
    return {
      src_path: config.api.src2,
    }
  },
  methods: {},
}
</script>