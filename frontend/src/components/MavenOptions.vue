<template>
  <v-card
    flat
    outlined
    style="background-color: transparent"
  >
    <v-card-title class="py-2 subtitle-1">
      Maven options
    </v-card-title>
    <v-divider />
    <v-card-text class="py-2">
      <v-col
        cols="12"
        class="my-0 py-1 pa-0"
      >
        <span class="mr-2">
          CATALINA_BASE:
        </span>
        <span class="font-italic">
          <code>{{ catalina_base }}</code>
        </span>
        <v-btn x-small depressed class="ml-5" color="blue-grey darken-3">
          Change
        </v-btn>
      </v-col>
    </v-card-text>
    <v-divider />
    <v-card-text class="py-2">
      <v-row
        no-gutters
        align="center"
      >
        <v-col class="flex-grow-0 mr-auto my-1">
          Goals:
        </v-col>
        <v-col
          class="flex-grow-0 mx-3"
          v-for="goal in mavenGoals"
          :key="goal"
        >
          <v-checkbox
            hide-details
            class="mt-0 py-0"
            v-model="selectedGoals"
            :value="goal"
          >
            <template #label>
              <span class="ml-n1">
                {{ goal }}
              </span>
            </template>
          </v-checkbox>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";

type MavenGoal = "clean" | "install" | "deploy";

@Component({
  model: {
    prop: "value",
    event: "input"
  }
})
export default class MavenOptions extends Vue {
  @Prop()
  readonly value!: MavenGoal[];

  catalina_base = window.process.env.CATALINA_BASE;

  selectedGoals: MavenGoal[] = this.value;

  @Watch("selectedGoals")
  onSelectedToolsChange(val: string[], old: string[]) {
    this.$emit("input", val);
  }

  mavenGoals: MavenGoal[] = ["clean", "install", "deploy"];
}
</script>

<style>
</style>