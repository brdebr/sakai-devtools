<template>
  <v-dialog max-width="85%" transition="slide-y-transition">
    <template #activator="{ on }">
      <v-btn
        depressed
        dark
        v-on="on"
        color="success"
      >
        <span>
          Deploy
        </span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="elevation-2 pt-3">
        Deploy confirmation
      </v-card-title>
      <v-card-text class="pb-5 pt-3 px-3">
        <v-row no-gutters>
          <v-col cols="12">
            <v-card
              flat
              color="grey lighten-4"
              class="pa-3"
            >
              <v-row no-gutters>
                <v-col
                  cols="12"
                  class="mb-3 ml-1"
                >
                  <span class="body-1" @click="test">
                    [ {{ selectedTools.length }} ] Tools to deploy:
                  </span>
                </v-col>
                <!-- Will be a loading bar -->
                <v-divider
                  style="flex-basis: 100%"
                  class="mb-3"
                />
                <!-- ---- -->
                <v-col
                  class="flex-grow-0 pa-0 mr-2"
                  v-for="tool in states"
                  :key="tool.id"
                >
                  <v-chip
                    :color="tool.state"
                    :loading="tool.state === 'deploying'"
                    @click="tool.state = 'deploying'"
                  >
                    <v-progress-circular
                      v-if="tool.state === 'deploying'"
                      :indeterminate="true"
                      size="12"
                      width="2"
                      class="mr-2 ml-n1"
                    />
                    {{ tool.name }}
                  </v-chip>
                </v-col>
              </v-row>
              <v-row no-gutters >
                <v-col cols="12" ref="terminal" id="term">
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { SakaiTool } from "../../../src/models/SakaiTool";

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

const child_process = require('child_process');

var term: Terminal

interface SakaiToolDeployment {
  name: string;
  state: "initial" | "deploying" | "success" | "error" | "warning";
  log?: string;
}

@Component({})
export default class DeployDialog extends Vue {
  @Prop()
  selectedTools!: readonly string[];

  states: SakaiToolDeployment[] = this.mapStrings([...this.selectedTools]);

  terminalLog: string = ''

  @Watch("selectedTools")
  remap(val: string[], old: string[]) {
    this.states = this.mapStrings(val);
  }

  mapStrings(strings: string[]): SakaiToolDeployment[] {
    return strings.map(
      (el: string): SakaiToolDeployment => {
        return {
          name: el,
          state: "initial"
        };
      }
    );
  }

  test(){
    term = new Terminal({
        cursorBlink: true
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    // @ts-ignore
    term.open(this.$refs.terminal);
    fitAddon.fit();

    term.writeln('EXECUTING MAVEN COMMAND')

    let mvnProcess = child_process.spawn("cmd.exe", ["/c", "mvn --version"], {cwd: this.$store.getters['app/selectedInstance'].path});

    mvnProcess.stdout.on('data', (v: Buffer) => {
      this.terminalLog += v.toString()
      term.write(v.toString())
    })

    mvnProcess.on('close', (code: number) => {
        console.log('WOLOLO');
        console.log(this.terminalLog.split('\n'));
        console.log({code});
    })

    mvnProcess.on('error', (code: number) => {
        console.log(':C');
        console.log({code});
    })
  }

}
</script>

<style lang="scss">
@import '../.././node_modules/xterm/css/xterm.css';
</style>