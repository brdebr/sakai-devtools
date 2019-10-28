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
    <v-card-text>
      <v-autocomplete
        :items="tools"
        multiple
        v-model="selectedTools"
        :search-input.sync="autoinput"
        clearable
        filled
        hide-details
        label="Tools to compile"
        height="auto"
        class="autochips"
        @change="autoinput = null"
      >
        <template #selection="{item, index, select}">
          <v-chip
            class=" tool-pill"
            close
            light
            color="grey lighten-2"
            @click:close="selectedTools.splice(index, 1)"
          >
            <v-avatar
              left
              class="mr-3"
            >
              <v-icon size="22">
                far fa-circle
              </v-icon>
            </v-avatar>
            <div class="mr-2 font-weight-bold">
              {{ item }}
            </div>
          </v-chip>
        </template>
      </v-autocomplete>
    </v-card-text>
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
    <v-card-text class="pa-0 pr-2" style="overflow-y: scroll">
      <!-- <v-col
        cols="12"
        class="my-0 py-1"
        v-for="tool in tools"
        :key="tool"
      >
        <v-checkbox
          hide-details
          :ripple="false"
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
      </v-col> -->
      <v-treeview selectable :items="toolsTree.children" item-key="path" open-on-click shaped hoverable/>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";
import ToolManager, { FileData } from '@/functions/ToolManager';

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

  autoinput = null

  toolsTree: FileData = ToolManager.getFilesTree( this.$store.getters['app/selectedInstance'].path,0,3)

  selectedTools: string[] = this.value;

  @Watch("selectedTools")
  onSelectedToolsChange(val: string[], old: string[]) {
    this.$emit("input", val);
  }
}
</script>

<style lang="scss">
.autochips {
  .v-select__selections {
    padding-top: 40px !important;
    padding-bottom: 10px;
    margin-left: -4px;
    margin-right: -4px;
  }
}
.tool-pill {
  > span {
    min-width: 130px;
    .v-chip__close {
      margin-left: auto !important;
    }
  }
}
</style>