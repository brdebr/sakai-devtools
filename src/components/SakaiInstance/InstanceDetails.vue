<template>
  <v-layout justify-center>
    <v-flex
      xs12
      class="mb-auto"
    >
      <v-card
        dark
        class="blue darken-2"
      >
        <v-card-title class="elevation-2 blue darken-3 pt-3">
          <span class="ml-1">
            {{selectedInstance.name}}
          </span>
          <v-spacer />
          <span class="body-1">
            [ Sakai Instance ]
          </span>
        </v-card-title>
        <v-card-text class="pt-5">
          <v-row no-gutters>
            <v-col
              cols="12"
              class="mb-6 mt-2"
            >
              <v-text-field
                outlined
                hide-details
                label="Path"
                placeholder="C:\sakai-source\"
                :value="selectedInstance.path"
                append-icon="fas fa-folder mr-2"
                @click:append.stop="selectPath"
                @mouseup.stop="selectPath"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="6"
              class="pr-2"
            >
              <ToolSelector
                :tools="selectedInstance.tools"
                v-model="selectedTools"
              />
            </v-col>
            <v-col
              cols="6"
              class="pl-2"
            >
              <MavenOptions v-model="selectedGoals" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions class="overflow-hidden blue darken-3">
          <v-spacer />
          <DeployDialog
            :disabled="selectedTools.length === 0"
            :selected-goals="selectedGoals"
            :selected-tools="selectedTools"
          />
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

import Component from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import AppStoreModule from "../../core/app.store";

const { dialog } = require("electron").remote;

import ToolManager from "../../../src/functions/ToolManager";
import { SakaiInstance } from "../../../src/models/SakaiInstance";

// Components
import ToolSelector from "./ToolsSelector.vue";
import MavenOptions from "./MavenOptions.vue";
import DeployDialog from "./DeployDialog.vue";

import { MavenGoal } from "./MavenOptions.vue";

@Component({
  computed: {
    ...mapGetters("app", {
      selectedInstance: "selectedInstance"
    })
  },
  components: {
    ToolSelector,
    MavenOptions,
    DeployDialog
  }
})
export default class InstanceDetails extends Vue {
  selectedInstance!: SakaiInstance;

  selectedTools = [];
  selectedGoals: MavenGoal[] = ["clean", "install", "sakai:deploy"];

  selectPath() {
    let dialogPath = dialog.showOpenDialogSync({
      properties: ["openDirectory"]
    });
    if (dialogPath && dialogPath.length > 0) {
      this.$store.commit("app/setPath", {
        id: this.selectedInstance.id,
        path: dialogPath[0]
      });
      this.$store.commit("app/findTools", this.selectedInstance.id);
    }
  }
}
</script>

<style>
</style>