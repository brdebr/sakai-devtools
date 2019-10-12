<template>
  <v-layout justify-center>
    <v-flex
      xs11
      class="mb-auto"
    >
      <v-card
        dark
        class="blue darken-2"
      >
        <v-card-title class="elevation-2 blue darken-3 pt-3">
          <span class="ml-1" @click="tettt">
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
                @click:append="selectPath"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="6"
              class="pr-2"
            >
              <v-card
                flat
                outlined
                style="background-color: transparent"
                class="d-flex flex-column"
                max-height="400px"
              >
                <v-card-title class="py-2 subtitle-1">
                  Tools to compile
                </v-card-title>
                <v-divider />
                <v-card-text class="py-2">
                  <v-col
                    cols="12"
                    class="my-0 py-1"
                  >
                    <v-checkbox
                      hide-details
                      class="mt-0 py-0"
                      v-model="selectedTools"
                      value="library"
                    >
                      <template #label>
                        <span class="ml-2">
                          library
                        </span>
                      </template>
                    </v-checkbox>
                  </v-col>
                </v-card-text>
                <v-divider />
                <v-card-text style="overflow-y: scroll">
                  <v-col
                    cols="12"
                    class="my-0 py-1"
                    v-for="tool in selectedInstance.tools"
                    :key="tool"
                  >
                    <v-checkbox
                      hide-details
                      class="mt-0 py-0"
                      v-model="selectedTools"
                      :value="tool"
                    >
                      <template #label>
                        <span class="ml-2">
                          {{tool}}
                        </span>
                      </template>
                    </v-checkbox>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="6"
              class="pl-2"
            >
              <v-card
                flat
                outlined
                style="background-color: transparent"
              >
                <v-card-title class="py-2 subtitle-1">
                  Maven options
                </v-card-title>
                <v-divider />
                <v-card-text class="py-2">
                  <v-col
                    cols="12"
                    class="my-0 py-1 pa-0"
                  >
                    <span class="mr-2">
                      CATALINA_BASE:
                    </span>
                    <span class="font-italic">
                      <code>L:\DESARROLLO\Sakai\tomcat\master2</code>
                    </span>
                  </v-col>
                </v-card-text>
                <v-divider />
                <v-card-text class="py-2">
                  <v-row
                    no-gutters
                    align="center"
                  >
                    <v-col class="flex-grow-0 mr-auto my-1">
                      Goals:
                    </v-col>
                    <v-col
                      class="flex-grow-0 mx-3"
                      v-for="goal in mavenGoals"
                      :key="goal"
                    >
                      <v-checkbox
                        hide-details
                        class="mt-0 py-0"
                        v-model="selectedGoals"
                        :value="goal"
                      >
                        <template #label>
                          <span class="ml-n1">
                            {{ goal }}
                          </span>
                        </template>
                      </v-checkbox>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions class="overflow-hidden blue darken-3">
          <v-spacer />
          <v-btn
            depressed
            dark
            color="success"
          >
            <span>
              Deploy
            </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
const { dialog } = require('electron').remote
import Vue from "vue";
import Component from "vue-class-component";
import ToolManager from '../../../src/functions/ToolManager';
import { getModule } from 'vuex-module-decorators';
import AppStoreModule from '../app.store';
import { mapGetters } from "vuex";
import { SakaiInstance } from "../../../src/models/SakaiInstance";

@Component({
  computed: {
    ...mapGetters('app', {
      selectedInstance: 'selectedInstance'
    })
  }})
export default class InstanceDetails extends Vue {
  selectedInstance! : SakaiInstance

  selectedTools = [];
  selectedGoals = ["clean", "install", "deploy"];

  tettt(){
    getModule(AppStoreModule, this.$store)
    this.$store.dispatch('app/fetchMaven')
  }

  selectPath(){
    let dialogPath = dialog.showOpenDialogSync({
      properties: ['openDirectory']
    })
    if(dialogPath && dialogPath.length > 0){
      this.$store.commit('app/setPath', {
          id: this.selectedInstance.id,
          path: dialogPath[0]
      })
      this.$store.commit('app/findTools', this.selectedInstance.id)
    }

  }

  mavenGoals = ["clean", "install", "deploy"];
}
</script>

<style>
</style>