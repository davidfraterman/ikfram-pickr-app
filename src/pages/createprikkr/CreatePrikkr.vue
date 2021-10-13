<template>
  <base-card>
    <h1>Nieuwe Prikkr Maken</h1>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="title">Titel</label>
        <input type="text" id="title" v-model.trim="title" />
      </div>
      <div class="form-control">
        <label for="description">Beschrijving</label>
        <textarea
          rows="4"
          id="description"
          v-model.trim="description"
        ></textarea>
      </div>
      <div class="form-control">
        <label for="dateStart">Vanaf</label>
        <input type="date" id="dateStart" v-model.trim="dateStart" />
        <label for="dateEnd">Tot</label>
        <input type="date" id="dateEnd" v-model.trim="dateEnd" />
      </div>
      <p class="errors" v-if="!formIsValid">
        Please enter a valid email and non-empty message.
      </p>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
  </base-card>
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
  computed: {},
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

      this.$router.replace("/dashboard");
    },
  },
};
</script>

<style scoped>
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

h1 {
  margin-bottom: 3rem;
  color: #24b4d3;
}
.error {
  color: rgb(255, 67, 67);
}

@media only screen and (max-width: 700px) {
  input,
  textarea {
    width: 80%;
  }
}
</style>