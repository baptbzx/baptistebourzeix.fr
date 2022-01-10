<template>
  <div>
    <Moon v-if="theme === 'light'" @click="toggleTheme" />
    <MoonAwake v-if="theme === 'dark'" @click="toggleTheme" />
  </div>
</template>

<script>
import Moon from "~/assets/svg/moon_sleep.svg?inline";
import MoonAwake from "~/assets/svg/moon_awake.svg?inline";
import { mapMutations } from 'vuex'


export default {
  components: { Moon, MoonAwake },
  computed: {
    theme () {
      return this.$store.state.theme
    }
  },
  methods: {
    ...mapMutations({
      toggleTheme: "toggleTheme"
    })
  }
}
</script>