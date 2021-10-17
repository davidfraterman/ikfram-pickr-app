export default {
  namespaced: true,
  state() {
    return {
      prikkrs: [],
      linkPrikkr: {},
    };
  },
  mutations: {
    setPrikkrs(state, payload) {
      state.prikkrs = payload;
    },
    addPrikkr(state, payload) {
      state.prikkrs = payload;
    },
    setLinkPrikkr(state, payload) {
      state.linkPrikkr = payload;
    },
  },
  getters: {
    prikkrs(state) {
      return state.prikkrs;
    },
    hasPrikkrs(getters) {
      return getters.prikkrs && getters.prikkrs.length > 0;
    },
    linkPrikkr(state) {
      return state.linkPrikkr;
    },
  },
  actions: {
    async sendPrikkrResponse(_, payload) {
      const newAnswer = {
        name: payload.name,
        firstDate: payload.firstDate,
        secondDate: payload.secondDate,
        thirdDate: payload.thirdDate,
        cantDate: payload.cantDate,
      };

      const response = await fetch(
        `https://ikfram-prikkr-webapp-default-rtdb.europe-west1.firebasedatabase.app/answers/${payload.creatorId}/${payload.prikkrId}.json`,
        {
          method: "POST",
          body: JSON.stringify(newAnswer),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }
    },
    async fetchOnePrikkr(context, payload) {
      const creatorId = payload.creatorId;
      const prikkrId = payload.prikkrId;

      const response = await fetch(
        `https://ikfram-prikkr-webapp-default-rtdb.europe-west1.firebasedatabase.app/prikkrs/${creatorId}/${prikkrId}.json`
      );

      const responseData = await response.json();

      const prikkr = {
        linkId: `/${creatorId}/${prikkrId}`,
        title: responseData.title,
        description: responseData.description,
        dateStart: responseData.dateStart,
        dateEnd: responseData.dateEnd,
      };

      context.commit("setLinkPrikkr", prikkr);
    },
    async fetchPrikkrs(context) {
      const creatorId = context.rootGetters.userId;
      const token = context.rootGetters.token;

      const response = await fetch(
        `https://ikfram-prikkr-webapp-default-rtdb.europe-west1.firebasedatabase.app/prikkrs/${creatorId}.json?auth=` +
          token
      );

      const responseData = await response.json();

      const prikkrs = [];

      for (const key in responseData) {
        const prikkr = {
          id: key,
          creatorId: creatorId,
          title: responseData[key].title,
          description: responseData[key].description,
          dateStart: responseData[key].dateStart,
          dateEnd: responseData[key].dateEnd,
        };
        prikkrs.push(prikkr);
      }
      context.commit("setPrikkrs", prikkrs);
    },
    async newPrikkr(context, payload) {
      const newPrikkr = {
        title: payload.title,
        description: payload.description,
        dateStart: payload.dateStart,
        dateEnd: payload.dateEnd,
      };

      const token = context.rootGetters.token;

      const response = await fetch(
        `https://ikfram-prikkr-webapp-default-rtdb.europe-west1.firebasedatabase.app/prikkrs/${payload.creatorId}.json?auth=` +
          token,
        {
          method: "POST",
          body: JSON.stringify(newPrikkr),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }

      newPrikkr.id = responseData.name;
      newPrikkr.creatorId = payload.creatorId;
      context.commit("addPrikkr", newPrikkr);
    },
  },
};
