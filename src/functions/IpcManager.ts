import { SakaiInstance } from "@/models/SakaiInstance";
import { ipcRenderer } from "electron";
import Store from 'electron-store';

export default class IpcManager {
  static persistInstances(instances: SakaiInstance[]) {
    ipcRenderer.sendSync("setConfig", {
      key: "instances",
      value: instances
    });
  }
  static getConfigHandler = (configs: Store) => (event: Electron.IpcMainEvent, key: string) => {
    switch (key) {
      case 'instances':
        event.returnValue = configs.get(key, []);
        break;
      default:
        event.returnValue = configs.get(key);
        break;
    }
  }
  static setConfigHandler = (configs: Store) => (event: Electron.IpcMainEvent, payload: {key: string, value: any}) => {
    configs.set(payload.key , payload.value)
    event.returnValue = 'Set ok'
  }
}
