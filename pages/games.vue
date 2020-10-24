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
        <game v-if="item.info" :item="item" />
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
      loading: false,
      src_path: config.api.src_game,
      modal: false,
      item: {},
    }
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
    },
    openDialog(item) {
      console.log(item);
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