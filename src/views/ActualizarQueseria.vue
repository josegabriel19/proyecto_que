<template>
<navbar/>
<br>
<div class="container" name="co" id="co">
<h1>Actualizar<span class="badge badge-warning">Queseria</span></h1>
<br>
<br>
<form v-on:submit.prevent ="update" >
  <div class="form-group">
    <label for="exampleInputEmail1"><h4><span class="badge badge-danger">Nombre</span></h4></label>
    <input type="text" class="form-control w-50" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nombre" v-model="form.nombre_queseria">
  </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><h4><span class="badge badge-danger">Telefono</span></h4></label>
    <input type="text" class="form-control w-50" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Telefono" v-model="form.telefono">
  </div>
  
  <div class="form-group" style="justify-content: center;">
    <label for="exampleInputPassword1"><h4><span class="badge badge-danger">Direccion</span></h4></label>
    <input  type="text" class="form-control w-50" id="exampleInputPassword1" placeholder="Direccion"  v-model="form.direccion" >
  </div>
  <div class="form-group" name="ape" id="ape">
    <label class="control-label" for="exampleInputPassword1"><h4><span class="badge badge-danger">Horarios</span></h4></label>
    <input type="Text" class="form-control w-50" name="Ap" id="Ap" placeholder="Horarios"  v-model="form.horarios">
  </div>
    <div class="form-group">
    <label for="exampleInputEmail1"><h4><span class="badge badge-danger">Descripcion</span></h4></label>
    <input type="text" class="form-control w-50" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Descripcion" v-model="form.descripcion">
  </div>
  
  <div class="alert alert-success" role="alert">
  {{mensaje}}
  </div>
  <br>
    <input type="submit" class="fadeIn fourth bg-danger" value="Actualizar Queseria" v-on:click="update()">

</form>
</div>

</template>

<script>
import navbar from '@/components/Navbar.vue';
import axios from 'axios';
export default {
    name: "ActualizarQueseria",
    components:{
        navbar
    },
    data:function(){
        return{
            form:{
                "nombre_queseria":"",
                "telefono":"",
                "direccion":"",
                "horarios":"",
                "descripcion":""
            },
            id_Queseria:null,
            mensaje:null
        }
    },
    methods:{
        update(){
            let response = "http://18.144.45.33:3333/api/v1/queseria/update/"+this.id_Queseria;
            axios.patch(response, this.form,{
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
        let direccion = "http://18.144.45.33:3333/api/v1/queseria/Queseria/"+this.id_Queseria;
        axios.get(direccion,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then (data =>{
            
            this.form.nombre_queseria = data.data.nombre_queseria
            this.form.telefono = data.data.telefono
            this.form.direccion = data.data.direccion
            this.form.horarios = data.data.horarios
            this.form.descripcion = data.data.descripcion
            console.log(this.form)
        });    
    }
}
</script>

<style>

</style>