<template>
  <v-card
    dark
    class="blue darken-2 mx-auto overflow-hidden"
    min-width="100%"
    min-height="500px"
  >
    <v-card-title class="elevation-2 blue darken-3 pt-3">
      WebServices
    </v-card-title>
    <v-card-text class="pt-5 pb-3">
      <transition :name="`move-x${!sessionId ? '-reverse' : ''}`" mode="out-in">
        <v-container class="pa-0 ma-0" v-if="sessionId" key="in">
          <v-row no-gutters wrap align="center" >
            <v-col no-gutters>
              <v-row no-gutters>
                <v-col no-gutters cols="12">
                  Session ID:
                </v-col>
                <v-col no-gutters cols="12">
                  {{ sessionId }}
                </v-col>
              </v-row>
            </v-col>
            <v-col no-gutters class="flex-grow-0">
              <v-btn depressed @click="logOut">
                Log out
              </v-btn>
            </v-col>
          </v-row>
          <WebServicesActions v-if="sessionId" :session-id="sessionId" :key="sessionId" />
        </v-container>
        <LoginForm @logged="logged" v-else key="out" />
      </transition>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import WebServicesActions from "@/components/WebServices/WebServicesActions.vue"

import LoginForm from "@/components/WebServices/LoginForm.vue";
import { LoginParams } from '@/models/WsInterfaces';

@Component({
  components: {
    LoginForm,
    WebServicesActions
  }
})
export default class WebServicesPage extends Vue {
  sessionId: String = "";
  logged(sessionId: String) {
    this.sessionId = sessionId;
  }
  logOut() {
    this.sessionId = "";
  }
}
</script>
