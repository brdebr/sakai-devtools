<template>
  <v-container class="pa-0 mx-0 pt-2 pb-0" fluid>
    <v-divider class="my-3" />
    <v-row no-gutters>
      <v-col no-gutters class="mx-auto flex-grow-0">
        <v-btn
          light
          color="grey lighten-5"
          class="font-weight-bold"
          depressed
          :loading="loadingResetWorkspaces"
          @click="resetAllUserWorkspace"
        >
          <span class="mr-1">
            Reset All User Workspaces
          </span>
          <v-icon small right>
            fas fa-recycle
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="my-3" />
    <v-row style="justify-content: space-evenly;" no-gutters>
      <v-col no-gutters class="flex-grow-0">
        <AddNewUser :session-id="sessionId" />
      </v-col>
      <v-col no-gutters class="flex-grow-0">
        <UsersList :session-id="sessionId" />
      </v-col>
    </v-row>
    <v-divider class="my-3" />
    <v-row style="justify-content: space-evenly;" no-gutters>
      <v-col no-gutters class="flex-grow-0">
        <AddNewSite :session-id="sessionId" />
      </v-col>
      <v-col no-gutters class="flex-grow-0">
        <SitesList :session-id="sessionId" />
      </v-col>
    </v-row>
    <v-divider class="my-3" />
    <v-row style="justify-content: space-evenly;" no-gutters>
      <v-col no-gutters class="flex-grow-0">
        <SetServerProperty :session-id="sessionId" />
      </v-col>
      <v-col no-gutters class="flex-grow-0">
        <ManagePropertiesFile />
      </v-col>
      <v-col no-gutters class="flex-grow-0">
        <GetServerProperty :session-id="sessionId" />
      </v-col>
    </v-row>
    <v-divider class="my-3" />
    <v-row style="justify-content: space-evenly;" no-gutters>
      <v-col no-gutters class="flex-grow-0">
        <ManageSitesPagesAndTools />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import WebServiceManager from "@/functions/WsManager";
import AddNewUser from "@/components/WebServices/Fragments/AddNewUser.vue";
import UsersList from "@/components/WebServices/Fragments/UsersList.vue";
import SitesList from "@/components/WebServices/Fragments/SitesList.vue";
import AddNewSite from "@/components/WebServices/Fragments/AddNewSite.vue";
import GetServerProperty from "@/components/WebServices/Fragments/GetServerProperty.vue";
import SetServerProperty from "@/components/WebServices/Fragments/SetServerProperty.vue";
import ManagePropertiesFile from "@/components/WebServices/Fragments/ManagePropertiesFile.vue";
import ManageSitesPagesAndTools from "@/components/WebServices/Fragments/ManageSitesPagesAndTools.vue";

@Component({
  components: {
    AddNewUser,
    UsersList,
    AddNewSite,
    SitesList,
    GetServerProperty,
    SetServerProperty,
    ManagePropertiesFile,
    ManageSitesPagesAndTools
  }
})
export default class WebServicesActions extends Vue {
  @Prop()
  sessionId!: String;

  loadingResetWorkspaces = false;

  async resetAllUserWorkspace() {
    this.loadingResetWorkspaces = true;
    await new Promise(resolve => setTimeout(resolve, 450));
    let resp = await WebServiceManager.resetAllUserWorkspace(
      { sessionid: this.sessionId },
      this.$store.state.app.baseURL
    );
    this.loadingResetWorkspaces = false;
  }
}
</script>
