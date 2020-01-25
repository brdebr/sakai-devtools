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
        <span>
          Users List
        </span>
        <v-spacer />
        <v-btn icon outlined  class="mr-3">
          <v-icon small @click="getAllUsers">
            far fa-trash-alt
          </v-icon>
        </v-btn>
        <v-btn icon outlined >
          <v-icon small>
            fas fa-redo
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pt-5 pb-3">
        <v-data-table>
          
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import WebServiceManager, { userResponse } from '@/functions/WsManager';

@Component({})
export default class AddNewUser extends Vue {
  dialog = false;
  loading = false;
  @Prop()
  sessionId!: String

  list: Array<userResponse> = []

  async getAllUsers(){
    this.list = await WebServiceManager.getAllUsers({sessionid: this.sessionId}, this.$store.state.app.baseURL)
  }

  reset(){
      this.loading = false
      this.dialog = false
  }
}
</script>
