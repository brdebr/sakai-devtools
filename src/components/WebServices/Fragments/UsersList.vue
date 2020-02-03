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
          Users List
        </span>
        <v-icon size="14" right>
          far fa-list-alt
        </v-icon>
      </v-btn>
    </template>
    <v-card dark :loading="loading">
      <v-card-title class="elevation-2 indigo darken-4 py-3">
        <span> Users List </span>
        <v-spacer />
        <v-btn icon outlined @click="getAllUsers">
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
          item-key="userId"
          :search="search"
        >
          <template #item.userId="{ item }">
            <v-btn
              icon
              outlined
              :title="`Click to copy [ ${item.userId} ]`"
              @click="copyToClipbd(item.userId)"
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
import { userResponse } from "@/models/WsInterfaces";
const { clipboard } = require("electron");

@Component({})
export default class UsersList extends Vue {
  dialog = false;
  loading = false;
  @Prop()
  sessionId!: String;

  search: String = "";

  list: Array<userResponse> = [];
  headers: any = [
    { text: "ID", value: "userId", width: "80", align: "center" },
    { text: "EID", value: "eid" },
    { text: "Name", value: "displayName" },
    { text: "Type", value: "type" }
  ];

  @Watch("dialog")
  async getAllUsers(newVal: Boolean, oldVal: Boolean) {
    if (newVal) {
      this.list = await WebServiceManager.getAllUsers(
        { sessionid: this.sessionId },
        this.$store.state.app.baseURL
      );
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
