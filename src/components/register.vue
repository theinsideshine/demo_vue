<template>
    <div>
      <NavBar></NavBar>
      <div>
      <router-view></router-view>
      </div>

      <body class="text-center">
        
      
        <h2>Por favor ingrese sus datos</h2>

       

        <form   name="form" id="form" v-on:submit.prevent="process();">       
        <div class="row">
          <div class="col-4"></div>
          <div class="col-4">
              <p>
                Nombre: <input type="text" name="nombre" placeholder="Nombre" class="form-control" v-model="contact.name"/>
              </p>
              <div v-if="submited && !$v.contact.name.required">El campo nombre es obligatorio</div>
              <div v-if="submited && !$v.contact.name.minLength">El campo nombre debe tener al menos 3 caracteres</div>
          </div>
        </div> 

        <div class="row">
          <div class="col-4"></div>
          <div class="col-4">
            <p>
              Apellido: <input type="text" name="apellido" placeholder="Apellido" class="form-control" v-model="contact.surname"/>
            </p>
            <div v-if="submited && !$v.contact.surname.required">El campo apellido es obligatorio</div>
            <div v-if="submited && !$v.contact.surname.minLength">El campo apellido debe tener al menos 3 caracteres</div>
          </div>
        </div>

        <div class="row">
          <div class="col-4"></div>
          <div class="col-4">
            <p>
              Email: <input type="text" name="email" placeholder="Correo" class="form-control"  v-model="contact.email"/>
            </p>
            <div v-if="submited && !$v.contact.email.required">El campo correo es obligatorio</div>
            <div v-if="submited && !$v.contact.email.minLength">El campo correo debe tener al menos 3 caracteres</div>
          </div>
        </div>

        <div class="row">
          <div class="col-4"></div>
          <div class="col-4">
            <p>
              Contraseña: <input type="password" name="password" placeholder="Contraseña" class="form-control"  v-model="contact.password"/>
            </p>
            <div v-if="submited && !$v.contact.password.required">El campo contraseña es obligatorio</div>
            <div v-if="submited && !$v.contact.password.minLength">El campo contraseña debe tener al menos 6 caracteres</div>
          </div>
        </div>

        <div class="row">
          <div class="col-4"></div>
          <div class="col-4">
            <p>
              Telefono: <input type="text" name="telefono" placeholder="Telefono" class="form-control"  v-model="contact.phone" />
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-4"></div>  
          <div class="col-4">
            <p>
              Mensaje: <textarea name="mensaje" id="mensaje" cols="30" rows="2" placeholder="Mensaje" class="form-control"  v-model="contact.msj" >
                        </textarea>
            </p>
            <div v-if="submited && !$v.contact.msj.maxLength">El mensaje debe tener al maximo 254 caracteres</div>
          </div>
        </div>

        <div class="row">
          <div class="col-4"></div> 
          <div class="col-4">
            <hr/>
            <input type="submit" value="Enviar" title="Enviar" class="btn btn-primary">
          </div>
        </div>

        </form>
        <FlashMessage></FlashMessage>
       </body>

    </div>
    
</template>


<script>
import {Global,  MyApp} from '../Global';
import axios from 'axios';
import NavBar from '../components/navbar.vue';
import {
        required,
        minLength,
        maxLength,
        email
        
    } from 'vuelidate/lib/validators'
export default {
  
  name: 'register',
  components: { NavBar },
  data(){
    return {
      submited: false,
      contact:{
        name: '',
        surname: '',
        email: '',
        password: '',
        phone: '',
        msj: ''
      }
    }
  },
  methods: {
    process(){

      
      this.submited = true;
      this.$v.$touch();
      if (this.$v.$invalid){
        console.log("Faltan datos")
        return false;
      }
      
      let parameters = {
        email: this.contact.email,
        password: this.contact.password,
        name: this.contact.name,
        surname: this.contact.surname,
        phone: this.contact.phone,
        msj: this.contact.msj
        };
      
      axios
      .post(Global.url_register,parameters)
      .then( (response)=>{
        if(response.status==200){
        console.log(response.data);

          this.flashMessage.show({status: 'success', tittle: MyApp, message: 'El usuario '+ this.contact.email+' se dio de alta'});
          document.form.reset();
          this.$router.push({ path: 'register', query: { plan: 'private' }});       
        }

      })
      .catch((error)=> {
         this.flashMessage.show({status: 'error', tittle: MyApp, message: 'Los datos ingresados son son validos. Error:'+error});
          document.form.reset();
      });
    }
  },
    validations: {
      contact:{
        name: {
          required,
          minLength: minLength(3)
         },
          surname: {
          required,
          minLength: minLength(3)
         },
         email: {
          required,
          minLength: minLength(3),
          email
         },
         password: {
          required,
          minLength: minLength(6)
          
         },
         msj: {

          maxLength: maxLength(254)
          
         }
         
      }
    }
}

</script>


