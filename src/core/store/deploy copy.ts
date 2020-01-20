import { MavenGoal } from '@/models/MavenGoal';
import { SakaiToolDeployment } from '@/models/SakaiToolDeployment';
import AppStoreModule from '@/core/store/app';
import Vue from "vue";
import Vuex from "vuex";
import { Module, Mutation, VuexModule } from "vuex-module-decorators";

Vue.use(Vuex);
@Module({ namespaced: true, name: "deploy" })
export default class DeploymentsStoreModule extends VuexModule {
  goals!: MavenGoal[]

  deployments: SakaiToolDeployment [] = []

  @Mutation
  stuff(){
    console.log(AppStoreModule);
  }

  // HACERLO SIN LAS MIERDAS ESTAS DE DECORADORES Y YA JODER

  // @Mutation
  // deployTool(index: number): "success" | "error" {
  //   return await new Promise((resolve, reject) => {
  //     let cmdMavenOptions =
  //       "-Dmaven.tomcat.home=%CATALINA_BASE% -Djava.net.preferIPv4Stack=true -Dmaven.test.skip=true -Dsakai.cleanup=true";
  //     let cmdCommand = `mvn ${this.goals.join(" ")} ${cmdMavenOptions}`;
  //     let cwd =
  //       this.$store.getters["app/selectedInstance"].path +
  //       "\\" +
  //       this.states[index].name;
  
  //     this.states[index].log += "---------------------------" + "\n";
  //     this.states[index].log += "· EXECUTING MAVEN COMMAND  " + "\n";
  //     this.states[index].log += "---------------------------" + "\n";
  //     this.states[index].log += "$ " + cmdCommand + "\n";
  //     this.states[index].log += "---------------------------" + "\n";
  
  //     let mvnProcess = child_process.spawn("cmd.exe", ["/c", cmdCommand], {
  //       cwd
  //     });
  
  //     mvnProcess.stdout.on("data", (v: Buffer) => {
  //       this.states[index].log += v.toString();
  //     });
  
  //     mvnProcess.on("close", (code: number) => {
  //       if (code === 0) {
  //         resolve("success");
  //       } else {
  //         resolve("error");
  //       }
  //     });
  //     mvnProcess.on("error", (code: number) => {
  //       console.log(":C");
  //       console.log({ code });
  //       reject({ code });
  //     });
  //   });
  }



// }


// async loopDeploying() {
//   for (let i = 0; i < this.states.length; i++) {
//     this.states[i].state = "deploying";
//     let stateVal = await this.deployTool(i);
//     this.states[i].state = stateVal;
//     current_window.setProgressBar(this.percentage / 100, { mode: "paused" });
//   }
//   this.toolsPanel = -1;
//   if (
//     this.states.filter(el => el.state === "error" || el.state === "warning")
//       .length > 0
//   ) {
//     current_window.setProgressBar(1, { mode: "error" });
//   } else {
//     current_window.setProgressBar(1);
//   }
// }



// resetDeployState() {
//   this.states = this.states.map(el => {
//     el.state = "initial";
//     el.log = "";
//     return el;
//   });
//   current_window.setProgressBar(-1);
// }