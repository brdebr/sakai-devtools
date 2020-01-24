<template>

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from 'vue-property-decorator';

@Component({})
export default class TEMPLATE_CLASS extends Vue {

  @Prop({ default: false })
  disabled!: boolean;

  value: Array<Number> = [];

  @Watch("value")
  logLen(val: Array<Number>, old: Array<Number>) {
    console.log(val.length);
  }
  get negateDisable() {
    return !this.disabled
  }

}
</script>
