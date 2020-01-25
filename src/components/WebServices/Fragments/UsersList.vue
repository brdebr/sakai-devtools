<template>
  <v-dialog v-model="dialog" max-width="80%">
    <template #activator="{ on }">
      <v-btn
        light
        color="grey lighten-5"
        class="font-weight-bold"
        depressed
        v-on="on"
      >
        Users List
      </v-btn>
    </template>
    <v-card dark class="indigo darken-3" :loading="loading">
      <v-card-title class="elevation-2 indigo darken-4 py-3">
        <span> Users List </span>
        <v-spacer />
        <v-btn icon outlined class="mr-3">
          <v-icon small @click="getAllUsers">
            far fa-trash-alt
          </v-icon>
        </v-btn>
        <v-btn icon outlined>
          <v-icon small>
            fas fa-redo
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table :items="list" :headers="headers" item-key="userId">
        <template #item.userId="{ item }">
          <v-btn icon outlined :title="`Click to copy [ ${item.userId} ]`" @click="copyToClipbd(item.userId)">
            <v-icon small>
              far fa-clipboard
            </v-icon>
          </v-btn>
        </template>
        <template #item.type="{ item }">
          <span>
            {{item.type || '- - - -'}}
          </span>
        </template>
      </v-data-table>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import WebServiceManager, { userResponse } from "@/functions/WsManager";
const { clipboard } = require('electron')

@Component({})
export default class UsersList extends Vue {
  dialog = false;
  loading = false;
  @Prop()
  sessionId!: String;

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

  copyToClipbd(val: string){
    clipboard.writeText(val)
  }

  reset() {
    this.loading = false;
    this.dialog = false;
  }
}
</script>
