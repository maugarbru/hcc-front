<template>
  <v-card>
    <v-img
      v-if="item.info.artworks"
      max-height="500"
      :lazy-src="src_path + item.info.artworks[0].image_id + '.jpg'"
      :src="src_path + item.info.artworks[0].image_id + '.jpg'"
    >
    </v-img>
    <v-img
      v-else
      max-height="500"
      :lazy-src="src_path + item.info.cover.image_id + '.jpg'"
      :src="src_path + item.info.cover.image_id + '.jpg'"
    >
    </v-img>
    <v-container>
      <v-row class="mx-auto">
        <v-col cols="12" sm="6">
          <h1>
            {{ item.info.name }}
          </h1>
          <!-- <span class="primary--text mr-0" style="font-size: 1rem;">
            {{ item.info.release_date.slice(0, 4) }}
          </span> -->
        </v-col>
      </v-row>
      <v-container>
        <v-chip-group class="mx-auto" column
          ><v-chip
            v-for="(genre, index) in item.info.genres"
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
          {{ item.info.summary }}
        </blockquote></v-container
      >
    </v-container>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer />
      <div>
        <v-row class="mx-auto">
          <v-rating
            v-model="item.info.rating"
            :length="10"
            background-color="grey lighten-3"
            color="primary"
            readonly
            small
            half-increments
          ></v-rating>
        </v-row>
        <div align="center" class="grey--text mx-auto">
          <small>{{ item.info.rating }} ({{ item.info.rating_count }})</small>
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
      src_path: config.api.src_game,
      src_path2: config.api.src_game2,
    }
  },
  methods: {},
}
</script>