import { Module } from "vuex";
import { MavenGoal } from "@/models/MavenGoal";
import { SakaiToolDeployment } from "@/models/SakaiToolDeployment";

const DeploymentsStoreModule: Module<any, any> = {
  namespaced: true,
  state: {
    deployments: Array<SakaiToolDeployment>(),
    goals: Array<MavenGoal>()
  },
  actions: {
    test(a,b,c,d){
      console.log('can you fucking work pls?');
      console.log({a,b,c,d});
    }
  },
  mutations: {
    addDeployment(state, deployment: SakaiToolDeployment) {
      state.deployments.push(deployment);
    },
    testt(a,b,c,d){
      console.log('aasdasd');
      console.log({a,b,c,d});
      console.log(this);
      
    }
  },
};

export default DeploymentsStoreModule;
