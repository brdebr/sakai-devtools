<template>
  <v-app>
    <TheDrawer/>
    <v-app-bar
      clipped-left
      app
      flat
      color="light-blue lighten-3"
    >
    <v-btn
       outlined
       fab
       x-small
       class="blue--text text--accent-3 ml-1 mr-4"
       @click="$store.commit('app/toggleDrawer')"
      >
      <v-icon small>
        fas fa-bars
      </v-icon>
    </v-btn>
      <v-toolbar-title class="headline font-weight-bold">
        Sakai DevTools
      </v-toolbar-title>
      <v-spacer/>
    </v-app-bar>

    <v-content>
      <v-container class="pb-5 pt-5" fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TheDrawer from './components/TheDrawer.vue'

export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    TheDrawer,
  },
};
</script>

<style lang="scss">
@import './assets/transitions.scss'
</style>