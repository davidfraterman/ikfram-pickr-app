<template>
  <header>
    <nav>
      <h1 v-if="isLoggedIn">
        <router-link to="/dashboard">
          <h1 class="logo">Prikkr</h1>
        </router-link>
      </h1>
      <h1 v-else>
        <router-link to="/">Prikkr</router-link>
      </h1>
      <ul>
        <li v-if="!isLoggedIn">
          <router-link to="/registreren">Log in</router-link>
        </li>
      </ul>
      <ul v-if="isLoggedIn">
        <li>
          <router-link to="/dashboard">Mijn Dashboard</router-link>
        </li>
        <li>
          <base-button link class="logout" @click="logout"
            >Uitloggen</base-button
          >
        </li>
        <li>
          <router-link to="/nieuw">
            <button class="newPrikkr">+ Nieuwe Prikkr</button></router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/registreren");
    },
  },
};
</script>

<style scoped>
.logo {
  color: #24b4d3;
}
header {
  width: 100%;
  height: 5rem;
  background-color: #202020;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
}

button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #24b4d3;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  display: inline-block;
}

.logout {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: transparent;
  border: none;
  color: #24b4d3;
  cursor: pointer;
  border-radius: 8px;
  display: inline-block;
}

header a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.75rem 1.5rem;
}

a:hover {
  text-decoration: underline;
}

h1 a:hover {
  text-decoration: none;
}

a:active,
a.router-link-active {
  color: #24b4d3;
}

h1 a:active,
h1 a.router-link-active {
  color: #24b4d3;
  text-decoration: none;
}

h1 {
  margin: 0;
  font-size: 130%;
}

h1 a {
  color: #24b4d3;
  margin: 0;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

@media only screen and (max-width: 690px) {
  header nav {
    width: 90%;
    margin: auto;
    display: block;
  }

  header {
    width: 100%;
    height: auto;
    background-color: #363636;
    display: block;
    padding-bottom: 2rem;
  }

  header h1 {
    text-align: center;
  }

  header ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: block;
  }

  header ul li {
    text-align: center;
  }
}
</style>