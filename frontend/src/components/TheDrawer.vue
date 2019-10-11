<template>
  <v-navigation-drawer
    :mini-variant="$store.state.layout.drawerMini"
    :value="$store.state.layout.drawer"
    clipped
    class="drawer-border"
    fixed
    app
    @input="(val) => $store.commit('setDrawer', val)"
  >
    <v-layout column justify-space-between fill-height>
      <v-list :shaped="!$store.state.layout.drawerMini">
        <v-list-item
          v-for="instance in $store.state.layout.drawerItems"
          :key="instance.id"
          :title="instance.name"
          :input-value="instance.id === 1"
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
          :key="$store.state.layout.drawerMini"
          :class="
            `${
              $store.state.layout.drawerMini ? 'mx-auto' : 'mx-3'
            } mb-3`
          "
        >
          <v-btn
            :icon="$store.state.layout.drawerMini"
            :small="$store.state.layout.drawerMini"
            :block="!$store.state.layout.drawerMini"
            outlined
            @click.stop="$store.commit('toggleDrawerMini')"
          >
            <v-icon small>
              {{
                $store.state.layout.drawerMini
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
.drawer-border {
  border-right: 2px solid #2979FF;
}
</style>