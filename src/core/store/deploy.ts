import { Module } from "vuex";
import { MavenGoal } from "@/models/MavenGoal";
import { SakaiToolDeployment } from "@/models/SakaiToolDeployment";
import Vue from "vue";

const DeploymentsStoreModule: Module<any, any> = {
  namespaced: true,
  state: {
    deployments: Array<SakaiToolDeployment>(),
    goals: Array<MavenGoal>()
  },
  mutations: {
    addDeployment(state, deployment: SakaiToolDeployment) {
      state.deployments.push(deployment);
    },
    testt(){
      console.log('aasdasd');
      
    }
  },
  // actions: {
  //   stuff(ctx,a){
  //     console.log({ctx,a});
  //   },
  //   async deployTool(context, index: number) {
  //     // context.commit("addToDo", todoModel);
  //     console.log(context);
      
  //     // await new Promise((resolve, reject) => {
  //     //   let cmdMavenOptions =
  //     //     "-Dmaven.tomcat.home=%CATALINA_BASE% -Djava.net.preferIPv4Stack=true -Dmaven.test.skip=true -Dsakai.cleanup=true";
  //     //   let cmdCommand = `mvn ${context.state.goals.join(" ")} ${cmdMavenOptions}`;
  //     //   context.
  //     //   let cwd =
  //     //     this.$store.getters["app/selectedInstance"].path +
  //     //     "\\" +
  //     //     this.states[index].name;

  //     //   this.states[index].log += "---------------------------" + "\n";
  //     //   this.states[index].log += "· EXECUTING MAVEN COMMAND  " + "\n";
  //     //   this.states[index].log += "---------------------------" + "\n";
  //     //   this.states[index].log += "$ " + cmdCommand + "\n";
  //     //   this.states[index].log += "---------------------------" + "\n";

  //     //   let mvnProcess = child_process.spawn("cmd.exe", ["/c", cmdCommand], {
  //     //     cwd
  //     //   });

  //     //   mvnProcess.stdout.on("data", (v: Buffer) => {
  //     //     this.states[index].log += v.toString();
  //     //   });

  //     //   mvnProcess.on("close", (code: number) => {
  //     //     if (code === 0) {
  //     //       resolve("success");
  //     //     } else {
  //     //       resolve("error");
  //     //     }
  //     //   });
  //     //   mvnProcess.on("error", (code: number) => {
  //     //     console.log(":C");
  //     //     console.log({ code });
  //     //     reject({ code });
  //     //   });
  //     // });
  //   }
  // }
};

export default DeploymentsStoreModule;
