<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
      >
        <v-list>
          <v-list-tile 
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar
        fixed
        app
        :clipped-left="clipped"
        style="-webkit-app-region: drag"
        color="secondary"
        dark
        >
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>

        <v-toolbar-title v-html="title"></v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-btn icon @click="minimize">
          <v-icon>remove</v-icon>
        </v-btn>
        <v-btn icon @click="close">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      
      <v-content>
        <v-container fluid fill-height grid-list-lg>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>

      <v-navigation-drawer
        temporary
        fixed
        :right="right"
        v-model="rightDrawer"
        app
      >
        <v-list>
          <v-list-tile @click.native="right = !right">
            <v-list-tile-action>
              <v-icon light>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>

<script>
// eslint-disable-next-line
const remote = require('electron').remote;

const currentWindow = remote.getCurrentWindow();

export default {
  name: 'molecule',
  data: () => ({
    clipped: false,
    drawer: false,
    fixed: false,
    items: [
      { icon: 'apps', title: 'Início', to: '/' },
      { icon: 'bubble_chart', title: 'Sobre', to: '/about' },
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: 'Batata <span style="font-weigh: 300">2.0</span>',
  }),

  methods: {
    minimize() {
      currentWindow.minimize();
    },
    close() {
      currentWindow.close();
    },
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
