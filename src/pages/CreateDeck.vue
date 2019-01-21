<template>
  <v-layout>
    <v-flex v-if="!tool" xs12 sm10 md8 lg6>
      <h1>Create Deck</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          label="Title"
          :rules="[v => !!v || 'Item is required']"
          v-model="title"
          required
        ></v-text-field>
        <v-text-field
          label="Subject"
          :rules="[v => !!v || 'Item is required']"
          v-model="subject"
          required
        ></v-text-field>
        <v-btn :disabled="!valid" color="primary" @click="validate">Create Deck</v-btn>
      </v-form>
    </v-flex>
    <v-flex v-if="tool">
      <v-card class="mx-auto" color="#eee" light max-width="400">
        <v-container>
          <v-card-title>
            <span class="title font-weight-light">Question</span>
          </v-card-title>

          <v-text-field label="Your question..."
            v-model="cardInput.question"
            ></v-text-field>

        </v-container>
      </v-card>

      <v-card class="mx-auto mt-3" color="#eee" light max-width="400">
        <v-container>
          <v-card-title>
            <span class="title font-weight-light">Answer</span>
          </v-card-title>

          <v-text-field label="The answer..."
            v-model="cardInput.answer"
            ></v-text-field>

          <v-card-actions>
            <v-btn color="primary" @click="saveCard()">New Card</v-btn>
            <v-btn color="success">Save Deck</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      Card added
      <v-btn
        color="blue"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
export default {
  name: 'create-deck-page',
  data: () => ({
    snackbar: false,
    valid: true,
    title: null,
    subject: null,
    tool: false,
    cardInput: {
      question: null,
      answer: null
    },
    cards: []
  }),
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.tool = true
      }
    },
    saveCard () {
      if (this.cardInput.question && this.cardInput.question) {
        this.cards.push(
          { question: this.cardInput.question, answer: this.cardInput.answer }
        )
        this.snackbar = true
        this.cardInput.answer = null
        this.cardInput.question = null
        console.log(...this.cards)
      }
    }
  }
}
</script>
