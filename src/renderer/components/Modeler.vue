<template>
  <div id="container" ref="container">
    <div id="canvas"></div>
     <v-speed-dial
      v-model="fab"
      bottom
      right
      direction="top"
      open-on-hover
      transition="slide-y-transition"
      style="position: absolute;"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="secondary"
        dark
        fab
      >
        <v-icon>save</v-icon>
      </v-btn>
      <v-tooltip left>
        <v-btn
          slot="activator"
          fab
          dark
          small
          color="secondary"
          @click="$store.dispatch('BPMN/saveSVG')"
        >
          <v-icon>image</v-icon>
        </v-btn>
        Arquivo SVG
      </v-tooltip>
      <v-tooltip left>
        <v-btn
          slot="activator"
          fab
          dark
          small
          color="secondary"
          @click="$store.dispatch('BPMN/saveXML', { local: false })"
        >
          <v-icon>file_copy</v-icon>
        </v-btn>
        Arquivo BPMN
      </v-tooltip>
    </v-speed-dial>
  </div>
</template>

<script>
export default {
  name: 'BPMN',

  data: () => ({
    fab: false,
  }),

  methods: {
    /**
     * remover o icone de crédito do footer
     * TODO: exibir os créditos em algum outro lugar
     */
    removePoweredBy() {
      const element = document.querySelectorAll('.bjs-powered-by')[0];
      const parent = document.querySelectorAll('.bjs-container')[0];

      parent.removeChild(element);
    },
  },

  mounted() {
    const container = '#canvas';
    this.$store
      .dispatch('BPMN/initModeler', container)
      .then(() => {
        this.$store.dispatch('BPMN/createDiagram');
        this.removePoweredBy();
      });

    this.$store.getters['BPMN/modeler']
      .on(
        'commandStack.changed', () => {
          this.$store
            .dispatch('BPMN/saveXML', { local: true });
        },
      );
  },
};
</script>

<style lang="scss">
#container {
  height: calc(100% + 48px);
  width: calc(100% + 48px);
  margin: -24px;
}

#canvas {
  height: 100%;
}

.bjs-powered-by {
  display: none;
}

.djs-palette {
  width: 70px!important;
  padding: 0 10px;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #424242;
  border-color: #424242;
  color: #ffffff;
  border-radius: 0;
  box-shadow: 0 0 10px rgba(#424242, .9);
  z-index: 2;
  transition: .25s ease;
}

.djs-palette .entry, .djs-palette .djs-palette-toggle {
  color: #ffffff;
}

.djs-palette .entry:hover {
  color: #ffcc35;
}

.djs-palette .highlighted-entry {
  color: #ffc107!important;
}

@media screen and (max-height: 715px) {
  .djs-palette {
    width: 96px!important;
    padding: 0;
  }
}
</style>