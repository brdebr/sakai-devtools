import { SakaiInstance } from "@/models/SakaiInstance";
import ToolManager from "@/functions/ToolManager";
import IpcManager from '@/functions/IpcManager';
import { VuexModule, Module, Mutation } from "vuex-module-decorators";
import { ipcRenderer } from 'electron'

@Module({ namespaced: true, name: "app" })
export default class AppStoreModule extends VuexModule {
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
    IpcManager.persistInstances(this.sakaiInstances)
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

    IpcManager.persistInstances(this.sakaiInstances)
  }

  @Mutation
  setPath(payload: { id: string; path: string }) {
    let index = this.sakaiInstances.findIndex(el => el.id === payload.id);
    let instance = this.sakaiInstances[index];
    instance.path = payload.path;

    IpcManager.persistInstances(this.sakaiInstances)
  }

  baseURL: String = "http://localhost:8080"

}
