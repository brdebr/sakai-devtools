import { SakaiInstance } from "@/models/SakaiInstance";
import { ipcRenderer } from "electron";

export default class IpcManager {
  static persistInstances(instances: SakaiInstance[]) {
    ipcRenderer.sendSync("setConfig", {
      key: "instances",
      value: instances
    });
  }
}
