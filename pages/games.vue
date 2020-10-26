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
        <v-icon left>mdi-gamepad-variant</v-icon>
        <v-toolbar-title class="mx-auto"
          ><i>Game started:</i>
          <strong>{{ item_playing.info.name }}</strong></v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-dialog v-model="modal" max-width="800">
        <game
          v-if="item.info"
          :item="item"
          :playing="playing"
          @change="changeStatus"
        />
      </v-dialog>

      <v-item-group>
        <v-toolbar color="transparent">
          <v-spacer></v-spacer>
          <v-text-field
            placeholder="Search game by name"
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
                    :lazy-src="src_path + item.info.cover.image_id + '.jpg'"
                    :src="src_path + item.info.cover.image_id + '.jpg'"
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
import Game from '~/components/Game.vue'

export default {
  components: {
    Game,
  },
  async mounted() {
    let prom = await this.getGames()
  },
  data() {
    return {
      items: [],
      allItems: [],
      item: {},

      loading: false,
      modal: false,
      playing: false,

      item_playing: undefined,
      src_path: config.api.src_game,

      filter_name: '',
    }
  },
  watch: {
    filter_name() {
      if (this.filter_name == null || this.filter_name.length == 0) {
        this.items = this.allItems
      } else {
        this.items = this.allItems.filter((item) =>
          item.info.name.toLowerCase().includes(this.filter_name.toLowerCase())
        )
      }
    },
  },
  methods: {
    async getGames() {
      let response = []
      this.loading = true
      let url = config.api.url + 'files/'
      let prom = await axios
        .post(url, {
          path: config.api.games_path,
          type: 'games',
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
    openDialog(item) {
      this.modal = true
      this.item = item
    },
    changeStatus(state) {
      if (state.playing) {
        this.item_playing = state.game
        this.playing = true
      } else {
        this.item_playing = undefined
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