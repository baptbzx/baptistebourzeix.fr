<template>
  <div>
    <Moon v-if="theme === 'light'" @click="onMoonClick" />
    <MoonAwake v-if="theme === 'dark'" @click="onMoonClick" />
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
    }),
    onMoonClick: function () {
      console.log('on::moon::click')
      this.toggleTheme()
      this.$emit('moonClick')
    }
  }
}
</script>