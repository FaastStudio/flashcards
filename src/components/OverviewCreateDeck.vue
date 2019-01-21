<template>
  <v-flex xs6 pa-1>
    <div class="card" @click="createNewDeck()"><span class="material-icons">add_box</span></div>
  </v-flex>
</template>

<script>
export default {
  name: 'create-deck-card',
  methods: {
    createNewDeck () {
      this.$router.push('/create')
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: 0;
  min-height: 20vh;
  border-radius: 15px;
  box-shadow: 3px 6px 8px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
