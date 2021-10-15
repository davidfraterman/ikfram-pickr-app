<template>
  <section>
    <base-card>
      <div>
        <h1>Mijn Prikkrs</h1>

        <base-button mode="primary" link to="/nieuw"
          >+ Nieuwe Prikkr</base-button
        >
      </div>

      <ul v-if="hasPrikkrs && !isLoading">
        <dashboard-item
          v-for="item in myPrikkrs"
          :key="item.id"
          :title="item.title"
          :id="item.id"
          :dateStart="item.dateStart"
          :dateEnd="item.dateEnd"
          :description="item.description"
        ></dashboard-item>
      </ul>
      <div class="noPrikkrs" v-else-if="!hasPrikkers && !isLoading">
        <h4>
          U heeft nog geen Prikkrs, klik op bovenstaande knop om er een toe te
          voegen.
        </h4>

        <br /><br />
        Heeft u wel Prikkrs? Probeer dan te
        <base-button class="reloadbtn" mode="secondary" @click="loadPrikkrs"
          >Herladen</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner class="spinner"></base-spinner>
      </div>
    </base-card>
  </section>
</template>

<script>
import DashboardItem from "../../components/dashboard/DashboardItem.vue";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.loadPrikkrs();
  },

  components: {
    DashboardItem,
  },
  computed: {
    myPrikkrs() {
      return this.$store.getters["prikkrs/prikkrs"];
    },
    hasPrikkrs() {
      return !this.isLoading && this.$store.getters["prikkrs/hasPrikkrs"];
    },
  },
  methods: {
    async loadPrikkrs() {
      console.log(this.hasPrikkrs);
      this.isLoading = true;

      try {
        await this.$store.dispatch("prikkrs/fetchPrikkrs");
      } catch (err) {
        console.log(err);
      }

      this.isLoading = false;
      console.log(this.hasPrikkrs);
    },
  },
};
</script>

<style scoped>
.spinner {
  margin-top: 6rem;
}
.reloadbtn {
  padding: 0.4rem;
  font-size: 90%;
}
h1 {
  margin-bottom: 3rem;
}
.noPrikkrs {
  margin-top: 3rem;
  color: white;
}
</style>