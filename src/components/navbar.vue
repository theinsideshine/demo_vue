<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <span
          class="navbar-brand mb-0 h1">
          <img 
          class="d-inline-block align-center" 
          src="../assets/images/logo_mb.png" alt="logo_mb"
          width="100" height="50"/>
           
        </span>
        <div class="collapse navbar-collapse"
             id="navbarNav">
             <ul class="navbar-nav">
               <li class="nav-item active">
                  <router-link class="nav-link active" to="/home"  title="home">Inicio</router-link>
               </li>

               <li v-if="!userLogged" class="nav-item active"> 
                  <router-link to="/login" class="nav-link" title="login" >Entrar</router-link>
                </li>
                

              <li   class="nav-item active">
               <router-link to="/register" class="nav-link" title="register">Registro</router-link>
               </li>

                <li   class="nav-item active">
                  <router-link to="/weather" class="nav-link" title="weather">Clima</router-link>
                </li>

                 <li   class="nav-item active">
                  <router-link to="/users" class="nav-link" title="users">Usuarios</router-link>
                </li>


             </ul>
             
         </div>
          <div class="navbar-right">
              <p class="text-light" v-if="userLogged"> Hola {{userLogged}} </p>
              <b-button variant="outline-secondary text-light " v-if="userLogged"  v-on:click="logout">Salir</b-button>
          </div>  
    </nav>  

    


    
  </div>
</template>

<script>
import auth from '../components/auth'

export default {
  name: 'NavBar',
  components: {
   
  },  
  mounted(){
   
  },
  computed: {
    userLogged() {
      return auth.getUserLogged();
    }
  },
    methods: {
      logout (){
        auth.deleteAll();        
        this.$router.push('/home');
      }
   }
   
}
</script>