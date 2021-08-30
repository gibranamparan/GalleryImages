import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { default as axios, AxiosStatic } from "axios";

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// Declaring global variables
declare module "vue/types/vue" {
  interface Vue {
      $http: AxiosStatic
  }
}

const baseURL = "http://interview.agileengine.com"
//const token = "604f5ba61ddc12726c12516870bc6452ae3c1733";
const token = "b438d41075adf6258ad5eff7a727f3d678d7dbc8";

axios.defaults.baseURL = baseURL;
axios.defaults.headers = { "Content-Type": "application/json" };
axios.defaults.headers.Authorization = `Bearer ${token}`;


Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
