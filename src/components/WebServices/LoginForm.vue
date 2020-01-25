<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col class="flex-grow-0">
        <v-card color="blue darken-3" outlined :loading="loading" min-width="500px">
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
            <v-card-actions class="mx-2">
              <v-spacer />
              <v-btn :loading="loading" depressed light @click="login">
                <span class="subtitle-2">
                  Login
                </span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { LoginParams } from "@/models/WsInterfaces";
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
    try {
      let sessionId = await WebServiceManager.login(
        this.loginParams,
        this.$store.state.app.baseURL
      );
      this.$emit("logged", sessionId);
    } catch (error) {
      console.warn("WebServiceManager.login");
      console.log(error);
    }
  }
}
</script>
