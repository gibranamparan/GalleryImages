import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { default as axios, AxiosStatic, AxiosAdapter, AxiosRequestConfig, AxiosError } from "axios";

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
//axios.defaults.headers.Authorization = `Bearer ${token}`;


const requestHandler: AxiosAdapter = (config: AxiosRequestConfig): any => {
  if (!config.headers.Authorization ||
      config.headers.Authorization == "Bearer " ||
      config.headers.Authorization == "Bearer Unknown") {
      return new Promise((resolve, reject) => 
        fetch(`${baseURL}/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ "apiKey": "23567b218376f79d9415" })
        })
        .then(res => res.json())
        .then(res => {
          if(res?.auth){
              axios.defaults.headers.Authorization = `Bearer ${res.token}`;
              config.headers.Authorization = axios.defaults.headers.Authorization;
              return resolve(config);
          }
        })
        .catch(err => reject(err))
      );
  }
  return config;
};

const errorHandler = (err: AxiosError): any => {
    if (err?.response?.status == 401) {
        const config = err.response.config;
        return new Promise((resolve, reject) => 
          fetch(`${baseURL}/auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ "apiKey": "23567b218376f79d9415" })
          })
          .then(res => res.json())
          .then(res => {
            if(res?.auth){
                axios.defaults.headers.Authorization = `Bearer ${res.token}`;
                config.headers.Authorization = axios.defaults.headers.Authorization;
                return resolve(config);
            }
          })
          .catch(err => reject(err))
        );
    }
    return Promise.reject(err);
};

// make sure we setup headers for initial requests.
axios.interceptors.request.use(requestHandler);
axios.interceptors.response.use((response) => response, (err: AxiosError) => errorHandler(err));
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
