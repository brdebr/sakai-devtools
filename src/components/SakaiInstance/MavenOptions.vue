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
        class="pt-1 px-1"
      >
        <div>
          <span
            class="d-block mb-1 text-truncate"
            :title="line"
            v-for="line in cmdLog.split('\n')"
            :key="line"
          >
            {{ line }}
          </span>
        </div>
      </v-col>
      <v-divider class="mb-3" />
      <v-col
        cols="12"
        class="my-0 py-1 px-1"
      >
        <span class="mr-2">
          CATALINA_BASE:
        </span>
        <span class="font-italic">
          <code>{{ catalina_base }}</code>
        </span>
        <v-btn
          x-small
          depressed
          class="ml-5"
          color="blue-grey darken-3"
        >
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
          v-for="goal in mavenGoalList"
          :key="goal.name"
        >
          <v-checkbox
            hide-details
            class="mt-0 py-0"
            v-model="selectedGoals"
            :color="goal.color"
            :value="goal.name"
          >
            <template #label>
              <span>
                {{ goal.name }}
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

const child_process = require("child_process");

export type MavenGoal = "clean" | "install" | "sakai:deploy";

@Component({
  model: {
    prop: "value",
    event: "input"
  }
})
export default class MavenOptions extends Vue {
  // MAVEN GOALS -->
  @Prop()
  readonly value!: MavenGoal[];

  selectedGoals: MavenGoal[] = this.value;
  @Watch("selectedGoals")
  onSelectedToolsChange(val: string[], old: string[]) {
    this.$emit("input", val);
  }

  mavenGoalList: { name: MavenGoal; color: string }[] = [
    {
      name: "clean",
      color: "white"
    },
    {
      name: "install",
      color: "yellow"
    },
    {
      name: "sakai:deploy",
      color: "green lighten-1"
    }
  ];
  // <-- MAVEN GOALS

  catalina_base = window.process.env.CATALINA_BASE;

  cmdLog: string = "";

  getMavenInfo() {
    let mvnProcess = child_process.spawn("cmd.exe", ["/c", "mvn --version"]);

    mvnProcess.stdout.on("data", (v: Buffer) => {
      this.cmdLog += v.toString();
    });

    mvnProcess.on("close", (code: number) => {
      console.log("WOLOLO");
    });

    mvnProcess.on("error", (code: number) => {
      console.log(":C");
      console.log({ code });
    });
  }

  mounted() {
    this.getMavenInfo();
  }
}
</script>

<style>
</style>