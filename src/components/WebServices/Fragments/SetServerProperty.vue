<template>
  <v-dialog
    v-model="dialog"
    max-width="80%"
    overlay-color="rgb(138, 138, 138)"
    transition="slide-y-transition"
    scrollable
  >
    <template #activator="{ on }">
      <v-btn
        light
        color="grey lighten-5"
        class="font-weight-bold"
        depressed
        v-on="on"
      >
        <span class="mr-1">
          Set Server Property
        </span>
        <v-icon size="14" right>
          fas fa-pen-square
        </v-icon>
      </v-btn>
    </template>
    <v-card dark :loading="loading">
      <v-card-title class="elevation-2 indigo darken-4 py-3">
        <span> Set Server Property </span>
        <v-spacer />
      </v-card-title>
      <v-card-text class="pt-5 pb-1">
        <v-row no-gutters>
          <v-col no-gutters>
            <v-text-field
              outlined
              label="Property name"
              search-input.sync="propName"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col no-gutters>
            <v-text-field
              outlined
              disabled
              label="Property Value"
              v-model="propValue"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="mx-4">
        <v-spacer />
        <v-btn :loading="loading" depressed light @click="getServerProperty">
          <span class="subtitle-2">
            Set
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import WebServiceManager from "@/functions/WsManager";
import { userResponse } from "@/models/WsInterfaces";
const { clipboard } = require("electron");

@Component({})
export default class SetServerProperty extends Vue {
  dialog = false;
  loading = false;
  @Prop()
  sessionId!: String;

  search: String = "";

  propName: String = "";
  propValue: String = "";
  placeholder: String = "";

  async getServerProperty() {
    this.loading = true;
    try {
      this.propValue = await WebServiceManager.getServerProperty(
        { sessionid: this.sessionId },
        { propName: this.propName },
        this.$store.state.app.baseURL
      );
      await new Promise(resolve => setTimeout(resolve, 300));
      if (result === "success") {
        this.dialog = false;
      }
    } catch (error) {
      this.propValue = "- - - Error - - -";
      console.warn("WebServiceManager.setServerProperty");
      console.log(error);
    }
    this.loading = false;
  }

  copyToClipbd(val: string) {
    clipboard.writeText(val);
  }

  reset() {
    this.loading = false;
    this.dialog = false;
  }
}
</script>
