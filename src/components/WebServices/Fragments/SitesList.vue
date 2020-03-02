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
            <v-btn icon outlined @click="selectToDelete(item)">
              <v-icon x-small>
                far fa-trash-alt
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <!-- TODO: Move this to a separate component and put a loading on it -->
    <v-dialog v-model="deleteConfirmDialog" max-width="500px">
      <v-card v-if="selectedToDelete">
        <v-card-title class="elevation-2 amber py-3">
          <v-icon class="mr-3" color="orange darken-4">
            fas fa-exclamation-triangle
          </v-icon>
          <span class="font-weight-bold">
            Confirmation required
          </span>
        </v-card-title>
        <v-card-text class="pt-4 pb-3 pa-5 ma-0 overflow-hidden">
          <v-row wrap no-gutters>
            <v-col cols="12" class="mb-3">
              <span class="subtitle-2">
                Delete this site?
              </span>
            </v-col>
            <v-col cols="12">
              <span class="mr-3 d-inline-block" style="min-width: 60px">
                Site ID:
              </span>
              <span>
                {{ selectedToDelete.siteId }}
              </span>
            </v-col>
            <v-col cols="12">
              <span class="mr-3 d-inline-block" style="min-width: 60px">
                Title:
              </span>
              <span>
                {{ selectedToDelete.siteTitle }}
              </span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            depressed
            color="red darken-2"
            dark
            class="mr-2"
            @click="deleteSite"
          >
            DELETE
          </v-btn>
          <v-btn depressed class="mr-2" @click="closeDeleteDialog">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import WebServiceManager from "@/functions/WsManager";
import { getAllSitesForCurrentUserResponse } from "@/models/WsInterfaces";
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

  deleteConfirmDialog = false;
  selectedToDelete: SiteItemList | null = null;

  selectToDelete(item: SiteItemList) {
    this.selectedToDelete = item;
    this.deleteConfirmDialog = true;
  }

  async deleteSite() {
    if (this.selectedToDelete === null) {
      return;
    }
    this.loading = true;
    try {
      let response = await WebServiceManager.removeSite(
        { sessionid: this.sessionId },
        this.selectedToDelete.siteId,
        this.$store.state.app.baseURL
      );
      if (response === "success") {
        this.list.splice(
          // @ts-ignore
          this.list.findIndex(el => el.siteId === this.selectedToDelete.siteId),
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
    this.closeDeleteDialog();
  }

  closeDeleteDialog() {
    this.deleteConfirmDialog = false;
    this.selectedToDelete = null;
  }

  reset() {
    this.loading = false;
    this.dialog = false;
  }
}
</script>
