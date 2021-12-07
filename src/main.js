import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import FlashMessage from '@smartweb/vue-flash-message';

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Importar los archivos CSS de Bootstrap y BootstrapVue (el orden es importante)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Haz que BootstrapVue esté disponible en todo tu proyecto
Vue.use(BootstrapVue);
// Opcionalmente, instale el plugin de componentes de iconos BootstrapVue
Vue.use(IconsPlugin);

import HomeComponent from './components/home.vue';
import RegisterComponent from './components/register.vue';
import LoginComponent from './components/login.vue';
import WeatherComponent from './components/weather.vue';
import UserComponent from './components/users';

Vue.config.productionTip = false

Vue.use(FlashMessage/*, {
  messageOptions: {
    timeout: 1000,
   
  }
}*/);

Vue.use(VueRouter);
Vue.use(Vuelidate);

const routes = [
  { path:'/', redirect: 'home'},
  { path:'/home', name: 'home', component: HomeComponent },
  { path:'/register', name: 'register', component: RegisterComponent },
  { path:'/login', name: 'login', component: LoginComponent },
  { path:'/weather', name: 'weather', component: WeatherComponent },
  { path:'/users', name: 'users', component: UserComponent }
];

const router = new VueRouter ({routes, mode: 'history'}); 


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
