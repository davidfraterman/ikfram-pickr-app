<template>
  <base-card v-if="isLoading">
    <base-spinner></base-spinner>
  </base-card>
  <base-card v-if="!isLoading">
    <h1>Mijn Resultaten</h1>
    <h2>{{ prikkrTitle }}</h2>
    <p>{{ prikkrDesc }}</p>

    <section>
      <div class="tableheader">
        <h3>Alle Inzendingen ({{ this.answers.length }})</h3>
        <base-button class="btn" mode="secondary" @click="reload"
          >Herladen</base-button
        >
      </div>

      <base-spinner class="reloadspinner" v-if="isReloading"></base-spinner>

      <div class="table-scroll" v-if="!isReloading">
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
              <td class="firstdate">
                {{
                  new Date(ans.firstDate).getDate() +
                  " " +
                  new Date(ans.firstDate).toLocaleString("default", {
                    month: "long",
                  }) +
                  " " +
                  new Date(ans.firstDate).getFullYear()
                }}
              </td>
              <td class="seconddate">
                {{
                  new Date(ans.secondDate).getDate() +
                    " " +
                    new Date(ans.secondDate).toLocaleString("default", {
                      month: "long",
                    }) +
                    " " +
                    new Date(ans.secondDate).getFullYear() ===
                  "NaN Invalid Date NaN"
                    ? "Geen antwoord"
                    : new Date(ans.secondDate).getDate() +
                      " " +
                      new Date(ans.secondDate).toLocaleString("default", {
                        month: "long",
                      }) +
                      " " +
                      new Date(ans.secondDate).getFullYear()
                }}
              </td>
              <td class="thirddate">
                {{
                  new Date(ans.thirdDate).getDate() +
                    " " +
                    new Date(ans.thirdDate).toLocaleString("default", {
                      month: "long",
                    }) +
                    " " +
                    new Date(ans.thirdDate).getFullYear() ===
                  "NaN Invalid Date NaN"
                    ? "Geen antwoord"
                    : new Date(ans.thirdDate).getDate() +
                      " " +
                      new Date(ans.thirdDate).toLocaleString("default", {
                        month: "long",
                      }) +
                      " " +
                      new Date(ans.thirdDate).getFullYear()
                }}
              </td>
              <td class="cantdate">
                {{
                  new Date(ans.cantDate).getDate() +
                  " " +
                  new Date(ans.cantDate).toLocaleString("default", {
                    month: "long",
                  }) +
                  " " +
                  new Date(ans.cantDate).getFullYear()
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <p class="noanswers" v-if="!isReloading && !isLoading && !hasAnswers">
          U heeft nog geen antwoorden.
        </p>
      </div>
    </section>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      // id: this.$route.params.id,
      selectedPrikkr: null,
      isLoading: false,
      isReloading: false,

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
    async reload() {
      this.isReloading = true;
      await this.$store.dispatch("answers/fetchAnswers", {
        creatorId: this.creatorId,
        prikkrId: this.prikkrId,
      });
      this.isReloading = false;
    },
  },
};
</script>

<style scoped>
.noanswers {
  margin-top: 0.7rem;
  color: grey;
}
.firstdate {
  color: rgb(82, 163, 82);
}

.cantdate {
  color: rgb(224, 88, 88);
}
.reloadspinner {
  margin-top: 6.5rem;
}
tbody tr:nth-child(even) {
  background-color: rgb(71, 71, 71);
}

tbody th {
  color: white;
  font-weight: 600;
}

.tableheader {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.btn {
  padding: 0.5rem;
  font-size: 90%;
}
.table-scroll {
  overflow-x: auto;
}
table {
  width: 100%;
  min-width: 35vw;
  overflow: scroll;
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
  font-size: 90%;
}
h3 {
  color: rgb(49, 214, 255);
  font-weight: normal;
  margin-bottom: 0.75rem;
}
h2 {
  color: rgb(49, 214, 255);
  margin-top: 3rem;
  font-size: 150%;
  font-weight: normal;
}

section {
  margin-top: 3rem;
}
</style>