<template>
  <base-card v-if="isLoading">
    <base-spinner></base-spinner>
  </base-card>
  <base-card v-if="!isLoading">
    <h1>Mijn Resultaten</h1>
    <h2>{{ prikkrTitle }}</h2>
    <p>{{ prikkrDesc }}</p>
    <section>
      <h3>Automatische Aanbeveling</h3>
      <p class="recomm" v-if="answers.length > 0">
        {{
          new Date(highestScoringDate).getDate() +
          " " +
          new Date(highestScoringDate).toLocaleString("default", {
            month: "long",
          }) +
          " " +
          new Date(highestScoringDate).getFullYear()
        }}
      </p>
      <p class="norecomm" v-else>
        Nadat u wat antwoorden binnen heeft zal u hier een automatisch berekende
        datum vinden die wij het best vinden passen.
      </p>
    </section>
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
                    new Date(ans.cantDate).getFullYear() ===
                  "NaN Invalid Date NaN"
                    ? "Geen antwoord"
                    : new Date(ans.cantDate).getDate() +
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
      selectedPrikkr: null,
      isLoading: false,
      isReloading: false,
      highestScoringDate: null,
      datesWithScores: [],
      filteredDatesWithScores: [],
      allFirstDates: [],
      allSecondDates: [],
      allThirdDates: [],
      allCantDates: [],
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
  watch: {
    answers() {
      this.fillArrays();
      this.calculateDates();
      this.filterDatesList();
      this.highestScore();
    },
  },
  methods: {
    fillArrays() {
      for (let answer in this.answers) {
        this.allFirstDates.push(this.answers[answer].firstDate);
        this.allSecondDates.push(this.answers[answer].secondDate);
        this.allThirdDates.push(this.answers[answer].thirdDate);
        this.allCantDates.push(this.answers[answer].cantDate);
      }
    },
    calculateDates() {
      this.calculateScore(this.allFirstDates, 3.15);
      this.calculateScore(this.allSecondDates, 2.25);
      this.calculateScore(this.allThirdDates, 1.2);
      this.calculateScore(this.allCantDates, -6);
    },
    calculateScore(allXDates, score) {
      const datesDone = [];
      for (let i in allXDates) {
        const occurence = this.getOccurrence(allXDates, allXDates[i]);
        const array = {
          date: allXDates[i],
          score: occurence * score,
        };

        if (
          this.getOccurrence(datesDone, allXDates[i]) < 1 &&
          allXDates[i] != null
        ) {
          this.datesWithScores.push(array);
        }
        datesDone.push(allXDates[i]);
      }
    },
    filterDatesList() {
      const array = [];
      let loc = 0;
      for (let i in this.datesWithScores) {
        if (this.getOccurrence(array, this.datesWithScores[i].date) > 0) {
          for (let j in this.filteredDatesWithScores) {
            if (
              this.filteredDatesWithScores[j].date ===
              this.datesWithScores[i].date
            ) {
              loc = j;
            }
          }
          this.filteredDatesWithScores[loc].score =
            this.filteredDatesWithScores[loc].score +
            this.datesWithScores[i].score;
        } else {
          this.filteredDatesWithScores.push(this.datesWithScores[i]);
          const date = this.datesWithScores[i].date;
          array.push(date);
        }
      }
    },
    highestScore() {
      let array = [];
      for (let i in this.filteredDatesWithScores) {
        array.push(this.filteredDatesWithScores[i].score);
      }
      const max = Math.max(...array);
      for (let j in this.filteredDatesWithScores) {
        if (this.filteredDatesWithScores[j].score === max) {
          this.highestScoringDate = this.filteredDatesWithScores[j].date;
        }
      }
    },
    getOccurrence(array, value) {
      return array.filter((v) => v === value).length;
    },
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
      this.allFirstDates = [];
      this.allSecondDates = [];
      this.allThirdDates = [];
      this.allCantDates = [];
      this.datesWithScores = [];
      this.filteredDatesWithScores = [];
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
.how {
  color: grey;
  font-size: 80%;
  margin-left: 1rem;
}
.how:hover {
  text-decoration: underline;
  cursor: pointer;
}
.recomm {
  padding: 1rem;
  background-color: rgb(46, 46, 46);
  border-radius: 8px;
}
.norecomm {
  color: grey;
  font-size: 90%;
}
.noanswers {
  margin-top: 0.7rem;
  color: grey;
}
.firstdate {
  color: rgb(82, 163, 82);
}
.seconddate {
  color: rgb(226, 226, 226);
}
.thirddate {
  color: rgb(226, 226, 226);
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
  color: rgb(255, 255, 255);
  margin-top: 3rem;
  font-size: 150%;
  font-weight: normal;
}

section {
  margin-top: 3rem;
}
</style>