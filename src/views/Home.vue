<template>
  <div class="home">
    <vs-navbar type="flat" class="navbarx">
      <vs-button type="flat" radius icon="menu"></vs-button>
      <vs-navbar-title>{{ pageTitle }}</vs-navbar-title>
    </vs-navbar>
    <main>
      <transition name="fade" mode="out-in"
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <router-view/>
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      prevHeight: 0
    }
  },
  methods: {
    beforeLeave (element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter (element) {
      const { height } = getComputedStyle(element)
      element.style.height = this.prevHeight
      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter (element) {
      element.style.height = 'auto'
    }
  },
  computed: {
    pageTitle () {
      let name = String(this.$route.name)
      name = name.charAt(0).toUpperCase() + name.slice(1)
      return name
    }
  }
}
</script>
