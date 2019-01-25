<template>
  <v-flex xs6 md3 pa-1>
    <div class="card" :class="{'todo': doc.data().isTodo}" @click.native="editDeck">
      <v-container fluid>
        <v-layout fill-height wrap>
          <v-flex xs12>
            <span class="subheading">{{ doc.data().subject }}</span>
          </v-flex>
          <v-flex xs12 justify-space-around>
            <span class="card-title">{{ doc.data().title }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
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
  flex-wrap: wrap;
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
.todo {
  background-color: lightseagreen;
}
</style>
