<template>
  <div class="relative z-50 p-12 pointer-events-none">
    <NuxtLink class="inline-block pointer-events-auto" to="/">
      <Logo />
    </NuxtLink>
    <Navigation class="pointer-events-auto" />
  </div>
</template>

<script>
import Logo from "~/assets/svg/logo.svg?inline";
import Navigation from "~/components/Navigation";

export default {
  head: {
    bodyAttrs: {
      class: 'bg-cyan-900',
    },
    htmlAttrs: {
      class: 'dark',
    }
  },
  components: { Logo, Navigation },
}
</script>