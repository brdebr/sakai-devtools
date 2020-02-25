<template>
  <v-dialog
    v-model="dialog"
    max-width="80%"
    overlay-color="rgb(138, 138, 138)"
    transition="slide-y-transition"
    scrollable
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
          Manage server properties
        </span>
        <v-icon size="14" right>
          fas fa-cog
        </v-icon>
      </v-btn>
    </template>
    <v-card dark :loading="loading">
      <v-card-title class="elevation-2 indigo darken-4 py-3">
        <span>Manage server properties</span>
        <v-spacer />
        <v-btn icon outlined title="Refresh properties list">
          <v-icon small>
            fas fa-redo
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pt-6 pb-1">
        <v-form ref="form">
          <v-row
            no-gutters
            v-for="key in Object.keys(propertiesList)"
            :key="key"
            align="center"
          >
            <v-col no-gutters class="pb-2">
              {{ key }}
            </v-col>
            <v-col no-gutters class="pb-2">
              <v-text-field
                v-model="propertiesList[key]"
                hide-details
                dense
                class="no-margin-prepend"
                outlined
              >
                <template #prepend>
                  <v-btn
                    tile
                    icon
                    outlined
                    class="mr-2"
                    style="border-radius: 4px !important"
                  >
                    <v-icon small>
                      fas fa-save
                    </v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="mx-4">
        <v-spacer />
        <v-btn :loading="loading" depressed light>
          <span class="subtitle-2">
            Get
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import path from "path";

var PropertiesReader = require("properties-reader");

@Component({})
export default class ManagePropertiesFile extends Vue {
  dialog = false;
  loading = false;

  propertiesList: Object = {};

  @Watch("dialog")
  getProperties(newVal: Boolean, oldVal: Boolean) {
    if (!newVal) {
      return;
    }
    var propertiesFile = path.join(
      // @ts-ignore
      window.process.env.CATALINA_BASE,
      "/sakai/sakai.properties"
    );

    this.propertiesList = PropertiesReader(propertiesFile)["_properties"];
  }
}
</script>
