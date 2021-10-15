<template>
  <base-card>
    <h1>Mijn Resultaten</h1>
    <h2>{{ prikkrTitle }}</h2>
    <p>{{ prikkrDesc }}</p>

    <section v-if="hasAnswers">
      Beste uitkomst antwoorden
      <li v-for="ans in answers" :key="ans.id">
        {{ ans.firstDate }}
      </li>

      Minst goede uitkomst antwoorden
      <li v-for="ans in answers" :key="ans.id">
        {{ ans.cantDate }}
      </li>
    </section>
    <section v-else>Nog niemand heeft beantwoord</section>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      // id: this.$route.params.id,
      selectedPrikkr: null,
      // answers: [],
    };
  },
  computed: {
    answers() {
      return this.$store.getters["answers/answers"];
    },
    hasAnswers() {
      return this.$store.getters["answers/hasAnswers"];
    },
    prikkrId() {
      return this.$route.params.prikkrId;
    },
    creatorId() {
      return this.$store.getters["userId"];
    },
    prikkrTitle() {
      return this.selectedPrikkr.title;
    },
    prikkrDesc() {
      return this.selectedPrikkr.description;
    },
  },
  created() {
    this.loadPrikkr();
    this.fetchAnswers();
  },
  mounted() {},
  methods: {
    loadPrikkr() {
      this.selectedPrikkr = this.$store.getters["prikkrs/prikkrs"].find(
        (prikkr) => prikkr.id === this.prikkrId
      );
    },
    async fetchAnswers() {
      await this.$store.dispatch("answers/fetchAnswers", {
        creatorId: this.creatorId,
        prikkrId: this.prikkrId,
      });
    },
  },
};
</script>