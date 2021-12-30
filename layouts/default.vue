<template>
  <div>
    <Header />
    <Nuxt />
    <ThreeMainAnimation />
  </div>
</template>

<script>
import Header from "~/components/Header";
import ThreeMainAnimation from "~/components/ThreeMainAnimation";

export default {
  components: { Header, ThreeMainAnimation },
}
</script>