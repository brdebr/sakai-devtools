import Vuex from "vuex";
import AppStoreModule from "./app.store";

const store = new Vuex.Store({
  modules: {
    app: AppStoreModule
  }
});

export default store;
