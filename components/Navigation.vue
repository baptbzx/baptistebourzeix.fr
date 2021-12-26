<template>
  <div>
    <Burger />
    <nav
        class="navigation flex items-center justify-center fixed top-0 left-0 h-full w-full"
        :class="{ 'pointer-events-none': !menuOpened }"
    >
      <ul
          class="navigation__list relative z-20 text-center transition delay-200 duration-300"
          :class="{ 'opacity-1 visible': menuOpened, 'opacity-0 invisible': !menuOpened }"
      >
        <li class="navigation__item">
          <NuxtLink class="inline-block" to="/about">
            About
          </NuxtLink>
        </li>
        <li class="navigation__item">Contact</li>
      </ul>
      <div
          class="block w-1/2 h-full absolute z-10  top-0 left-0 bg-indigo-500 transform transition delay-600 duration-500"
          :class="{ '-translate-y-0 delay-200': menuOpened, 'translate-y-full': !menuOpened }"
      ></div>
      <div
          class="block w-1/2 h-full absolute z-10  top-0 right-0 bg-indigo-600 transform transition delay-600 duration-500"
          :class="{ '-translate-y-0 delay-200': menuOpened, '-translate-y-full': !menuOpened }"
      ></div>
    </nav>
  </div>
</template>

<script>
import Burger from "~/components/Burger";
import {mapMutations} from "vuex";

export default {
  components: { Burger },
  computed: {
    menuOpened () {
      return this.$store.state.menuOpened
    }
  },
  methods: {
    ...mapMutations({
      closeMenu: "closeMenu"
    })
  },
  watch: {
    async $route(to, from) {
      if (to.name == from.name) return // if you're going to somewhere else than `wallpaper`
      // the `return` will end the execution and not go further
      this.closeMenu()
      console.log('fetch logic here in case you stay on the wallpaper route name')
    },
  },
}
</script>