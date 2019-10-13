<template>
  <v-dialog v-model="dialog" max-width="90%" transition="slide-y-transition" :persistent="true">
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
        <span>
          Deploy confirmation
        </span>
        <v-spacer/>
        <v-btn @click="dialog = false" depressed color="grey" class="mr-2" v-if="percentage === 100">
          CLOSE
        </v-btn>
        <v-btn v-else depressed color="grey" @click="loopDeploying">
          GO
        </v-btn>
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
                  <span class="body-1">
                    [ {{ selectedTools.length }} ] Tools to deploy:
                  </span>
                </v-col>
                <v-progress-linear striped :value="percentage" class="mb-3"/>
                <v-col cols="12">
                  <v-expansion-panels v-model="toolsPanel" accordion>
                    <v-expansion-panel v-for="tool in states" :key="tool.id">
                      <v-expansion-panel-header disable-icon-rotate>
                        {{ tool.name }}
                        <template #actions>
                          <v-icon class="mvn-state-icon">
                            {{ getStateIcon(tool.state) }}
                          </v-icon>
                        </template>
                      </v-expansion-panel-header>
                        <v-expansion-panel-content eager class="grey darken-3 no-x-paddings">
                          <v-row no-gutters class="justify-center">
                            <v-col class="py-2 px-7 mx-auto black white--text terminal-like">
                                {{ tool.log }}
                            </v-col>
                          </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
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

const child_process = require('child_process');

interface SakaiToolDeployment {
  name: string;
  state: "initial" | "deploying" | "success" | "error" | "warning";
  log?: string;
}

@Component({})
export default class DeployDialog extends Vue {
  @Prop()
  selectedTools!: readonly string[];
  
  toolsPanel: number = -1
  dialog: boolean = false

  states: SakaiToolDeployment[] = this.mapStrings([...this.selectedTools]);

  @Watch("selectedTools")
  remap(val: string[], old: string[]) {
    this.states = this.mapStrings(val);
  }
  
  get percentage(){
    return ((this.states.filter(el => el.state !== 'initial' && el.state !== 'deploying').length * 100) / this.states.length)
  }

  getStateIcon(state: string){
    switch (state) {
      case 'initial': return 'far fa-square'
      case 'deploying': return 'fas fa-sync fa-spin blue-grey--text'
      case 'success': return 'far fa-check-square green--text'
      case 'error': return 'fas fa-exclamation-triangle red--text'
      case 'warning': return 'fas fa-minus-square warning--text'
    }
  }

  mapStrings(strings: string[]): SakaiToolDeployment[] {
    return strings.map(
      (el: string): SakaiToolDeployment => {
        return {
          name: el,
          state: "initial",
          log: ''
        };
      }
    );
  }

  async loopDeploying(){
    for (let i = 0; i < this.states.length; i++) {
      // this.toolsPanel = i
      this.states[i].state = "deploying"
      // await new Promise(resolve => setTimeout(resolve, 500))
      let stateVal = await this.deployTool(i)
      this.states[i].state = stateVal
    }
    this.toolsPanel = -1
  }

  deployTool(index: number): Promise<"success"|"error">{
    return new Promise((resolve,reject) => {
        let testt = 'mvn clean install sakai:deploy -Dmaven.tomcat.home=%CATALINA_BASE% -Djava.net.preferIPv4Stack=true -Dmaven.test.skip=true -Dsakai.cleanup=true'
        let mvnProcess = child_process.spawn("cmd.exe", ["/c", testt], { cwd: this.$store.getters['app/selectedInstance'].path +'\\'+this.states[index].name });

        mvnProcess.stdout.on('data', (v: Buffer) => {
          this.states[index].log += v.toString()
        })

        mvnProcess.on('close', (code: number) => {
            var succeded = code === 0;
            if(succeded){
              resolve('success')
            }else{
              resolve('error')
            }
        })
        mvnProcess.on('error', (code: number) => {
            console.log(':C');
            console.log({code});
            reject({code})
        })

    })

  }

}
</script>

<style lang="scss">
.no-x-paddings{
  .v-expansion-panel-content__wrap{
    padding: 0
  }
}
.mvn-state-icon{
  &.fa-exclamation-triangle, &.fa-sync{
    font-size: 21px;
    margin-right: -2px;
  }
}
.terminal-like{
  white-space: pre-wrap;
  font-family: monospace;
  max-height: 350px;
  overflow-y: scroll;
}
</style>