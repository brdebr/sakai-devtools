<template>
  <transition
    name="page"
    mode="out-in"
  >
    <InstanceDetails v-if="$store.getters['app/selectedInstance']" :key="$store.getters['app/selectedInstance'].id" />
    <v-card dark
        class="blue darken-2 mx-auto" v-else>
      <v-card-title class="elevation-2 blue darken-3 pt-3">
        Add an instance first
      </v-card-title>
      <v-card-text class="pt-5">
        <CreateInstance/>
      </v-card-text>
    </v-card>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import InstanceDetails from "@/components/InstanceDetails.vue";
import CreateInstance from '@/components/SakaiInstance/CreteInstance.vue';

export default Vue.extend({
  components: {
    InstanceDetails,
    CreateInstance
  }
});
</script>