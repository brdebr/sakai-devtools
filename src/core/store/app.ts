import { SakaiInstance } from "@/models/SakaiInstance";
import ToolManager from "@/functions/ToolManager";
import IpcManager from "@/functions/IpcManager";
import { VuexModule, Module, Mutation } from "vuex-module-decorators";

@Module({ namespaced: true, name: "app" })
export default class AppStoreModule extends VuexModule {
  sakaiInstances: Array<SakaiInstance> = new Array(0);

  selectedInstanceIndex: number = 0;

  get selectedInstance(): SakaiInstance | null {
    if (
      (this.sakaiInstances && this.sakaiInstances.length === 0) ||
      !this.sakaiInstances
    ) {
      return null;
    }
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
    IpcManager.addInstance(val);
  }

  @Mutation
  fetchInstances() {
    this.sakaiInstances = IpcManager.getInstances();
  }

  @Mutation
  findTools(id: string) {
    let index = this.sakaiInstances.findIndex(el => el.id === id);
    let instance = this.sakaiInstances[index];
    instance.tools = ToolManager.getToolNames(instance.path).filter(
      el => el !== "library"
    );

    IpcManager.persistInstanceProp(id, instance, "tools");
  }

  @Mutation
  setPath(payload: { id: string; path: string }) {
    let index = this.sakaiInstances.findIndex(el => el.id === payload.id);
    let instance = this.sakaiInstances[index];
    instance.path = payload.path;

    IpcManager.persistInstanceProp(payload.id, instance, "path");
  }

  @Mutation
  setBaseURL(val: String) {
    this.baseURL = val;
  }

  baseURL: String = "http://localhost:8080";
}
