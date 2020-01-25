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
          <AddNewUser :session-id="sessionId"/>
      </v-col>
      <v-col no-gutters class="mx-auto flex-grow-0">
          <UsersList :session-id="sessionId"/>
      </v-col>
    </v-row>
    <v-divider class="my-3"/>
    <v-row no-gutters>
      <v-col no-gutters class="mx-auto flex-grow-0">
          <AddNewSite :session-id="sessionId"/>
      </v-col>
    </v-row>
    <v-divider class="my-3"/>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import WebServiceManager from '@/functions/WsManager';
import AddNewUser from '@/components/WebServices/Fragments/AddNewUser.vue';
import UsersList from '@/components/WebServices/Fragments/UsersList.vue';
import AddNewSite from '@/components/WebServices/Fragments/AddNewSite.vue';

@Component({
    components: {
        AddNewUser,
        UsersList,
        AddNewSite
    }
})
export default class WebServicesActions extends Vue {
  @Prop()
  sessionId!: String;

  async resetAllUserWorkspace(){
      let resp = await WebServiceManager.resetAllUserWorkspace({sessionid:this.sessionId}, this.$store.state.app.baseURL)
  }
}
</script>
