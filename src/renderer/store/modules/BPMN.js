import moment from 'moment';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import diagram from '../../assets/scratch.bpmn';

// eslint-disable-next-line
const { dialog, app } = require('electron').remote;
const fs = require('fs');

export default {
  namespaced: true,
  state: {
    diagram,
    modeler: null,
    hasDiagram: false,
  },
  mutations: {
    diagram(state, payload) {
      state.diagram = payload;
    },
    modeler(state, payload) {
      state.modeler = payload;
    },
    hasDiagram(state, payload) {
      state.hasDiagram = payload;
    },
  },
  getters: {
    modeler: state => state.modeler,
  },
  actions: {
    /**
     * Inicia o BPMN Modeler
     * @param {object} context contexto do store
     * @param {string} container query selector do container
     */
    initModeler(context, container) {
      return new Promise((resolve) => {
        const modeler = new BpmnModeler({ container });
        context.commit('modeler', modeler);
        resolve(context.getters.modeler);
      });
    },

    /**
     * Cria um novo diagrama com o modelo padrão
     * @param {object} context contexto do Store
     */
    createDiagram(context) {
      const fromDisk = window.localStorage.getItem('diagram');
      context.commit('hasDiagram', true);
      context.dispatch('openDiagram', fromDisk || diagram);
    },

    /**
     * Abre um diagrama com o modelo informado
     * @param {object} context contexto do Store
     * @param {string} xml valor do xml
     */
    openDiagram(context, xml) {
      context.commit('diagram', xml);
      context.getters.modeler.importXML(xml, (err) => {
        // TODO: error handler
        if (err) throw err;
      });
    },
    downloadData(context, { name, type, data }) {
      const encondedData = encodeURIComponent(data);
      const url = `data:application/bpmn20-xml;charset=UTF-8,${encondedData}`;
      const file = `${name}.${type}`;

      const link = document.createElement('a');
      link.download = file;
      link.href = url;
      link.click();
    },
    saveXML(context, options) {
      context.state.modeler.saveXML({ format: options.format }, (err, xml) => {
        if (err) throw err;

        /**
         * Salva localmente o diagrama
         */
        function saveLocal() {
          const set = (name, value) => window.localStorage.setItem(name, value);
          set('diagram', xml);
          set('lastDate', moment().format('DD/MM/YYYY [às] hh:mm'));
        }

        /**
         * Abre o diálogo de 'save as' para o usuário escolher
         * como salvar
         */
        function saveDialog() {
          dialog.showSaveDialog(null, {
            defaultPath: `${app.getPath('documents')}/diagrama_${moment().format('YYYY-MM-DD-hhmmss')}.bpmn`,
            buttonLabel: 'Salvar XML',
          }, (path) => {
            try {
              if (path) {
                fs.writeFileSync(path, xml);
              }
            } catch (err) {
              dialog.showMessageBox({
                message: 'Erro ao salvar o arquivo',
                type: 'error',
                title: 'Erro',
                detail: err.message,
              });
            }
          });
        }

        options.local
          ? saveLocal()
          : saveDialog();
      });
    },
    saveSVG(context) {
      context.state.modeler.saveSVG((err, svg) => {
        if (err) throw err;

        dialog.showSaveDialog(null, {
          defaultPath: `${app.getPath('documents')}/diagrama_${moment().format('YYYY-MM-DD-hhmmss')}.svg`,
          buttonLabel: 'Salvar SVG',
        }, (path) => {
          try {
            if (path) {
              fs.writeFileSync(path, svg);
            }
          } catch (err) {
            dialog.showMessageBox({
              message: 'Erro ao salvar o arquivo',
              type: 'error',
              title: 'Erro',
              detail: err.message,
            });
          }
        });
      });
    },
  },
  modules: {
    Interface: {
      namespaced: true,
      state: {
        upload: false,
      },
      getters: {
        upload: state => state.upload,
      },
      mutations: {
        upload(state, payload) {
          state.upload = payload;
        },
      },
      actions: {
        upload(context, payload) {
          context.commit('upload', payload);
        },
      },
    },
  },
};
