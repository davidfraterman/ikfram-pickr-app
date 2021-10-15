import { createStore } from "vuex";

import authModule from "./auth/index.js";
import prikkrsModule from "./prikkrs/index.js";
import answersModule from './answers/index.js';

const store = createStore({
  modules: {
    auth: authModule,
    prikkrs: prikkrsModule,
    answers: answersModule,
  },
});

export default store;
