import Vuex from "vuex";
import AppStoreModule from "@/core/store/app";
import DeploymentsStoreModule from '@/core/store/deploy';
import LayoutStoreModule from '@/core/store/layout';
import Vue from 'vue';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    layout: LayoutStoreModule,
    app: AppStoreModule,
    deploy: DeploymentsStoreModule
  }
});

export default store;
