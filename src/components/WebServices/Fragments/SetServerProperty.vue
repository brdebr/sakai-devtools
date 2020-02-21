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
        <v-btn
          icon
          outlined
          @click="getPropertiesFromFile"
          title="Refresh properties list"
        >
          <v-icon small>
            fas fa-redo
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pt-6 pb-1">
        <v-form ref="form">
          <v-row no-gutters>
            <v-col no-gutters class="pb-2 pr-4">
              <v-combobox
                outlined
                label="Property name"
                hide-no-data
                clearable
                v-model="propName"
                :items="propertiesList"
                @click:clear="propValue = ''"
                :rules="[v => !!v || 'Required']"
              />
            </v-col>
            <v-col no-gutters cols="3">
              <v-select
                outlined
                label="Property type"
                v-model="propType"
                :items="['string', 'boolean', 'int', 'array']"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col no-gutters>
              <v-text-field
                outlined
                label="Property Value"
                v-model="propValue"
                :class="{
                  'append-enabled': true,
                  'centered-append': true
                }"
                :rules="[v => !!v || 'Required']"
              >
                <template #append>
                  <v-btn
                    icon
                    outlined
                    @click="getFromClipboard"
                    title="Paste clipboard value"
                  >
                    <v-icon small>
                      far fa-clipboard
                    </v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="mx-4">
        <v-spacer />
        <v-btn :loading="loading" depressed light @click="setServerProperty">
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
import path from "path";
var PropertiesReader = require("properties-reader");
const { clipboard } = require("electron");

@Component({})
export default class SetServerProperty extends Vue {
  dialog = false;
  loading = false;
  @Prop()
  sessionId!: String;

  search: String = "";

  propName: String = "";
  propType: "boolean" | "string" | "int" | "array" = "string";
  propValue: String = "";
  error: String = "";

  propertiesList: Array<String> = [];

  async setServerProperty() {
    // @ts-ignore
    if (!this.$refs.form.validate()) {
      return;
    }

    this.loading = true;
    try {
      let result = await WebServiceManager.setServerProperty(
        { sessionid: this.sessionId },
        {
          propName: this.propName,
          propValue: this.propValue,
          propType: this.propType
        },
        this.$store.state.app.baseURL
      );
      await new Promise(resolve => setTimeout(resolve, 300));
      if (result === "success") {
        this.dialog = false;
      }
    } catch (error) {
      this.error = "- - - Error - - -";
      console.warn("WebServiceManager.setServerProperty");
      console.log(error);
    }
    this.loading = false;
  }

  @Watch("dialog")
  async getPropertiesFromFile(newVal: Boolean, oldVal: Boolean) {
    if (newVal) {
      var propertiesFile = path.join(
        // @ts-ignore
        window.process.env.CATALINA_BASE,
        "/sakai/sakai.properties"
      );
      var properties = PropertiesReader(propertiesFile);
      this.propertiesList = Object.keys(properties.getAllProperties()).sort();
    } else {
      await new Promise(resolve => setTimeout(resolve, 300));
      // @ts-ignore
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.propType = "string";
      });
    }
  }

  getFromClipboard() {
    this.propValue = clipboard.readText();
  }

  reset() {
    this.loading = false;
    this.dialog = false;
  }
}
</script>
