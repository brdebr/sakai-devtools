<template>
  <v-dialog
    v-model="dialog"
    :persistent="loading"
    :loading="loading"
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
          far fa-list-alt
        </v-icon>
      </v-btn>
    </template>
    <v-card dark :loading="loading">
      <v-card-title class="elevation-2 indigo darken-4 py-3">
        <span> Manage: Sites > Pages > Tools </span>
        <v-spacer />
        <v-btn icon outlined @click="getAllSites">
          <v-icon small>
            fas fa-redo
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-0 ma-0">
        <v-data-table
          :items="list"
          :headers="headers"
          :search="search"
          show-expand
          :expanded.sync="expandedList"
          item-key="siteId"
        >
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
          <template #item.siteType="{ item }">
            <span>
              {{ item.siteType || "- - - -" }}
            </span>
          </template>
          <template v-slot:expanded-item="{ item }">
            <PagesAndToolsForSiteRow :item="item" :sessionId="sessionId" />
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
import { SiteItemList } from "../../../models/WsInterfaces";
import PagesAndToolsForSiteRow from "./SubFragments/PagesAndToolsForSiteRow.vue";
const { clipboard } = require("electron");

const filteredSites = ["!admin", "citationsAdmin", "mercury", "~admin"];

@Component({
  components: {
    PagesAndToolsForSiteRow
  }
})
export default class ManageSitesPagesAndTools extends Vue {
  dialog = false;
  loading = false;
  @Prop()
  sessionId!: String;

  list: Array<SiteItemList> = [];
  headers: any = [
    { text: "ID", value: "siteId", width: "80", align: "center" },
    { text: "Name", value: "siteTitle" },
    { text: "Type", value: "siteType", align: "center" },
    { text: "# Groups", value: "siteGroups", width: "100", align: "center" },
    { text: "", value: "data-table-expand" }
  ];

  search: String = "";

  expandedList: Array<any> = [];

  @Watch("dialog")
  async getAllSites(newVal: Boolean, oldVal: Boolean) {
    if (newVal) {
      this.loading = true;
      try {
        let auxList = await WebServiceManager.getAllSitesForCurrentUser(
          { sessionid: this.sessionId },
          this.$store.state.app.baseURL
        );
        this.list = auxList.filter((site: SiteItemList) => {
          return filteredSites.findIndex(el => site.siteId === el) === -1;
        });
      } catch (error) {
        console.warn("WebServiceManager.getAllSitesForCurrentUser");
        console.log(error);
      }
      this.loading = false;
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
