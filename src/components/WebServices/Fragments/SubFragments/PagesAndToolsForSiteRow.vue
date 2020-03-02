<template>
  <td colspan="5" class="py-3 px-7">
    <v-row wrap no-gutters>
      <template v-if="this.list.length > 0">
        <v-col cols="12" no-gutters v-for="item in list" :key="item.pageId">
          <v-card outlined class="mb-3">
            <v-card-title
              class="py-1 px-2"
              style="border-bottom: 1px solid rgba(255, 255, 255, 0.12);"
            >
              <span class="body-2 mr-2" :title="`Page ID: ${item.pageId}`">
                [ID]
              </span>
              <span class="body-2"> {{ item.pageTitle }} </span>
              <v-spacer />
              <v-btn
                icon
                outlined
                tile
                class="mini-clip"
                :title="`Click to copy [ ${item.pageId} ]`"
                @click="copyToClipbd(item.pageId)"
              >
                <v-icon size="9">
                  far fa-clipboard
                </v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text v-if="item.tools.length > 0" class="py-0 px-0 ma-0">
              <v-row
                no-gutters
                v-for="tool in item.tools"
                :key="tool.toolId"
                class="px-3"
              >
                <v-col
                  no-gutters
                  class="flex-grow-0 mr-3"
                  :title="`Tool ID: ${tool.toolId}`"
                >
                  [ID]
                </v-col>
                <v-col no-gutters class="flex-grow-1 mr-3"
                  >{{ tool.toolTitle }}
                </v-col>
                <v-col no-gutters class="flex-grow-1 mr-3">
                  {{ tool.toolName }}
                </v-col>
                <v-col no-gutters cols="12" class="mx-n2">
                  <v-divider />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12" class="text-center caption">
          {{ this.loading ? "Loading..." : "- - No items - -" }}
        </v-col>
      </template>
    </v-row>
  </td>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { SiteItemList, pagesAndToolsForSite } from "@/models/WsInterfaces";
import WebServiceManager from "@/functions/WsManager";
import { clipboard } from "electron";

@Component({})
export default class PagesAndToolsForSiteRow extends Vue {
  @Prop()
  item!: SiteItemList;
  @Prop()
  sessionId!: String;

  loading = false;

  list: Array<pagesAndToolsForSite> = [];

  async mounted() {
    this.loading = true;
    try {
      this.list = await WebServiceManager.getPagesAndToolsForSiteForCurrentUser(
        this.item.siteId,
        { sessionid: this.sessionId },
        this.$store.state.app.baseURL
      );
    } catch (error) {
      console.warn("WebServiceManager.getPagesAndToolsForSiteForCurrentUser");
      console.log(error);
    }
    this.loading = false;
  }

  copyToClipbd(val: String) {
    clipboard.writeText(val as string);
  }
}
</script>
<style lang="scss">
.mini-clip {
  width: 24px !important;
  height: 24px !important;
}
</style>
