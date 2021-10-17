<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch('tryLogin');
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: "Poppins", sans-serif;
}

body {
  background-color: rgb(58, 58, 58);
  min-height: 100vh;
}

h1 {
  color: white;
  font-size: 300%;
}
</style>
