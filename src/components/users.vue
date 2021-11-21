<template>
  <div>
   <NavBar></NavBar>
      <div>
      <router-view></router-view>
      </div>
    <h2> Pagina de usuarios </h2>      
    <FlashMessage></FlashMessage>
  </div>

   


</template>

<script>
import axios from 'axios';
import auth from "./auth";
import NavBar from './navbar.vue';
import {Global,  MyApp} from '../Global';

export default {
  name: 'users',
   components: { NavBar },
 
  data() {
    return {
      
    }
  },
    created(){
     
      if (this.userLogged){
        console.log('logeado');
         this.getAllUsers();
      }else {
       this.$router.push("/login");
        console.log('no logeado');
        
      }
        
    },
    methods: {
        getAllUsers(){
          let config = {
               headers: {
                  Authorization: this.userToken
              }
         
            };
            console.log(config);
            axios
            .get(Global.url_users,config)
            .then((response)=>{
                console.log(response.data);
            })
            .catch((error)=> {
              this.flashMessage.show({status: 'error', tittle: MyApp, message: 'Error:'+error});
               // document.form.reset();
            });
        }        
    },
    computed: {
      userLogged() {
        return auth.getUserLogged();
      },
      userToken() {
        return auth.getToken();
      }
    }  
  
}

  </script>

<style>

@import '../assets/css/bootstrap.css';
</style>