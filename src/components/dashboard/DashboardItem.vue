<template>
  <base-card>
    <router-link :to="prikkrLink">
      <h3 class="title">{{ title }}</h3>
    </router-link>
    <p class="date">Vanaf: {{ dateStart }}</p>
    <p class="date">Tot: {{ dateEnd }}</p>

    <h4 class="descTitle">Beschrijving</h4>
    <p class="desc">{{ description }}</p>
    <base-button class="btn" mode="secondary" link :to="prikkrLink"
      >Bekijk Prikkr</base-button
    >
    <p class="id">
      <strong class="id--title"> Deel deze link met de uitgenodigden: </strong>
      <router-link name="a" :to="answerLink">{{ shareLink }}</router-link>
    </p>
  </base-card>
</template>

<script>
export default {
  props: ["title", "id", "description", "dateStart", "dateEnd"],

  computed: {
    prikkrLink() {
      return this.$route.path + "/" + this.id;
    },
    answerLink() {
      return "/prikkr/" + this.userId + "/" + this.id;
    },
    shareLink() {
      return 'prikkr.netlify.app' + this.answerLink;
    },
    userId() {
      return this.$store.getters["userId"];
    },
  },
  mounted() {
    console.log(this.answerLink);
  },
};
</script>

<style scoped>
.id--title {
  font-size: 160%;
}
.id {
  font-size: 85%;
  color: rgb(155, 155, 155);
  margin-top: 0.75rem;
}
.btn {
  margin-top: 1.5rem;
}
.title {
  font-size: 175%;
  color: rgb(77, 190, 221);
}
.descTitle {
  font-size: 125%;
  margin-top: 1.5rem;
  font-weight: normal;
}
.desc {
  font-size: 85%;
  color: rgb(206, 206, 206);
}
.date {
  font-size: 85%;
  color: rgb(206, 206, 206);
}
.card {
  color: white;
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(49, 49, 49, 0.144);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 50rem;
  background-color: rgb(61, 61, 61);
}

a {
  color: white;
  text-decoration: none;
}

h3:hover {
  text-decoration: underline;
}
</style>