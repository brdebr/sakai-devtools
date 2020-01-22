import { VuexModule, Module, Mutation } from "vuex-module-decorators";

// Interfaces
interface LayoutState {
  drawer: boolean;
  drawerMini: boolean;
}

@Module({ namespaced: true, name: "layout" })
export default class LayoutStoreModule extends VuexModule {
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
}

