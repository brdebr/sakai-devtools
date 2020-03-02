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
          Manage: Sites > Pages > Tools
        </span>
        <v-icon size="14" right>
          fas fa-cog
        </v-icon>
      </v-btn>
    </template>
    <v-card dark :loading="loading">
      <v-card-title class="elevation-2 indigo darken-4 py-3">
        <span>Manage: Sites > Pages > Tools</span>
        <v-spacer />
        <v-btn icon outlined title="Refresh properties list">
          <v-icon small>
            fas fa-redo
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pt-6 pb-1">
        <v-data-table> </v-data-table>
      </v-card-text>
      <v-divider />
      <v-card-actions class="mx-4">
        <v-spacer />
        <v-btn :loading="loading" depressed light>
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
import path from "path";

var PropertiesReader = require("properties-reader");

@Component({})
export default class ManageSitesPagesAndTools extends Vue {
  dialog = false;
  loading = false;

  propertiesList: Object = {};

  @Watch("dialog")
  getProperties(newVal: Boolean, oldVal: Boolean) {
    console.log({ newVal, oldVal });
  }
}
</script>
