<template>
  <v-app dark>
    <v-app-bar fixed app color="grey darken-4">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-spacer />
      <v-img
        max-height="60"
        contain
        :src="require('~/assets/img/name.png')"
      ></v-img>
      <v-spacer />
    </v-app-bar>

    <v-main class="black"><nuxt /> </v-main>

    <v-footer padless color="grey darken-4">
      <v-col class="text-center" cols="12">
        <small>
          {{ new Date().getFullYear() }} —
          <i>Designed and developed by</i>
          <a href="https://mgbrunal.github.io" target="_blank"><strong>@MGBrunal</strong></a>
        </small>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import config from '~/assets/config.js'

export default {
  data() {
    return {
      title: 'HCC',
      items: config.routes,
    }
  },
  methods: {},
}
</script>
