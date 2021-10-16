<template>
  <section class="container">
    <h1>Nieuwe Prikkr</h1>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="title">Titel</label>
        <input
          type="text"
          id="title"
          placeholder="B.v. Vergaderen"
          v-model.trim="title"
        />
      </div>
      <div class="form-control">
        <label for="description">Beschrijving</label>
        <textarea
          rows="4"
          id="description"
          placeholder="Geef uw Prikkr een duidelijke beschrijving"
          v-model.trim="description"
        ></textarea>
      </div>
      <div class="form-control">
        <label for="dateStart">Vanaf</label>
        <input
          type="date"
          :min="min"
          :max="dateEnd"
          id="dateStart"
          v-model.trim="dateStart"
        />
        <label for="dateEnd">Tot</label>
        <input
          type="date"
          :min="dateStart || today"
          id="dateEnd"
          v-model.trim="dateEnd"
        />
      </div>
      <p class="errors" v-if="!formIsValid">
        Een of meerdere verplichte velden zijn leeg.
      </p>
      <div class="actions">
        <base-button class="btn">Maak aan</base-button>
      </div>
    </form>
  </section>
</template>

<script>
import store from "../../store/index.js";

export default {
  data() {
    return {
      title: "",
      description: "",
      dateStart: "",
      dateEnd: "",
      formIsValid: true,
    };
  },
  computed: {
    min() {
      return (
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate()
      );
    },
  },
  methods: {
    submitForm() {
      this.formIsValid = true;

      if (this.title === "" || this.dateStart === "" || this.dateEnd === "") {
        this.formIsValid = false;
        return;
      }

      this.$store.dispatch("prikkrs/newPrikkr", {
        title: this.title,
        description: this.description,
        creatorId: store.getters.userId,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
      });

      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.container {
  padding: 1rem;
  margin: 2rem auto;
  margin-top: 10vh;
  max-width: 25vw;
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
  width: 100%;
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
  margin-right: 3rem;
}

h1 {
  margin-bottom: 3rem;
}
.errors {
  color: rgb(255, 67, 67);
}

@media only screen and (max-width: 1400px) {
  .container {
    max-width: 50vw;
  }
}

@media only screen and (max-width: 900px) {
  .container {
    max-width: 70vw;
  }
}

@media only screen and (max-width: 700px) {
  .container {
    max-width: 90vw;
  }
}
</style>