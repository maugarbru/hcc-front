<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      color="grey darken-4"
      height="80"
      @click="drawer = !drawer"
    >
      <v-toolbar-title
        ><v-img
          max-height="60"
          contain
          :src="require('~/assets/img/name.png')"
        ></v-img
      ></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="my-3">
            <v-img
              contain
              max-height="60"
              :src="require('~/static/logo.png')"
            >
            </v-img>
          </v-list-item-title>
          <v-list-item-title class="my-6">
            <v-img
              max-height="60"
              contain
              :src="require('~/assets/img/name.png')"
            ></v-img>
          </v-list-item-title>
          <v-list-item-subtitle>
            Menu
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item link exact to="/">
          <v-list-item-icon>
            <v-icon color="primary">mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
          exact
        >
          <v-list-item-icon>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="black"><nuxt /> </v-main>

    <v-footer padless color="grey darken-4">
      <v-col class="text-center" cols="12">
        <small>
          {{ new Date().getFullYear() }} —
          <i>Designed and developed by</i>
          <a href="https://mgbrunal.github.io" target="_blank"
            ><strong>@MGBrunal</strong></a
          >
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
      drawer: false,
    }
  },
  methods: {},
}
</script>
