<template>
  <v-navigation-drawer
    :mini-variant="$store.state.app.layout.drawerMini"
    :value="$store.state.app.layout.drawer"
    clipped
    class="drawer-border"
    fixed
    app
    @input="(val) => $store.commit('app/setDrawer', val)"
  >
    <v-layout column justify-space-between fill-height>
      <v-list :shaped="!$store.state.app.layout.drawerMini">
        <v-list-item class="blue drawer-header" dark>
          <span v-if="!$store.state.app.layout.drawerMini" class="font-weight-bold d-inline-block text-truncate">
            Sakai instances
          </span>
          <v-icon v-else>
            fas fa-tachometer-alt
          </v-icon>
        </v-list-item>
        <v-list-item
          v-for="(instance, index) in $store.state.app.sakaiInstances"
          :key="instance.id"
          :title="instance.name"
          :input-value="index === $store.state.app.selectedInstanceIndex"
          router
          active-class="blue--text"
          exact
          @click="false"
        >
          <v-list-item-icon class="ml-3 mr-auto">
            <v-icon>{{ instance.icon || 'fas fa-hdd' }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-4">
            <v-list-item-title>
              {{ instance.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer />
      <transition name="flip-x" mode="out-in">
        <div
          :key="$store.state.app.layout.drawerMini"
          :class="
            `${
              $store.state.app.layout.drawerMini ? 'mx-auto' : 'mx-3'
            } mb-3`
          "
        >
          <v-btn
            :icon="$store.state.app.layout.drawerMini"
            :small="$store.state.app.layout.drawerMini"
            :block="!$store.state.app.layout.drawerMini"
            outlined
            @click.stop="$store.commit('app/toggleDrawerMini')"
          >
            <v-icon small>
              {{
                $store.state.app.layout.drawerMini
                  ? 'fas fa-chevron-right'
                  : 'fas fa-chevron-left'
              }}
            </v-icon>
          </v-btn>
        </div>
      </transition>
    </v-layout>
  </v-navigation-drawer>
</template>
<style lang="scss" scoped>
div.v-list-item.drawer-header{
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
  margin-right: -8px;
  margin-bottom: 8px;
}
.drawer-border {
  border-right: 2px solid #2979FF;
}
</style>