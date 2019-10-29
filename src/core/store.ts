import Vuex from "vuex";
import AppStoreModule from "@/core/store/app";

const store = new Vuex.Store({
  modules: {
    app: AppStoreModule
  }
});

export default store;
