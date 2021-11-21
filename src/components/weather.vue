<template>
  <div>
   <NavBar></NavBar>
      <div>
      <router-view></router-view>
      </div>
    <h2> Pagina del clima </h2> 
   
   
     

  </div>

  

</template>

<script>
import axios from 'axios';
import auth from "./auth";
import NavBar from '../components/navbar.vue';

export default {
  name: 'weather',
   components: { NavBar },
 
  data() {
    return {
      Apikey: "29046abedc6759780d339d28d50c93a2",
      city: "Dallas",
      name: ''
     
      }
    },
    created(){
     
      if (this.userLogged){
        console.log('logeado');
       this.getCurrentWeather();
      }else {
       this.$router.push("/login");
        console.log('no logeado');
        
      }
        
    },
    methods: {
        getCurrentWeather(){
            axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.Apikey}`)
            .then((res)=>{
                console.log(res.data);
            });
        }        
    },
    computed: {
      userLogged() {
        return auth.getUserLogged();
      }
    }  
  
}

  </script>

<style>

@import '../assets/css/bootstrap.css';
</style>