<template>
  <header>
    <nav>
      <h1><router-link to="/">Prikkr</router-link></h1>
      <ul>
        <li v-if="isLoggedin">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>

        <li v-else><router-link>Inloggen</router-link></li>
        <li><router-link>Uitloggen</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return true;
    },
  },
  methods: {
    logout() {
      this.$router.replace("/registreren");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #363636;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
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

h1 {
  margin: 0;
}

h1 a {
  color: white;
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
</style>