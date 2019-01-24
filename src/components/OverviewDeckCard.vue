<template>
  <v-flex xs6 md3 pa-1>
    <div class="card" @click.native="editDeck"><span class="card-title">{{ doc.data().title }}</span></div>
  </v-flex>
</template>

<script>
export default {
  name: 'deck-card',
  props: {
    doc: {
      type: Object,
      required: true
    }
  },
  methods: {
    editDeck () {
      this.$router.push('/edit/' + this.doc.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: auto;
  margin: 0;
  min-height: 20vh;
  border-radius: 15px;
  box-shadow: 3px 6px 8px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  .card-title {
    font-weight: bold;
    font-family: sans-serif;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>
