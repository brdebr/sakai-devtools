import Vuex from "vuex";
import AppStoreModule from "@/core/store/app";
import DeploymentsStoreModule from './store/deploy';

const store = new Vuex.Store({
  modules: {
    app: AppStoreModule,
    deploy: DeploymentsStoreModule
  }
});

export default store;
