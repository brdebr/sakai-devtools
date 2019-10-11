<template>
  <v-app>
    <TheDrawer/>
    <TheToolbar/>
    <v-content>
      <v-container class="pb-5 pt-5 bg-gradient" fill-height fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TheDrawer from './components/Layout/TheDrawer.vue'
import TheToolbar from './components/Layout/TheToolbar.vue'

export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    TheToolbar,
    TheDrawer
  },
};
</script>

<style lang="scss">
@import './assets/transitions.scss';
@import './assets/custom.scss';
</style>