<template>
  <v-container class="pa-0 mx-0 pt-2 pb-0">
    <v-divider class="my-3"/>
    <v-row no-gutters>
      <v-col no-gutters class="mx-auto flex-grow-0">
        <v-btn light color="grey lighten-5" class="font-weight-bold" depressed @click="resetAllUserWorkspace">
          Reset All User Workspaces
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="my-3"/>
    <v-row no-gutters>
      <v-col no-gutters class="mx-auto flex-grow-0">
        <v-btn light color="grey lighten-5" class="font-weight-bold" depressed>
          Add new User
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import WebServiceManager from '@/functions/WsManager';

@Component({})
export default class WebServicesActions extends Vue {
  @Prop()
  sessionId!: String;

  async resetAllUserWorkspace(){
      let resp = await WebServiceManager.resetAllUserWorkspace({sessionid:this.sessionId}, this.$store.state.app.baseURL)
  }
}
</script>
