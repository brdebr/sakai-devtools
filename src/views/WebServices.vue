<template>
  <v-card dark class="blue darken-2 mx-auto overflow-hidden" min-width="100%" min-height="500px">
    <v-card-title class="elevation-2 blue darken-3 pt-3">
      WebServices
    </v-card-title>
    <transition :name="`move-x${!sessionId ? '-reverse' :''}`" mode="out-in">
      <v-card-text class="pt-5 pb-3" v-if="sessionId" key="in">
        <v-row no-gutters wrap align="center">
          <v-col no-gutters class="flex-grow-1 flex-shrink-0">
            <v-row no-gutters>
              <v-col no-gutters cols="12">
                Logged In:
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
      </v-card-text>
      <v-card-text class="pt-5 pb-3" v-else key="out">
        <LoginForm @logged="logged" />
      </v-card-text>
    </transition>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import LoginForm from "@/components/WebServices/LoginForm.vue";
import { LoginParams } from "@/functions/WsManager";

@Component({
  components: {
    LoginForm
  }
})
export default class WebServicesPage extends Vue {
  sessionId: String = "";
  logged(sessionId: String) {
    this.sessionId = sessionId;
  }
  logOut(){
    this.sessionId = ""
  }
}
</script>
