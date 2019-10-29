<template>
  <v-dialog
    v-model="dialog"
    max-width="80%"
    transition="slide-y-transition"
  >
    <template #activator="{ on }">
      <v-btn
        depressed
        color="green darken-1"
        v-on="on"
      >
        <span class="mr-2">
          Create instance
        </span>
        <v-icon right>
          fas fa-plus-square
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="elevation-2 pt-3">
        Add Sakai instance
      </v-card-title>
      <v-card-text class="pt-5 pb-1">
        <v-form ref="form">
          <v-row no-gutters>
            <v-col col="12">

              <v-text-field
                outlined
                label="Name"
                :rules="[
                v => !!v || 'This is a required field'
              ]"
                v-model="newInstance.name"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                outlined
                label="Path"
                readonly
                placeholder="C:\sakai-source\"
                :value="newInstance.path"
                :rules="[
                v => !!v || 'This is a required field'
              ]"
                append-icon="fas fa-folder mr-2"
                @click:append.stop="selectPath"
                @mouseup.stop="selectPath"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="mx-4">
        <v-spacer />
        <v-btn
          @click="createInstance"
          depressed
          dark
          color="green darken-1"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { SakaiInstance } from "@/models/SakaiInstance";
import path from "path";

const { dialog } = require("electron").remote;

@Component({})
export default class CreateInstance extends Vue {
  dialog: boolean = false;

  newInstance: SakaiInstance = {
    id: "",
    name: "",
    path: ""
  };

  selectPath() {
    let dialogPath = dialog.showOpenDialogSync({
      properties: ["openDirectory"]
    });
    if (dialogPath && dialogPath.length > 0) {
      this.newInstance.path = dialogPath[0];
    }
  }

  createInstance() {
    // @ts-ignore
    if (this.$refs.form.validate()) {
      this.newInstance.id = Date.now().toString();
      this.$store.commit("app/addsakaiInstance", { ...this.newInstance });
      this.$store.commit("app/findTools", this.newInstance.id);
      this.$store.commit("app/setSelectedInstanceById", this.newInstance.id);
      this.dialog = false;
      this.resetData();
    }
  }
  resetData() {
    // @ts-ignore
    this.$refs.form.reset();
    this.newInstance = {
      id: "",
      name: "",
      path: ""
    };
  }
}
</script>

<style>
</style>