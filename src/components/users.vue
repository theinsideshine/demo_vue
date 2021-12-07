<template>
  <div>
   <NavBar></NavBar>
      <div>
      <router-view></router-view>
      </div>
    <h2> Pagina de usuarios </h2>     
    <table class="table table-bordered ">
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
        <tr v-for="user in users" :key="user.id">
            <td>{{user.id}}</td>
            <td>{{user.email}}</td>                    
            <td v-if="tagEditingId == user.id">
              <input type="text" v-model="user.name"> 
            </td>
            <td v-else @click="setToEditing(user)">
              {{user.name}} 
            </td>
             <td v-if="tagEditingId == user.id">
              <input type="text" v-model="user.surname"> 
            </td>
            <td v-else @click="setToEditing(user)">
              {{user.surname}} 
            </td>
            <td v-if="tagEditingId == user.id">
              <input type="text" v-model="user.phone"> 
            </td>
            <td v-else @click="setToEditing(user)">
              {{user.phone}} 
            </td>

             <td v-if="tagEditingId == user.id">
              <input type="text" v-model="user.msj"> 
            </td>
            <td v-else @click="setToEditing(user)">
              {{user.msj}} 
            </td>
             <b-button-group>
              <b-button  variant="outline-secondary" v-on:click="deleteUser(user.id)">Borrar</b-button>
              <b-button  variant="outline-secondary" v-on:click="setToEditing(user)">Editar</b-button>
              <b-button  variant="outline-secondary" v-on:click="updateUser(user)">Guardar</b-button>
             </b-button-group>
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
      tagEditingId: '0',
      users: {
        id: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        phone: '',
        msj: '',
        creationDate: ''
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
            .get(Global.url_users_list,config)
            .then((response)=>{
               console.log(response);
               this.users =response.data;
              
                
                
            })
            .catch((error)=> {
              this.flashMessage.show({status: 'error', tittle: MyApp, message: 'Error:'+error});
               
            });
        },
        deleteUser(id){

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

                this.flashMessage.show({status: 'success', tittle: MyApp, message: 'El id:'+ id +' se  borro'});
              this.getAllUsers();        
              }

            })
            .catch((error)=> {
              this.flashMessage.show({status: 'error', tittle: MyApp, message: 'Los datos ingresados son son validos. Error:'+error});
                document.form.reset();
            });
        },
        updateUser(tag){

          let config1 = {
               headers: {
                  Authorization: this.userToken
              }
          };
          console.log('el users es: '+ tag);
           axios
          .put(Global.url_users_update,tag,config1)
          .then( (response)=>{
              if(response.status==200){
              console.log(response.data);

              this.flashMessage.show({status: 'success', tittle: MyApp, message: 'El usuario:'+ tag.name +' se guardo'});
               this.tagEditingId = '0'; // Desactiva la edicon de inline        
              }

            })
            .catch((error)=> {
              this.flashMessage.show({status: 'error', tittle: MyApp, message: 'Los datos ingresados son son validos. Error:'+error});
               // document.form.reset();
            });
        },
        setToEditing(tag){
          this.tagEditingId = tag.id;
         
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

