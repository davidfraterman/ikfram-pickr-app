<template>
  <base-card>
    <h1 v-if="this.mode === 'login'">Inloggen</h1>
    <h1 v-else>Registreren</h1>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-mail Adres</label>
        <input type="email" name="email" id="email" v-model="email" />
      </div>
      <div class="form-control">
        <label for="password">Wachtwoord</label>
        <input
          type="password"
          name="password"
          id="password"
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
      name: "",
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