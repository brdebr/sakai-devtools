<template>
  <v-dialog
    v-model="dialog"
    max-width="680px"
    scrollable
    transition="slide-y-transition"
    overlay-color="rgb(138, 138, 138)"
  >
    <template #activator="{ on }">
      <v-btn
        light
        color="grey lighten-5"
        class="font-weight-bold"
        depressed
        v-on="on"
      >
        <span class="mr-1">
          Add new Site
        </span>
        <v-icon small right>
          far fa-plus-square
        </v-icon>
      </v-btn>
    </template>
    <v-card dark class="indigo darken-3" :loading="loading">
      <v-card-title class="elevation-2 indigo darken-4 py-3">
        <span>
          Add new Site
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
              <v-text-field outlined label="Site ID" v-model="params.siteid" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col no-gutters>
              <v-text-field outlined label="Title" v-model="params.title" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col no-gutters>
              <v-textarea
                outlined
                label="Description"
                v-model="params.description"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col no-gutters>
              <v-text-field
                outlined
                label="Short description"
                v-model="params.shortdesc"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col no-gutters>
              <v-text-field
                outlined
                label="Icon URL"
                v-model="params.iconurl"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col no-gutters>
              <v-text-field
                outlined
                label="Info URL"
                v-model="params.infourl"
              />
            </v-col>
          </v-row>
          <v-row no-gutters align="center">
            <v-col no-gutters cols="6" class="pl-1">
              <v-checkbox
                class="py-0 my-2"
                label="Joinable"
                hide-details
                v-model="params.joinable"
              />
            </v-col>
            <v-col no-gutters cols="6">
              <v-text-field
                outlined
                label="Role"
                hide-details
                v-model="params.joinerrole"
              />
            </v-col>
          </v-row>
          <v-row no-gutters align="center" class="my-7">
            <v-col no-gutters class="pl-1">
              <v-checkbox
                class="py-0 my-2"
                label="Published"
                hide-details
                v-model="params.published"
              />
            </v-col>
            <v-col no-gutters>
              <v-checkbox
                class="py-0 my-2"
                label="Public"
                hide-details
                v-model="params.publicview"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col no-gutters cols="6" class="pr-5">
              <v-text-field outlined label="Skin" v-model="params.skin" />
            </v-col>
            <v-col no-gutters cols="6">
              <v-select
                :items="['project', 'course']"
                outlined
                label="type"
                v-model="params.type"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          class="ml-auto mr-4"
          depressed
          :loading="loading"
          @click="saveSite"
        >
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
import { siteParams } from "@/models/WsInterfaces";

var faker = require("faker");

@Component({})
export default class AddNewSite extends Vue {
  dialog = false;
  loading = false;
  params: siteParams = {
    siteid: "",
    title: "",
    description: "",
    shortdesc: "",
    iconurl: "",
    infourl: "",
    joinable: false,
    joinerrole: "",
    published: false,
    publicview: false,
    skin: "",
    type: "project"
  };
  @Prop()
  sessionId!: String;

  @Watch("dialog")
  refreshFakes(newVal: Boolean, oldVal: Boolean) {
    if (newVal) {
      this.params = {
        siteid: faker.random.uuid(),
        title: faker.company.catchPhrase(),
        description: faker.lorem.sentences(),
        shortdesc: faker.lorem.slug(),
        iconurl: faker.internet.avatar(),
        infourl: faker.internet.url(),
        joinable: Math.random() > 0.5,
        joinerrole: "access",
        published: Math.random() > 0.5,
        publicview: Math.random() > 0.5,
        skin: "",
        type: "project"
      };
    }
  }

  async saveSite() {
    this.loading = true;
    try {
      let aux = await WebServiceManager.addNewSite(
        this.params,
        this.$store.state.app.baseURL,
        this.sessionId
      );
      await new Promise(resolve => setTimeout(resolve, 150));
      this.dialog = false;
    } catch (error) {
      console.warn("WebServiceManager.addNewSite");
      console.log(error);
    }
    this.loading = false;
  }

  resetForm() {
    // @ts-ignore
    this.$refs.form.reset();
    this.loading = false;
  }
}
</script>
