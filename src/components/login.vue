<template>
  <div >
    <NavBar></NavBar>
      <div>
      <router-view></router-view>
      </div>
      <h2>Formulario de logueo </h2>    
      <form name="form" id="form" v-on:submit.prevent="process();">
        <!-- Email input -->
        <div class="col-md-4">
                <p>
                  Email: <input type="text" name="email" placeholder="Email" class="form-control"  v-model="contact.email"/>
                </p>
                <div v-if="submited && !$v.contact.email.required">El campo correo es obligatorio</div>
                <div v-if="submited && !$v.contact.email.minLength">El campo correo debe tener al menos 3 caracteres</div>
              </div>

        <div class="col-md-4">
                  <p>
                    Contraseña: <input type="password" name="contraseña" placeholder="Contraseña" class="form-control"  v-model="contact.password"/>
                  </p>
                  <div v-if="submited && !$v.contact.password.required">El campo contraseña es obligatorio</div>
                  <div v-if="submited && !$v.contact.password.minLength">El campo contraseña debe tener al menos 6 caracteres</div>
                </div>
          
        <div class="col-md-4">
          <hr/>
          <input type="submit" value="Enviar" title="Enviar" class="btn btn-primary">
        </div>  
      </form>
      <FlashMessage></FlashMessage>
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

<style>

@import '../assets/css/bootstrap.css';
</style>