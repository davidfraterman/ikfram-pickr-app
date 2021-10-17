export default {
  state() {
    return {
      displayName: null,
      userId: null,
      token: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.displayName = payload.displayName;
      state.token = payload.token;
      state.userId = payload.userId;
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  actions: {
    async login(context, payload) {
      // server auth response fetch
      const authResponse = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC28TddO0o_oN-vMjHsydfZqv5PtNs-ekw",
        {
          method: "POST",
          body: JSON.stringify({
            // displayName: payload.displayName,
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const authResponseData = await authResponse.json();

      //   error check
      if (!authResponse.ok) {
        const error = new Error(authResponseData.message);
        throw error;
      }

      // setUser mutatie
      context.commit("setUser", {
        token: authResponseData.idToken,
        userId: authResponseData.localId,
      });
    },
    async signup(context, payload) {
      // server auth response fetch
      const authResponse = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC28TddO0o_oN-vMjHsydfZqv5PtNs-ekw",
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const authResponseData = await authResponse.json();

      // error check
      if (!authResponse.ok) {
        const error = new Error(authResponseData.message);
        throw error;
      }
      // setUser mutatie
      context.commit("setUser", {
        token: authResponseData.idToken,
        userId: authResponseData.localId,
      });
    },
    logout(context) {
      // setUser mutatie
      context.commit("setUser", {
        token: null,
        userId: null,
      });
    },
  },
};
