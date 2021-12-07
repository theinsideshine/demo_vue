<template>
  <div >
    <NavBar></NavBar>
      <div>
      <router-view></router-view>
      </div>
        
      <body  class="text-center">
      
        <form class="form-signin" name="form" id="form" v-on:submit.prevent="process();">
          <img class="mb-4 l" src="../assets/images/logo_mb.png" alt="" width="200" height="100">
          <h1 class="h3 mb-3 font-weight-normal">Ingrese sus credenciales</h1>         
          <div class="row"  >
            <div class="col-5"> </div>
            <div class="col-2">     
              <label for="inputEmail" class="sr-only">Email address</label>          
              <input type="text" name="email" placeholder="Direccion de correo" class="form-control" required autofocus v-model="contact.email"/>
              
              <div v-if="submited && !$v.contact.email.required">Es obligatorio</div>
              <div v-if="submited && !$v.contact.email.minLength">Debe tener al menos 3 caracteres</div>
              <div v-if="submited && !$v.contact.email.email">Debe tener formato de correo</div>
            </div>
          </div>          

          <div class="row"  >
            <div class="col-5"> </div>
            <div class="col-2">
              <label for="inputPassword" class="sr-only">Contraseña</label>
              <input type="password" id="inputPassword" class="form-control" placeholder="Password" required  v-model="contact.password">
              <div v-if="submited && !$v.contact.password.required">Es obligatorio</div>
              <div v-if="submited && !$v.contact.password.minLength">Al menos 6 caracteres.</div>
            </div>
          </div> 
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"> Recuerdame
            </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
          <p class="mt-5 mb-3 text-muted">&copy; MBSOFT-2021</p>
        </form>
        <FlashMessage></FlashMessage>
    </body>


  </div>
  
</template>

<script>
import NavBar from '../components/navbar.vue';
import { MyApp} from '../Global';
import auth from "./auth";
import {
        required,
        minLength,        
        email
        
    } from 'vuelidate/lib/validators'
export default {
  name: 'login',
   components: { NavBar },
 data(){
    return {
      submited: false,
      contact:{
        email: '',
        password: ''
        
      }
    }
  },
  methods: {
    async process(){
      this.submited = true;
      this.$v.$touch();
      if (this.$v.$invalid){
        console.log("nones")
        return false;
      }
      
      try {
          const response = await auth.login(this.contact.email,this.contact.password);

            if(response.status==200){
            console.log(response.data);      

              this.flashMessage.show({status: 'success', tittle: MyApp, message: 'El usuario '+ this.contact.email+' se logueado exitosamente.'});
              
             auth.setToken(response.data.token);
             auth.setUserLogged(response.data.name);              
            setTimeout( () => this.$router.push({ path: '/weather'}), 1500);
             
            }
          }catch(error) {
            this.flashMessage.show({status: 'error', tittle: MyApp, message: 'Los datos ingresados son son validos. Error:'+error});
            document.form.reset();
          }      
    }
  },
  validations: {
      contact:{
        
         email: {
          required,
          minLength: minLength(3),
          email
         },
         password: {
          required,
          minLength: minLength(6)
          
         }
         
      }
    }
 
}
</script>

<style >

body{
  background-color:#f5f5f5
}
  
</style>
