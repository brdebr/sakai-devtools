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
          Get Server Property
        </span>
        <v-icon size="14" right>
          fas fa-cog
        </v-icon>
      </v-btn>
    </template>
    <v-card dark :loading="loading">
      <v-card-title
        class="elevation-2 indigo darken-4 py-3"
        @click="getPropoertiesFromFile"
      >
        <span> Get Server Property </span>
        <v-spacer />
      </v-card-title>
      <v-card-text class="pt-5 pb-1">
        <v-row no-gutters>
          <v-col no-gutters>
            <v-combobox
              outlined
              label="Property name"
              hide-no-data
              clearable
              v-model="propName"
              :items="propertiesList"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col no-gutters v-if="propValue.toString().length < 100">
            <v-text-field
              outlined
              disabled
              label="Property Value"
              placeholder="..."
              v-model="propValue"
            />
          </v-col>
          <v-col no-gutters v-else>
            <v-textarea
              outlined
              disabled
              label="Property Value"
              placeholder="..."
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
            Get
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
import path from "path";
var PropertiesReader = require("properties-reader");
const { clipboard } = require("electron");

@Component({})
export default class GetServerProperty extends Vue {
  dialog = false;
  loading = false;
  @Prop()
  sessionId!: String;

  search: String = "";

  propName: String = "";
  propValue: String = "";
  placeholder: String = "";

  propertiesList: Array<String> = [];

  async getServerProperty() {
    this.loading = true;
    try {
      this.propValue = await WebServiceManager.getServerProperty(
        { sessionid: this.sessionId },
        { propName: this.propName },
        this.$store.state.app.baseURL
      );
      await new Promise(resolve => setTimeout(resolve, 300));
      if (this.propValue === "") {
        this.placeholder = "- - - Blank value / Not found - - -";
      }
    } catch (error) {
      this.placeholder = "- - - Error - - -";
      console.warn("WebServiceManager.getServerProperty");
      console.log(error);
    }
    this.loading = false;
  }

  getPropoertiesFromFile() {
    var propertiesFile = path.join(
      // @ts-ignore
      window.process.env.CATALINA_BASE,
      "sakai/sakai.properties"
    );
    var properties = PropertiesReader(propertiesFile);
    this.propertiesList = Object.keys(properties.getAllProperties()).sort();
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
