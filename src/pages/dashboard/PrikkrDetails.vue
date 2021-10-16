<template>
  <base-card v-if="isLoading">
    <base-spinner></base-spinner>
  </base-card>
  <base-card v-if="!isLoading">
    <h1>Mijn Resultaten</h1>
    <h2>{{ prikkrTitle }}</h2>
    <p>{{ prikkrDesc }}</p>

    <section v-if="hasAnswers">
      <table>
        <thead>
          <tr>
            <th>Persoon</th>
            <th>1e voorkeur</th>
            <th>2e voorkeur</th>
            <th>3e voorkeur</th>
            <th>Niet beschikbaar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ans in answers" :key="ans.id">
            <th scope="row">{{ ans.name || "Anoniem" }}</th>
            <td>{{ ans.firstDate }}</td>
            <td>{{ ans.secondDate || "Geen" }}</td>
            <td>{{ ans.thirdDate || "Geen" }}</td>
            <td>{{ ans.cantDate }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section v-else-if="!hasAnswers && !isLoading">
      <p>Nog niemand heeft geantwoord</p>
    </section>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
      // id: this.$route.params.id,
      selectedPrikkr: null,
      isLoading: false,
      // answers: [],
    };
  },
  computed: {
    answers() {
      return this.$store.getters["answers/answers"];
    },
    hasAnswers() {
      return !this.isLoading && this.$store.getters["answers/hasAnswers"];
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
  methods: {
    loadPrikkr() {
      this.selectedPrikkr = this.$store.getters["prikkrs/prikkrs"].find(
        (prikkr) => prikkr.id === this.prikkrId
      );
    },
    async fetchAnswers() {
      this.isLoading = true;
      await this.$store.dispatch("answers/fetchAnswers", {
        creatorId: this.creatorId,
        prikkrId: this.prikkrId,
      });
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  overflow-x: scroll;
  border-collapse: collapse;
}
td,
th {
  border: 2px solid rgb(20, 194, 247);
  color: white;
  padding: 0.5rem;
  font-size: 95%;
}
td {
  font-size: 85%;
  text-align: center;
}
tr:hover {
  background-color: rgba(65, 194, 233, 0.096);
}
th {
  color: rgb(20, 194, 247);
  font-weight: normal;
}
thead {
  background-color: rgba(20, 194, 247, 0.171);
}
li {
  color: white;
  text-decoration: none;
}
p {
  color: white;
}

h2 {
  color: rgb(49, 214, 255);
  margin-top: 3rem;
  font-size: 200%;
}
section {
  margin-top: 3rem;
}
</style>