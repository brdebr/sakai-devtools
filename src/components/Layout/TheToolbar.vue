<template>
  <v-app-bar
    clipped-left
    app
    dark
    flat
    color="blue darken-4"
  >
    <v-btn
      outlined
      fab
      x-small
      class="white--text ml-3 mr-4"
      @click="$store.commit('layout/toggleDrawer')"
    >
      <v-icon small>
        fas fa-bars
      </v-icon>
    </v-btn>
    <v-toolbar-title class="ml-3 headline font-weight-bold">
      Sakai DevTools
    </v-toolbar-title>
    <v-spacer />
    <v-btn to="/" depressed class="mr-4">
      Deploy
    </v-btn>
    <v-btn to="/webservices" depressed class="mr-4">
      WebServices
    </v-btn>
    <CreateInstance v-if="$store.getters['app/selectedInstance']" />
  </v-app-bar>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CreateInstance from "@/components/SakaiInstance/CreteInstance.vue";

@Component({
  components: {
    CreateInstance
  }
})
export default class extends Vue {}
</script>