<template>
  <base-card>
    <h1 v-if="this.mode === 'login'">Inloggen</h1>
    <h1 v-else>Registreren</h1>
    <form @submit.prevent="submitForm">
      <div class="form-control" v-if="this.mode === 'signup'">
        <label for="displayName">Naam</label>
        <input
          type="text"
          name="displayName"
          id="displayName"
          autocomplete="on"
          v-model="displayName"
        />
      </div>
      <div class="form-control">
        <label for="email">E-mail Adres</label>
        <input
          type="email"
          name="email"
          id="email"
          autocomplete="on"
          v-model="email"
        />
      </div>
      <div class="form-control">
        <label for="password">Wachtwoord</label>
        <input
          type="password"
          name="password"
          id="password"
          autocomplete="on"
          v-model="password"
        />
      </div>
      <p class="error" v-if="!formIsValid">
        Voer alstublieft een geldig email-adres en wachtwoord in
      </p>
      <base-button class="btn">{{ submitButtonCaption }}</base-button>
      <base-button
        type="button"
        class="btn"
        mode="secondary"
        @click="switchAuthMode"
        >{{ switchLoginOrSignup }}</base-button
      >
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      displayName: "",
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "signup") {
        return "Registreer";
      } else {
        return "Log in";
      }
    },
    switchLoginOrSignup() {
      if (this.mode === "login") {
        return "Registreren?";
      } else {
        return "Inloggen?";
      }
    },
  },
  methods: {
    async submitForm() {
      console.log("submitten");
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
      } else {
        try {
          if (this.mode === "login") {
            await this.$store.dispatch("login", {
              email: this.email,
              password: this.password,
            });
          } else {
            await this.$store.dispatch("signup", {
              displayName: this.displayName,
              email: this.email,
              password: this.password,
            });
          }
        } catch (err) {
          console.log(err);
        }

        const url = "/dashboard";
        this.$router.replace(url);
        console.log("router");
      }
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
      console.log(this.mode);
    },
  },
};
</script>

<style scoped>
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

h1 {
  margin-bottom: 3rem;
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