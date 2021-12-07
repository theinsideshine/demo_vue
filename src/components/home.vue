<template>
  <div >
    <NavBar></NavBar>
      <div>
      <router-view></router-view>
      </div>
      <b-alert class="text-center m0" show> {{this.appName}} {{this.appVersion}} </b-alert>
      <b-alert class="text-center" variant="success" show>{{this.appBackEnd}} </b-alert>
      <b-alert class="text-center"  show> {{this.appFrontEnd}} </b-alert>        

    
  </div>

</template>

<script>
import {MyApp} from '../Global';
import auth from "./auth";
import NavBar from '../components/navbar.vue';


export default {
  name: 'home',
 
  data() {
    return {
      appVersion : MyApp.version,
      appName     : MyApp.name,
      appBackEnd  : MyApp.backEnd,
      appFrontEnd : MyApp.frontEnd

      }
  },
  computed: {
    userLogged() {
      return auth.getUserLogged();
    }
  },
  components: { NavBar }
  
}

  </script>


