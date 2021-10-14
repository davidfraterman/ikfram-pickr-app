<template>
  <base-card>
    <h2>{{ prikkrTitle }}</h2>
    <p> {{ prikkrDesc }}</p>
    
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      selectedPrikkr: null,
    };
  },
  computed: {
    prikkrId() {
      return this.selectedPrikkr.id;
    },
    prikkrTitle() {
      return this.selectedPrikkr.title;
    },
    prikkrDesc() {
      return this.selectedPrikkr.description;
    }
  },
  mounted() {
    this.selectedPrikkr = this.$store.getters["prikkrs/prikkrs"].find(
      (prikkr) => prikkr.id === this.id
    );

    console.log(this.selectedPrikkr);
  },
};
</script>