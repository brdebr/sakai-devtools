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
          Sites List
        </span>
        <v-icon size="14" right>
          far fa-list-alt
        </v-icon>
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
      <v-card-text
        class="pt-5 pb-8 pa-5 ma-0 overflow-hidden"
        style="min-height: 102px;"
      >
        <v-text-field
          label="Search..."
          v-model="search"
          outlined
          clearable
          hide-details
        />
      </v-card-text>
      <v-divider />
      <v-card-text class="pa-0 ma-0">
        <v-data-table
          :items="list"
          :headers="headers"
          :search="search"
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
          <template #item.actions="{ item }">
            <v-btn icon outlined @click="deleteSite(item)">
              <v-icon x-small>
                far fa-trash-alt
              </v-icon>
            </v-btn>
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
const edialog = require("electron").remote.dialog;
import { SiteItemList } from "../../../models/WsInterfaces";
const { clipboard } = require("electron");

const filteredSites = ["!admin", "citationsAdmin", "mercury", "~admin"];

@Component({})
export default class SitesList extends Vue {
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
    {
      text: "",
      value: "actions",
      width: "100",
      align: "center",
      sortable: false
    }
  ];

  search: String = "";

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

  async deleteSite(item: SiteItemList) {
    const options = {
      type: "warning",
      title: "Confirmation required",
      message: "Delete this site?",
      detail: `"${item.siteTitle}"`,
      buttons: ["Cancel", "I'm sure"],
      defaultId: 0
    };

    let { response } = await edialog.showMessageBox(options);
    if (response) {
      this.loading = true;
      try {
        let response = await WebServiceManager.removeSite(
          { sessionid: this.sessionId },
          item.siteId,
          this.$store.state.app.baseURL
        );
        if (response === "success") {
          this.list.splice(
            this.list.findIndex(el => el.siteId === item.siteId),
            1
          );
        } else {
          throw new Error('Response wasn\'t "success"');
        }
      } catch (error) {
        console.warn("WebServiceManager.removeSite");
        console.log(error);
      }
      this.loading = false;
    }
  }

  reset() {
    this.loading = false;
    this.dialog = false;
  }
}
</script>
