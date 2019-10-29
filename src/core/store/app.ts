import Vue from "vue";
import Vuex from "vuex";
import { SakaiInstance } from "@/models/SakaiInstance";
import ToolManager from "@/functions/ToolManager";
import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import { ipcRenderer } from 'electron'

function saveInstances(instances: SakaiInstance[]){
  ipcRenderer.sendSync('setConfig', {
    key: 'instances',
    value: instances
  });
}

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

  sakaiInstances: SakaiInstance[] = [];

  selectedInstanceIndex: number = 0;

  get selectedInstance(): SakaiInstance | null {
    return this.sakaiInstances[this.selectedInstanceIndex] || null;
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
  addsakaiInstance(val: SakaiInstance) {
    this.sakaiInstances.push(val);
    saveInstances(this.sakaiInstances)
  }

  @Mutation
  fetchInstances(){
    this.sakaiInstances = ipcRenderer.sendSync('getConfig','instances');
  }

  @Mutation
  findTools(id: string) {
    let index = this.sakaiInstances.findIndex(el => el.id === id);
    let instance = this.sakaiInstances[index];
    instance.tools = ToolManager.getToolNames(instance.path).filter(
      el => el !== "library"
    );

    saveInstances(this.sakaiInstances)
  }

  @Mutation
  setPath(payload: { id: string; path: string }) {
    let index = this.sakaiInstances.findIndex(el => el.id === payload.id);
    let instance = this.sakaiInstances[index];
    instance.path = payload.path;

    saveInstances(this.sakaiInstances)
  }

}

// Interfaces
interface LayoutState {
  drawer: boolean;
  drawerMini: boolean;
}
