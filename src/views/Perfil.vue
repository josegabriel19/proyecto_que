<template>
<navbar/>
<br>
<div class="container" name="co" id="co">
<h1>Perfil<span class="badge badge-success">Usuario</span></h1>
<br>
<br>
<form v-on:submit.prevent ="update" >
  <div class="form-group">
    <label for="exampleInputEmail1"><h4><span class="badge badge-primary">Correo</span></h4></label>
    <input type="text" class="form-control w-50" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Correo Electronico" v-model="form.email">
  </div>
  <div class="form-group left">
    <label for="exampleInputPassword1"><span class="badge badge-primary">Contraseña</span></label>
    <input type="password" class="form-control in" id="exampleInputPassword1" placeholder="Contraseña" :value="password" >
  </div>
  <div class="form-group" style="justify-content: center;">
    <label for="exampleInputPassword1"><h4><span class="badge badge-primary">Nombre</span></h4></label>
    <input  type="text" class="form-control w-50" id="exampleInputPassword1" placeholder="Nombre"  v-model="form.fname" >
  </div>
  <div class="form-group" name="ape" id="ape">
    <label class="control-label" for="exampleInputPassword1"><h4><span class="badge badge-primary">Apellido</span></h4></label>
    <input type="Text" class="form-control w-50" name="Ap" id="Ap" placeholder="Apellido"  v-model="form.lname">
  </div>
  <div class="alert alert-success" role="alert">
  {{mensaje}}
  </div>
  <br>
    <input type="submit" class="fadeIn fourth bg-warning" value="Actualizar Perfil" v-on:click="update()">

</form>
</div>
</template>

<script>

import perfil from '@/components/Perfil.vue';
import navbar from '@/components/Navbar.vue';
import axios from 'axios';
export default {
    name: "perfil",
    components:{
        perfil,
        navbar
    },
    data: function(){
    return {
        form:{
          "fname":"",
          "lname":"", 
          "email": ""
        },
        password:null,
        mensaje:null
      }    
    },
  methods:{ 
    update(){
      let response = "http://18.144.45.33:3333/api/v1/users/update";
      axios.put(response, this.form,{
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(data =>{
        if (data.statusText == 'OK'){
          location.reload();
          this.mensaje = data.data.message 
        }
      console.log(data)
      });
  }
},
    mounted:function(){
    this.id_Queseria = this.$route.params.id;
    let direccion = "http://18.144.45.33:3333/api/v1/users/user";
    axios.get(direccion,{
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then (data =>{

      this.form.fname = data.data.fname
      this.form.lname = data.data.lname
      this.form.email = data.data.email
      this.password  = data.data.password
    })
  }

}
</script>

<style>
.left{
text-align: left;
}
.in{
  text-align: center;
}

</style>