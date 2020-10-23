<template>
  <v-container>
      <!-- <v-img :src="random_quote.img" contain width="200" /> -->
      <blockquote class="mx-auto blockquote" align="center">
        &#8220;{{random_quote.quote}}.&#8221;
        <footer>
          <small>
            <em>&mdash;{{random_quote.author}}</em>
          </small>
        </footer>
      </blockquote>
  </v-container>
</template>

<script>
import quotes from '~/assets/quotes.js'

export default {
  beforeMount() {
    this.getRandomQuote()
  },
  data() {
    return {
      random_quote: {},
    }
  },
  methods: {
    getRandomQuote() {
      let random = Math.floor(Math.random() * (quotes.length - 1))
      this.random_quote = quotes[random]
    },
  },
}
</script>
