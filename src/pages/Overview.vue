<template>
  <div class="overview" style="margin: auto auto; margin-top: 2rem;">
    <vs-row vs-w="12" vs-type="flex" vs-justify="start" vs-align="left" style="padding: 10px">
      <vs-col vs-w="6" vs-lg="2" vs-sm="4" vs-xs="6">
        <vs-card style="height: 120px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <vs-button type="flat" color="#444">
              <span><i class="material-icons">add_box</i></span><br>
              <span>Create new Deck</span>
            </vs-button>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button>1</vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<style lang="scss" scoped>
</style>
