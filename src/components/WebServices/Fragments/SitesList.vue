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
        Sites List
      </v-btn>
    </template>
    <v-card dark :loading="loading">
      <v-card-title class="elevation-2 indigo darken-4 py-3">
        <span> Sites List </span>
        <v-spacer />
        <v-btn icon outlined @click="getAllSites">
          <v-icon small>
            fas fa-redo
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-0 ma-0">
        <v-data-table :items="list" :headers="headers" item-key="siteId">
          <template #item.siteId="{ item }">
            <v-btn
              icon
              outlined
              :title="`Click to copy [ ${item.siteId} ]`"
              @click="copyToClipbd(item.siteId)"
            >
              <v-icon small>
                far fa-clipboard
              </v-icon>
            </v-btn>
          </template>
          <template #item.type="{ item }">
            <span>
              {{ item.type || "- - - -" }}
            </span>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import WebServiceManager from "@/functions/WsManager";
import { getAllSitesForCurrentUserResponse } from "@/models/WsInterfaces";
const { clipboard } = require("electron");

@Component({})
export default class SitesList extends Vue {
  dialog = false;
  loading = false;
  @Prop()
  sessionId!: String;

  list: Array<getAllSitesForCurrentUserResponse> = [];
  headers: any = [
    { text: "ID", value: "siteId", width: "80", align: "center" },
    { text: "Name", value: "siteTitle" },
    { text: "Type", value: "siteType" },
    { text: "# Groups", value: "siteGroups", width: "100", align: "center" }
  ];

  @Watch("dialog")
  async getAllSites(newVal: Boolean, oldVal: Boolean) {
    if (newVal) {
      this.loading = true
      try {
        this.list = await WebServiceManager.getAllSitesForCurrentUser(
          { sessionid: this.sessionId },
          this.$store.state.app.baseURL
        );
      } catch (error) {
        console.warn("WebServiceManager.getAllSitesForCurrentUser");
        console.log(error);
      }
      this.loading = false
    }
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
