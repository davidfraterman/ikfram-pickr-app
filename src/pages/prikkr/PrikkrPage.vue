<template>
  <base-card v-if="!formIsSent">
    <h1>{{ prikkr.title }}</h1>
    <p class="between">Tussen {{ prikkr.dateStart }} en {{ prikkr.dateEnd }}</p>
    <p class="details">Beschrijving</p>
    <p>{{ prikkr.description }}</p>

    <form @submit.prevent="send">
      <h3>Mijn Voorkeuren</h3>
      <div class="form-control">
        <label for="firstDate">1e voorkeur</label>
        <input
          type="date"
          :min="prikkr.dateStart"
          :max="prikkr.dateEnd"
          id="firstDate"
          v-model.trim="firstDate"
        />
      </div>
      <div class="form-control">
        <label for="secondDate">2e voorkeur (optioneel)</label>
        <input
          type="date"
          :min="prikkr.dateStart"
          :max="prikkr.dateEnd"
          id="secondDate"
          v-model.trim="secondDate"
        />
      </div>
      <div class="form-control">
        <label for="secondDate">3e voorkeur (optioneel)</label>
        <input
          type="date"
          :min="prikkr.dateStart"
          :max="prikkr.dateEnd"
          id="thirdDate"
          v-model.trim="thirdDate"
        />
      </div>

      <div class="form-control not">
        <h3>Niet Beschikbaar</h3>
        <label for="secondDate">Komt mij het slechtst uit</label>
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
  <base-card v-else>
    <h1>Uw antwoord is succesvol verzonden!</h1>
    <p>Maak vandaag ook een account!</p>
    <base-button link to="/registreren">Registreren</base-button>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,
      formIsSent: false,
      firstDate: this.firstDate,
      secondDate: this.secondDate,
      thirdDate: this.thirdDate,
      cantDate: this.cantDate,
    };
  },
  created() {
    this.fetchPrikkr();
    console.log(this.creatorId);
  },
  computed: {
    prikkr() {
      return this.$store.getters["prikkrs/linkPrikkr"];
    },
    creatorId() {
      return this.$route.params.creatorId;
    },
    prikkrId() {
      return this.$route.params.prikkrId;
    },
  },
  methods: {
    async fetchPrikkr() {
      await this.$store.dispatch("prikkrs/fetchOnePrikkr", {
        creatorId: this.creatorId,
        prikkrId: this.prikkrId,
      });
    },
    send() {
      this.formIsValid = true;
      if (this.firstDate === null || this.cantDate === null) {
        this.formIsValid = false;
      } else {
        console.log("firstdate: " + this.firstDate);

        this.$store.dispatch("prikkrs/sendPrikkrResponse", {
          firstDate: this.firstDate,
          secondDate: this.secondDate,
          thirdDate: this.thirdDate,
          cantDate: this.cantDate,
          creatorId: this.creatorId,
          prikkrId: this.prikkrId,
        });

        this.formIsSent = true;
      }
    },
  },
};
</script>

<style scoped>
.between {
  color: rgb(158, 158, 158);
  font-size: 90%;
  margin-bottom: 2rem;
}
.details {
  color: #24b4d3;
  font-size: 120%;
}
h3 {
  margin-bottom: 1rem;
  color: #24b4d3;
  font-weight: normal;
  font-size: 120%;
}
p {
  color: white;
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
  color: rgb(255, 255, 255);
}

input,
textarea {
  display: block;
  width: 50%;
  font: inherit;
  border: 2px solid #24b4d3;
  background-color: rgb(61, 61, 61);
  color: white;
  padding: 0.15rem;
  margin-bottom: 1rem;
  border-radius: 6px;
}

input:focus,
textarea:focus {
  border-color: #24b4d3;
  background-color: rgb(75, 75, 75);
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