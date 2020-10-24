<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs12>
        <v-parallax
          dark
          :src="require('~/assets/img/background.png')"
          height="200"
        >
          <v-row align="center" justify="center">
            <v-col class="text-center" cols="12">
              <inspire />
            </v-col>
          </v-row>
        </v-parallax>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center class="black">
      <v-item-group>
        <v-container>
          <v-row xs12>
            <v-col
              v-for="(item, index) in items"
              :key="index"
              cols="12"
              md="4"
              lg="6"
            >
              <v-item>
                <v-card class="mx-auto" outlined :to="item.to" height="200">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4 secondary--text">
                        {{ item.description }}
                      </div>
                      <v-list-item-title
                        class="headline mb-1 primary--text"
                        style="text-shadow: 0px 0px 10px black;"
                      >
                        <h1>{{ item.title }}</h1>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-layout>
  </v-container>
</template>

<script>
import config from '~/assets/config.js'
import Inspire from '~/components/Inspire.vue'

export default {
  components: {
    Inspire,
  },
  data() {
    return {
      publication: [],
      items: [
        {
          title: 'Movies',
          description: 'Movies',
          to: '/movies',
        },
        {
          title: 'Games',
          description: 'Videogames',
          to: '/games',
        },
      ],
    }
  },
  methods: {},
}
</script>
