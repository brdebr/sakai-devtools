<template>
  <v-layout justify-center>
    <v-flex
      xs11
      class="mb-auto"
    >
      <v-card class="light-blue lighten-3">
        <v-card-title class="elevation-2 light-blue lighten-3 pt-3">
          <span class="ml-1">
            Sakai Tools
          </span>
          <v-spacer />
        </v-card-title>
        <v-card-text class="pt-5">
            <v-row no-gutters>
                <v-col cols="12" class="my-1" v-for="tool in toolsList" :key="tool">
                    <v-checkbox hide-details class="mt-0 pt-0" v-model="selectedTools" :value="tool" :label="tool"/>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions class="overflow-hidden light-blue lighten-3">
          <v-spacer />
          <v-btn
            depressed
            dark
            color="success"
          >
            <span>
              Deploy
            </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';

@Component({})
export default class InstanceDetails extends Vue{
    toolsList = [
        "access",
        "basiclti",
        "lalala",
        "asdasd"
    ]
    selectedTools = []
};
</script>

<style>
</style>