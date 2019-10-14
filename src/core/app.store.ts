import Vue from "vue";
import Vuex from "vuex";
import { SakaiInstance } from "../models/SakaiInstance";
import ToolManager from "../functions/ToolManager";
import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";

Vue.use(Vuex);
@Module({ namespaced: true, name: "app" })
export default class AppStoreModule extends VuexModule {
  layout: LayoutState = {
    drawer: true,
    drawerMini: false
  };
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
      id: "0",
      name: "Master",
      path: "C:\\Sakai\\sources\\master",
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
        "citations",
        "cloud-content",
        "cmprovider",
        "common",
        "config",
        "content"
      ]
    }
  ];

  selectedInstanceIndex: number = 0;

  get selectedInstance(): SakaiInstance {
    return this.sakaiInstances[this.selectedInstanceIndex];
  }

  @Mutation
  setSelectedInstanceIndex(index: number) {
    this.selectedInstanceIndex = index;
  }

  @Mutation
  setSelectedInstanceById(id: string) {
    this.selectedInstanceIndex = this.sakaiInstances.findIndex(
      el => el.id === id
    );
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
  findTools(id: string) {
    let index = this.sakaiInstances.findIndex(el => el.id === id);
    let instance = this.sakaiInstances[index];
    instance.tools = ToolManager.getToolNames(instance.path).filter(
      el => el !== "library"
    );
  }

  @Mutation
  setPath(payload: { id: string; path: string }) {
    let index = this.sakaiInstances.findIndex(el => el.id === payload.id);
    let instance = this.sakaiInstances[index];
    instance.path = payload.path;
  }

}

// Interfaces
interface LayoutState {
  drawer: boolean;
  drawerMini: boolean;
}
