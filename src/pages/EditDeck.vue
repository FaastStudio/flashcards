<template>
  <div>
    <h1>Edit Deck</h1>
    <h3>{{ deckId }}</h3>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    deckId () {
      return this.$route.params.deckId
    }
  }
}
</script>
