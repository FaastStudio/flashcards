<template>
  <vs-col vs-w="5">
        <vs-card style="height: 120px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <vs-button type="flat" color="#444">
              <span>{{ title }}</span>
            </vs-button>
          </div>
          <div slot="footer" v-if="false">
            <vs-row vs-justify="flex-end">
              <vs-button>1</vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
</template>

<script>
export default {
  name: 'Deck',
  props: {
    id: String,
    title: String
  }
}
</script>
