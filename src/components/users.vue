<template>
  <div>
   <NavBar></NavBar>
      <div>
      <router-view></router-view>
      </div>
    <h2> Pagina de usuarios </h2>     
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>          
          <th>Correo</th>                
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Telefono</th>
          <th>Mensaje</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="persona in users" :key="persona.id">
            <td>{{persona.id}}</td>
            <td>{{persona.email}}</td>                    
            <th>{{persona.name}}</th>
            <th>{{persona.surname}}</th>
            <th>{{persona.phone}}</th>
            <th>{{persona.msj}}</th>
             <button v-on:click="deleteId(persona.id)">Borrar</button>
        </tr>
      </tbody>
      
      </table> 
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
      users: {
        id: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        phone: '',
        msj: ''

      }
               
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
                this.users=response.data;
                
            })
            .catch((error)=> {
              this.flashMessage.show({status: 'error', tittle: MyApp, message: 'Error:'+error});
               // document.form.reset();
            });
        },
        deleteId(id){

          let config = {
               headers: {
                  Authorization: this.userToken
              }
          };
          console.log(id);
           axios
          .delete(Global.url_users_delete+id,config)
          .then( (response)=>{
              if(response.status==200){
              console.log(response.data);

                this.flashMessage.show({status: 'success', tittle: MyApp, message: 'El id '+ id +' se dio de borro'});
              this.getAllUsers();        
              }

            })
            .catch((error)=> {
              this.flashMessage.show({status: 'error', tittle: MyApp, message: 'Los datos ingresados son son validos. Error:'+error});
                document.form.reset();
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