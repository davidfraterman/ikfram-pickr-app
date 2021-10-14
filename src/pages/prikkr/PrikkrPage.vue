<template>
  <base-card>
    <h1>{{ prikkr.title }}</h1>
    <p>{{ prikkr.description }}</p>
    <p>Minimaal: {{ prikkr.dateStart }}</p>
    <p>Maximaal: {{ prikkr.dateEnd }}</p>
    <form @submit.prevent="send">
      <h3>Wel beschikbaar</h3>
      <div class="form-control">
        <label for="firstDate">Deze datum heeft mijn 1e voorkeur</label>
        <input
          type="date"
          :min="prikkr.dateStart"
          :max="prikkr.dateEnd"
          id="firstDate"
          v-model.trim="firstDate"
        />
      </div>
      <div class="form-control">
        <label for="secondDate">Deze datum heeft mijn 2e voorkeur</label>
        <input
          type="date"
          :min="prikkr.dateStart"
          :max="prikkr.dateEnd"
          id="secondDate"
          v-model.trim="secondDate"
        />
      </div>
      <div class="form-control">
        <label for="secondDate">Deze datum heeft mijn 3e voorkeur</label>
        <input
          type="date"
          :min="prikkr.dateStart"
          :max="prikkr.dateEnd"
          id="thirdDate"
          v-model.trim="thirdDate"
        />
      </div>

      <div class="form-control not">
        <h3>Niet beschikbaar</h3>
        <label for="secondDate">Deze datum komt mij het slechtst uit</label>
        <input
          type="date"
          :min="prikkr.dateStart"
          :max="prikkr.dateEnd"
          id="secondDate"
          v-model.trim="cantDate"
        />
      </div>

      <p class="errors" v-if="!formIsValid">
        Please enter a valid email and non-empty message.
      </p>
      <div class="actions">
        <base-button class="btn">Verzend</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,
      creatorId: this.$route.params.creatorId,
      prikkrId: this.$route.params.prikkrId,
      firstDate: "2021-10-17",
      secondDate: "2021-10-17",
      thirdDate: "2021-10-17",
      cantDate: "2021-10-17",
    };
  },
  created() {
    this.fetchPrikkr();
    console.log(this.prikkr);
  },
  computed: {
    prikkr() {
      return this.$store.getters["prikkrs/linkPrikkr"];
    },
  },
  methods: {
    async fetchPrikkr() {
      await this.$store.dispatch("prikkrs/fetchOnePrikkr", {
        creatorId: this.creatorId,
        prikkrId: this.prikkrId,
      });
    },
    async send() {
      this.formIsValid = true;
      if (
        this.firstDate === null ||
        this.secondDate === null ||
        this.thirdDate === null ||
        this.cantDate === null
      ) {
        this.formIsValid = false;
      } else {
        console.log("PRIKKRPAGE: sending response");
        await this.$store.dispatch("prikkrs/sendPrikkrResponse", {
          firstDate: this.firstDate,
          secondDate: this.secondDate,
          thirdDate: this.thirdDate,
          cantDate: this.cantDate,
        });
      }
    },
  },
};
</script>

<style scoped>
h3 {
  margin-bottom: 1rem;
}
.not {
  margin-top: 2rem;
}
form {
  margin-top: 3rem;
}
label {
  margin-bottom: 0.25rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 50%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  margin-bottom: 1rem;
  border-radius: 6px;
}

input:focus,
textarea:focus {
  border-color: #24b4d3;
  background-color: aliceblue;
  outline: none;
}

.btn {
  margin-top: 2rem;
  margin-right: 1rem;
}

.error {
  color: rgb(255, 67, 67);
}
</style>