<template>
  <div >
    <NavBar></NavBar>
      <div>
      <router-view></router-view>
      </div>
    <h2> {{this.appName}} {{this.appVersion}} </h2>   
    <h6> {{this.appBackEnd}}  </h6>  
    <h6> {{this.appFrontEnd}}  </h6>  
    
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

<style>

@import '../assets/css/bootstrap.css';
</style>

