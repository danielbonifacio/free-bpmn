import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';

import Window from './Window';
import router from './router';
import store from './store';

Vue.use(Vuetify, {
  theme: {
    primary: '#616161',
    secondary: '#424242',
    accent: '#FFCA28',
    error: '#FF8A65',
    warning: '#FB8C00',
    info: '#2196f3',
    success: '#4caf50',
  },
});
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { Window },
  router,
  store,
  template: '<Window/>',
}).$mount('#app');
