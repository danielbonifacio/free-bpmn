<template>
  <div style="height: 100%">
    <v-layout row wrap>
      <v-flex md6 class="">
        <v-card color="secondary" dark class="pa-3">
          <v-layout row align-end>
            <v-flex xs8 class="pr-3">
              <div class="headline">Novo</div>
              <div class="body-2">Criar novo modelo de processo a partir do zero</div>
            </v-flex>
            <v-flex xs4>
              <v-layout>
                <v-spacer/>
                <v-btn color="accent" class="primary--text mx-0 mb-0" @click="newModeler">Criar</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex md6 class="">
        <v-card color="accent" class="pa-3">
          <v-layout row align-end>
            <v-flex xs8 class="pr-3">
              <div class="headline">Existente</div>
              <div class="body-2">Continuar a trabalhar em cima de um modelo existente</div>
            </v-flex>
            <v-flex xs4 d-flex justify-end>
              <v-btn
                color="primary"
                class="white--text"
                @click="state = true">
                Selecionar
                <v-icon small>attach_file</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex md6 v-if="hasPrevious">
        <v-card color="secondary" dark class="pa-3">
          <v-layout row wrap align-end>
            <v-flex xs8 class="pr-3">
              <div class="headline">Continuar</div>
              <div class="body-2 mb-3">Continuar a trabalhar no modelo que estava aberto anterirormente.</div>
              <div class="body-2">{{ previous.date }}</div>
            </v-flex>
            <v-flex xs4>
              <v-layout>
                <v-spacer/>
                <v-btn color="accent" class="primary--text mx-0 mb-0" @click="$router.push({ name: 'Modeler' })">Continuar</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="state"
      max-width="600px"
    >
      <UploadButton title="Browse" :selectedCallback="handleUpload"/>
    </v-dialog>
  </div>
</template>

<script>
import UploadButton from './UploadButton';

const { dialog } = require('electron').remote;

export default {
  name: 'welcome',
  components: {
    UploadButton,
  },
  computed: {
    hasPrevious() {
      return window.localStorage.getItem('diagram') !== null;
    },

    previous() {
      return ({
        date: window.localStorage.getItem('lastDate'),
      });
    },
  },
  data: () => ({
    state: false,
  }),
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    newModeler() {
      dialog.showMessageBox({
        type: 'question',
        buttons: ['Descartar', 'Cancelar'],
        message: 'Descartar diagrama antigo?',
        detail: 'Encontrei um diagrama na memória. Se você criar um novo diagrama, o atingo irá ser sobescrito.',
      }, (response) => {
        if (response === 0) {
          window.localStorage.setItem('diagram', require('../assets/scratch.bpmn'));
          this.$router.push({ name: 'Modeler' });
        }
      });
    },
    handleUpload(e) {
      const reader = new FileReader();
      reader.onload = () => {
        const xml = reader.result;
        window.localStorage.setItem('diagram', xml);
        this.$router.push({ name: 'Modeler' });
      };
      reader.readAsText(e);
    },
  },
};
</script>
