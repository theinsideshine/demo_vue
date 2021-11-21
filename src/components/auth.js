import axios from "axios";
import {Global} from '../Global';


export default {

    setUserLogged(userLogged) {
        sessionStorage.setItem("userLogged", userLogged);
      },
      getUserLogged(){
        
         return sessionStorage.getItem("userLogged");
      },
      setToken(token) {
        sessionStorage.setItem("token", token);
      },
      getToken() {
        return sessionStorage.getItem("token");
      },
      deleteUserLogged() {
        sessionStorage.removeItem('userLogged');
      },
      deleteAll() {
        sessionStorage.removeItem('userLogged');
        sessionStorage.removeItem('token');
      },

    register (email, password){
        const user = {email ,password};
        return axios.post(Global.url_register,user);
    },
    login (email, password){
        const user = {email ,password};
        return axios.post(Global.url_login,user);
    }

};