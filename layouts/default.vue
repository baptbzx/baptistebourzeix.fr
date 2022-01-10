<template>
  <div>
    <Header />
    <Nuxt />
    <ThreeMainAnimation />
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import ThreeMainAnimation from "~/components/ThreeMainAnimation";

export default {
  components: { Header, Footer, ThreeMainAnimation },
}
</script>