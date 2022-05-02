import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios';
import es from 'vuetify/es5/locale/es';

Vue.config.productionTip = false

Vue.config.productionTip = false;

vuetify.framework.lang.current = "es";
vuetify.framework.lang.locales = {es};

//axios.defaults.baseURL = 'http://192.168.100.21:3000/';
axios.defaults.baseURL = 'http://localhost:33594/';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
