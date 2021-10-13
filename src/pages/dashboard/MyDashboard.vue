<template>
  <section>
    <base-card>
      <div>
        <h1>Mijn Prikkrs</h1>
        <base-button mode="primary" link to="/nieuw"
          >+ Nieuwe Prikkr</base-button
        >
      </div>

      <ul v-if="hasPrikkrs">
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
    </base-card>
  </section>
</template>

<script>
import DashboardItem from "../../components/dashboard/DashboardItem.vue";

export default {
  data() {
    return {
      hasPrikkrs: true,
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
  },
  methods: {
    log() {
      console.log(this.myPrikkrs);
    },
    async loadPrikkrs() {
      try {
        await this.$store.dispatch("prikkrs/fetchPrikkrs");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 300%;
}
</style>