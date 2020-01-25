<template>
  <v-dialog v-model="dialog" max-width="680px">
    <template #activator="{ on }">
      <v-btn
        light
        color="grey lighten-5"
        class="font-weight-bold"
        depressed
        v-on="on"
      >
        Add new User
      </v-btn>
    </template>
    <v-card dark class="indigo darken-3" :loading="loading">
      <v-card-title class="elevation-2 indigo darken-4 py-3">
        <span>
          Add new User
        </span>
        <v-spacer />
        <v-btn icon outlined @click="resetForm" class="mr-3">
          <v-icon small>
            far fa-trash-alt
          </v-icon>
        </v-btn>
        <v-btn icon outlined @click="refreshFakes">
          <v-icon small>
            fas fa-redo
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pt-5 pb-3">
        <v-form ref="form">
          <v-row no-gutters>
            <v-col no-gutters>
              <v-text-field outlined label="User ID" v-model="params.eid" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col no-gutters>
              <v-text-field outlined label="Email" v-model="params.email" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col no-gutters>
              <v-text-field
                outlined
                label="Password"
                v-model="params.password"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col no-gutters>
              <v-text-field
                outlined
                label="First name"
                v-model="params.firstname"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col no-gutters>
              <v-text-field
                outlined
                label="Last name"
                v-model="params.lastname"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn class="ml-auto mr-4" depressed @click="saveUser" :loading="loading">
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import WebServiceManager from "@/functions/WsManager";
import { addUserParams } from '@/models/WsInterfaces';

var faker = require("faker");

@Component({})
export default class AddNewSite extends Vue {
  dialog = false;
  loading = false;
  params: addUserParams = {
    eid: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "sakai"
  };
  @Prop()
  sessionId!: String

  @Watch("dialog")
  refreshFakes(newVal: Boolean, oldVal: Boolean) {
      if(newVal){
          this.params = {
            eid: faker.internet.userName(),
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email().replace('.com','-mock.com'),
            password: "sakai"
          };
      }
  }

  async saveUser(){
      this.loading = true
      try {
          let aux = await WebServiceManager.addNewUser(this.params, this.$store.state.app.baseURL, this.sessionId)
          this.dialog = false
      } catch (error) {
          console.warn('WebServiceManager.addNewUser');
          console.log(error);
      }
      this.loading = false
  }

  resetForm(){
      // @ts-ignore
      this.$refs.form.reset()
      this.loading = false
  }
}
</script>
