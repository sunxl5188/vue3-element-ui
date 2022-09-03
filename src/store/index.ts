import { createStore } from "vuex";

export default createStore({
  state: {
    vuex_token: "",
    networkState: true,
  },
  getters: {},
  mutations: {
    setNetwork(state: any, boole: boolean) {
      state.networkState = boole;
    },
  },
  actions: {},
  modules: {},
});
