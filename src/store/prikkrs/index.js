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

      console.log("newanswer: " + newAnswer.firstDate);

      const response = await fetch(
        `https://ikfram-prikkr-webapp-default-rtdb.europe-west1.firebasedatabase.app/answers/${payload.creatorId}/${payload.prikkrId}.json`,
        {
          method: "POST",
          body: JSON.stringify(newAnswer),
        }
      );

      const responseData = await response.json();

      console.log("newanswer: " + JSON.stringify(newAnswer));
      console.log("newanswer: " + newAnswer);
      console.log("payload: " + payload.creatorId);

      if (!response.ok) {
        const error = new Error(responseData.message);
        console.log(error);
        throw error;
      }
    },
    async fetchOnePrikkr(context, payload) {
      const creatorId = payload.creatorId;
      const prikkrId = payload.prikkrId;
      // console.log(prikkrId + "/" + creatorId);

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

      console.log(prikkr);

      context.commit("setLinkPrikkr", prikkr);
    },
    async fetchPrikkrs(context) {
      const creatorId = context.rootGetters.userId;
      console.log("creatorid " + creatorId);
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
      console.log(prikkrs);
      context.commit("setPrikkrs", prikkrs);
    },
    async newPrikkr(context, payload) {
      const newPrikkr = {
        title: payload.title,
        description: payload.description,
        dateStart: payload.dateStart,
        dateEnd: payload.dateEnd,
      };

      console.log(newPrikkr);
      console.log("payload" + payload.creatorId);

      const token = context.rootGetters.token

      const response = await fetch(
        `https://ikfram-prikkr-webapp-default-rtdb.europe-west1.firebasedatabase.app/prikkrs/${payload.creatorId}.json?auth=` + token,
        {
          method: "POST",
          body: JSON.stringify(newPrikkr),
        }
      );

      const responseData = await response.json();
      console.log(JSON.stringify(newPrikkr));

      if (!response.ok) {
        const error = new Error(responseData.message);
        console.log("error");
        throw error;
      }

      newPrikkr.id = responseData.name;
      newPrikkr.creatorId = payload.creatorId;
      context.commit("addPrikkr", newPrikkr);
    },
  },
};
