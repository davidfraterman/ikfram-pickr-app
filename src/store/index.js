import { createStore } from "vuex";

import authModule from "./auth/index.js";
import prikkrsModule from "./prikkrs/index.js";

const store = createStore({
  modules: {
    auth: authModule,
    prikkrs: prikkrsModule,
  },
});

export default store;
