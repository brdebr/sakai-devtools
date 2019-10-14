<template>
  <v-card
    flat
    outlined
    style="background-color: transparent"
    class="d-flex flex-column"
    max-height="400px"
  >
    <v-card-title class="py-2 subtitle-1">
      Tools to compile
    </v-card-title>
    <v-divider />
    <v-card-text class="py-2">
      <v-col
        cols="12"
        class="my-0 py-1"
      >
        <v-checkbox
          hide-details
          class="mt-0 py-0"
          v-model="selectedTools"
          value="library"
        >
          <template #label>
            <span class="ml-2">
              library
            </span>
          </template>
        </v-checkbox>
      </v-col>
    </v-card-text>
    <v-divider />
    <v-card-text style="overflow-y: scroll">
      <v-col
        cols="12"
        class="my-0 py-1"
        v-for="tool in tools"
        :key="tool"
      >
        <v-checkbox
          hide-details
          class="mt-0 py-0"
          v-model="selectedTools"
          :value="tool"
        >
          <template #label>
            <span class="ml-2">
              {{ tool }}
            </span>
          </template>
        </v-checkbox>
      </v-col>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";

@Component({
  model: {
    prop: "value",
    event: "input"
  }
})
export default class ToolSelector extends Vue {
  @Prop()
  readonly tools!: string[];

  @Prop()
  readonly value!: string[];

  selectedTools: string[] = this.value;

  @Watch("selectedTools")
  onSelectedToolsChange(val: string[], old: string[]) {
    this.$emit("input", val);
  }
}
</script>

<style>
</style>