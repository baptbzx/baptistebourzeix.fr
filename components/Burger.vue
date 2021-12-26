<template>
  <div class="burger-menu fixed z-30 top-12 right-12 w-8 h-8 cursor-pointer" :class="{ 'mt-2': menuOpened }"
       @click="toggleMenu">
    <div
        class="block h-0.5 w-full bg-white transform transition-all"
        :class="{ 'rotate-45 mb-0 delay-300': menuOpened, 'mb-2': !menuOpened }"
    ></div>
    <div
        class="h-0.5 w-9/12 bg-white mb-2 transition-all delay-300"
        :class="{ 'opacity-0 h-0 mb-0 hidden -mr-1': menuOpened, 'block': !menuOpened, }"
    ></div>
    <div
        class="block h-0.5 bg-white transform transition-all"
        :class="{ '-rotate-45 mb-0 w-full delay-300': menuOpened, 'w-10/12': !menuOpened,  }"
    ></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    menuOpened () {
      return this.$store.state.menuOpened
    }
  },
  methods: {
    ...mapMutations({
      toggleMenu: "toggleMenu"
    })
  }
}
</script>

<style>
.burger-menu {
  &:hover {
    > div {
      width: 100%;
    }
  }
}
</style>
