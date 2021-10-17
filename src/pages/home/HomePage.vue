<template>
  <the-header></the-header>
  <div class="container">
    <h1>Groeps datum <span>Prikkr</span></h1>
    <p>
      Een handige en overzichtelijke datum prikker voor grotere groepen en
      teams.
    </p>
    <base-button class="btn" link to="/registreren">Start Nu</base-button>
  </div>
</template>

<style scoped>
.container {
  margin-top: 4rem;
  width: 80%;
  margin: 0 auto;
  display: grid;
}

h1 {
  margin-top: 10rem;
  text-align: center;
}

p {
  color: rgb(165, 165, 165);
  font-size: 110%;
  text-align: center;
  margin-bottom: 2rem;
}

span {
  color: rgb(11, 163, 190);
}

.btn {
  margin-top: 2rem;
  margin: 0 auto;
}
</style>