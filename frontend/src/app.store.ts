import Vue from "vue";
import Vuex from "vuex";
import { SakaiInstance } from '../../src/models/SakaiInstance';
import ToolManager from '../../src/functions/ToolManager';
const child_process = require('child_process');
import {
    VuexModule,
    Module,
    Action,
    Mutation
  } from "vuex-module-decorators";

Vue.use(Vuex);
@Module({namespaced: true, name: 'app'})
export default class AppStoreModule extends VuexModule {

  layout: LayoutState = {
    drawer: true,
    drawerMini: true
  }
  @Mutation
  toggleDrawer() {
    this.layout.drawer = !this.layout.drawer;
  }
  @Mutation
  toggleDrawerMini() {
    this.layout.drawerMini = !this.layout.drawerMini;
  }

  @Mutation
  setDrawer(val: boolean) {
    this.layout.drawer = val;
  }

  sakaiInstances: SakaiInstance[] = [
    {
      id: "1",
      name: "Master",
      path: "L:\\DESARROLLO\\Sakai\\source\\master",
      tools: [
        "access",
        "alias",
        "announcement",
        "archive",
        "assignment",
        "authz",
        "basiclti",
        "calendar",
        "chat",
      ]
    },
    {
      id: "2",
      name: "The second one",
      path: "D:\\victoryyy"
    },
    {
      id: "3",
      name: "The third one",
      path: "A:\\floppy disk"
    }
  ]

  selectedInstanceIndex: number = 0

  get selectedInstance(): SakaiInstance{
    return this.sakaiInstances[this.selectedInstanceIndex]
  }

  @Mutation
  setSelectedInstanceIndex(index: number){
    this.selectedInstanceIndex = index
  }

  @Mutation
  setsakaiInstances(val: SakaiInstance[]) {
    this.sakaiInstances = val;
  }

  @Mutation
  addsakaiInstance(val: SakaiInstance) {
    this.sakaiInstances.push(val);
  }

  @Mutation
  findTools(id: string){
    let index = this.sakaiInstances.findIndex(el => el.id === id)
    let instance = this.sakaiInstances[index]
    instance.tools = ToolManager.getToolNames(instance.path).filter(el => el !== 'library')
  }

  @Mutation
  setPath(payload: {id: string, path: string}){
    let index = this.sakaiInstances.findIndex(el => el.id === payload.id)
    let instance = this.sakaiInstances[index]
    instance.path = payload.path
  }

  // @Mutation
  // setShit(data: string){
  //   this.shit += data;
  // }

  // @Action
  // async fetchMaven(){
  //   console.log('Maven');
  //   let mvnProcess = child_process.spawn("cmd.exe", ["/c", "mvn --version"]);
  //   // mvnProcess.stdout.on('data', this.setShit);
  // }
}

// Interfaces
interface LayoutState {
  drawer: boolean,
  drawerMini: boolean,
}

