<template>
  <v-card color="blue darken-3" outlined :loading="loading">
    <v-card-title class="elevation-2 blue darken-4">
      Login form
    </v-card-title>
    <v-form ref="form">
      <v-card-text class="pt-6 pb-1">
        <v-row no-gutters wrap>
          <v-col no-gutters cols="12">
            <v-text-field
              outlined
              label="User ID"
              :rules="[v => !!v || 'Required']"
              v-model="loginParams.id"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              label="Password"
              :rules="[v => !!v || 'Required']"
              v-model="loginParams.pw"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn :loading="loading" depressed light @click="login">
          <span class="subtitle-2">
            Login
          </span>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { LoginParams } from "@/functions/WsManager";
import WebServiceManager from "@/functions//WsManager";

@Component({})
export default class LoginForm extends Vue {
  loading = false;
  loginParams: LoginParams = {
    id: "admin",
    pw: "admin"
  };
  async login() {
    // @ts-ignore
    if (!this.$refs["form"].validate()) {
      return;
    }
    let sessionId = await WebServiceManager.login(this.loginParams, this.$store.state.app.baseURL);
    this.$emit("logged", sessionId);
  }
}
</script>
