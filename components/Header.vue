<template>
  <div class="relative z-50 p-12">
    <NuxtLink class="inline-block" to="/">
      <Logo />
    </NuxtLink>
    <Navigation />
  </div>
</template>

<script>
import Logo from "~/assets/svg/logo.svg?inline";
import Navigation from "~/components/Navigation";

export default {
  head: {
    bodyAttrs: {
      class: 'bg-cyan-900',
    }
  },
  components: { Logo, Navigation },
}
</script>