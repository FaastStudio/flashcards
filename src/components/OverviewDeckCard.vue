<template>
  <v-flex xs6 pa-1>
    <div class="card" >{{ doc.data().title }}</div>
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
}
</style>
