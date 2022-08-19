<template> 
<nav class="navbar navbar-dark navbar-expand-lg bg-dark fixed-top " id="he">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">SmrtCheez</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" right="18rem">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      
        <li class="nav-item" v-on:click="Inicio()">
              <router-link to="/inicio"><a class="nav-link active" aria-current="page" href="#" ><svg xmlns="http://www.w3.org/2000/svg" id="iconolog" width="20" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
            <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
          </svg>
   Inicio</a></router-link>
          
        </li>
      </ul>
      <div class="dropdown">
        <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" value="Iniciar Sesion">
        {{user}}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <router-link to="/perfil"><a class="dropdown-item" href="#">Perfil</a></router-link>
        <router-link to="/Principal"><a class="dropdown-item" href="#" v-on:click="Logout()">Cerrar Sesion</a></router-link>
      </div>
      </div>
    </div>
  </div>
  <router-view/>
</nav>
</template>

<script>
import axios from 'axios'
export default {
  name:"Navbar",
  components:{

  },
  data: function(){
    return {
      user: null
    }
  },
  methods:{
    Logout(){
      localStorage.clear();
      
    },
    Inicio(){
      this.$router.push('Inicio')
    }
  },
  mounted: function(){
    let direccion = "http://18.144.45.33:3333/api/v1/users/user";
    axios.get(direccion,{
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then (data =>{
      this.user = data.data.fname +" "+ data.data.lname
      
    })
  }
}
</script>

<style>
.dropdown{
  text-align: right;
}
#he{
  font-size: 13px;
}


</style>