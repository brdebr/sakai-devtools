<template>
  <transition
    name="page"
    mode="out-in"
  >
    <InstanceDetails :key="$store.getters['app/selectedInstance'].id" />
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import InstanceDetails from "../components/SakaiInstance/InstanceDetails.vue";

export default Vue.extend({
  components: {
    InstanceDetails
  }
});
</script>