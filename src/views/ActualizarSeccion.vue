<template>
  <Navbar/>
  <br><br>
<h1>Actualizar Seccion</h1>
<br><br>
  <div class="container">

<form v-on:submit.prevent ="update">
  <div class="form-group">
    <label for="exampleInputEmail1"><h4><span class="badge badge-primary">Nombre</span></h4></label>
    <input type="text" class="form-control w-50" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingreasa el nombre al apartado" v-model="form.nombre_apartado">
  </div>
  <div class="form-group" style="justify-content: center;">
    <label for="exampleInputPassword1"><h4><span class="badge badge-primary">Descripcion</span></h4></label>
    <input  type="text" class="form-control w-50" id="exampleInputPassword1" placeholder=" Ingresa una descripcion al apartado"  v-model="form.descripcion" >
  </div>

    <div class="alert alert-success" role="alert" v-if="error">
      {{error}}
    </div>
        <button type="submit" class="btn btn-warning">Actualizar</button>
</form>
      </div>
      
</template>

<script>

import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
export default {
    name:'ActualizarSeccion',
    components:{
        Navbar
    },
    data:function(){
        return {
            id_apartado:null,
            form:{
                "nombre_apartado":"",
                "descripcion":""
            }
        }

    },
    methods:{
        
        update(){
            this.id_apartado = this.$route.params.id;
            const response= "http://18.144.45.33:3333/api/v1/apartados/"+this.id_apartado+"/update"
            axios.put(response, this.form,{
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
                }).then(data=>{
                    if (data.statusText == 'OK'){
                    location.reload();
                    this.mensaje = data.data.message
                    }
                });
        }
    },
    mounted:function(){
            this.id_apartado = this.$route.params.id;
            const response="http://18.144.45.33:3333/api/v1/apartado/"+this.id_apartado+"/get";
            axios.get(response,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            }).then (data =>{
                this.form.nombre_apartado= data.data.nombre_apartado
                this.form.descripcion= data.data.descripcion
                console.log(data)

            });


        }


}


</script>

<style>

</style>