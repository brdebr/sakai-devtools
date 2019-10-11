import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        layout: {
            drawer: true,
            drawerMini: true,
            drawerItems: [
                {
                    id: 1,
                    name: 'The chosen one',
                    path: 'C:\\victory'
                },
                {
                    id: 2,
                    name: 'The second one',
                    path: 'D:\\victory'
                },
                { 
                    id: 3,
                    name: 'The third one',
                    path: 'A:\\floppy disk'
                }
            ]
          }
    },
    mutations: {
        toggleDrawer(state) {
            state.layout.drawer = !state.layout.drawer
        },
        toggleDrawerMini(state) {
            state.layout.drawerMini = !state.layout.drawerMini
        },
        setDrawer(state, val) {
            state.layout.drawer = val
        },
        setDrawerItems(state, val) {
            state.layout.drawerItems = val
        },
        addDrawerItem(state, val) {
            state.layout.drawerItems.push(val)
        }
    },
    actions: {
    },
});