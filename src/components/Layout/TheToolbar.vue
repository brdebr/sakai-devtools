<template>
  <v-app-bar clipped-left app dark flat color="blue darken-4">
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
    <v-toolbar-title class="ml-3 headline font-weight-bold" @click="mytest">
      Sakai DevTools
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      to="/"
      depressed
      class="mr-4"
      active-class="v-btn--outlined active-nav"
    >
      <span class="nav-text">
        Deploy
      </span>
    </v-btn>
    <v-btn
      to="/webservices"
      depressed
      class="mr-4"
      active-class="v-btn--outlined active-nav"
    >
      <span class="nav-text">
        WebServices
      </span>
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
export default class extends Vue {
  mytest() {
    this.$store.dispatch("layout/decr", 2);
  }
}
</script>
<style lang="scss">
.active-nav {
  .v-btn__content {
    .nav-text {
      color: #fff !important;
      font-weight: 600;
      border-bottom: 1px solid white;
    }
  }
  // ::before{
  //   opacity: 0 !important ;
  // }
}
.active-nav.theme--dark.v-btn--active::before {
  opacity: 0 !important;
}
.nav-text {
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
}
</style>
