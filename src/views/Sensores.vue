<template>

   <Nav/>
<div class="container">
<br>
        <h1> Vista Sensores</h1>
 

   <!-- Button trigger modal -->
<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Crear Nuevo Sensor
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" >
    <div class="modal-content" >
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Crear Sensor</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" >
      <form v-on:submit.prevent ="create">
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Escribe el nombre del sensor" v-model="nombre">
      </div>
        <div class="mb-3" >
            <label for="formGroupExampleInput2" class="form-label">Pines</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Escribe los pines del Sensor" v-model="pin">
            <button type="button" class="btn btn-success" @click="AgregarPines()">Agregar pin</button>
        </div>
        <select class="form-select" aria-label="Default select example" v-model="tipo">
            <option selected >Selecciona una opcion</option>
            <option value="ultrasonico">ultrasonico</option>
            <option value="temperatura">temperatura</option>
            <option value="gas">gas</option>
            <option value="temperatura">flama</option>
             <option value="temperatura">infrarrojo</option>
        </select><br>
        <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">Descrip</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Escribe la descripcion del sensor" v-model="descripcion">
        </div>
        <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">Imagen</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Escribe el link de la imagen" v-model="imagen">
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Crear</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
<br><br>
 <!-- Aqui Termina el modal -->
    <div class="card" v-for="sensor in Datos" :key="sensor._id">
        <div class="card-header"  v-on:click="Mandar(sensor._id,sensor.tipo)">
            {{sensor.tipo}}
        </div>
        <div class="card-body" >
            <h5 class="card-title">{{sensor.nombre_sensor}}</h5>
            <p class="card-text">{{sensor.descripcion}}</p>

            <a class="btn btn-danger btn-lg" href="#" role="button" v-on:click="eliminar(sensor._id, sensor.nombre_sensor)">Eliminar</a> |
        <a class="btn btn-warning btn-lg" href="#" role="button"  v-on:click="Mandar2(sensor._id,sensor.nombre_sensor)">Actualizar</a>
            <br>
        </div>
    </div>
</div>
</template>

<script>

import Nav from '@/components/Navbar.vue'
import axios from 'axios'

export default {
    name:"Sensor",
    components:{
    Nav
},

data:function(){
    return {
        id_Apartado:null,
        Datos:null,
        Nombre:null,
        pines:[],
        tipo:"Seleccione un Sensor",
        descripcion:null,
        imagen:null,
        pin: null
    }
},
methods:{
    AgregarPines(){
        this.pines.push(parseInt(this.pin))
        this.pin = null
    },
    create(){
        let json = {
            "nombre_sensor": this.nombre,
            "pines":this.pines,
            "tipo":this.tipo,
            "descripcion": this.descripcion,
            "imagen":this.imagen
        }
        let direccion="http://18.144.45.33:3333/api/v1/sensores/"+this.id_Apartado+"/create"
        axios.post(direccion,json,{
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(data =>{
                console.log(data)
                console.log(data.data.status)
                
                if (data.data.status == "ok"){
                  this.error = data.data.message
                  location.reload();
                }
            });
            location.reload();
    },
    eliminar(id, nombre){
         var respuesta = confirm("Estas Seguro que quieres eliminar "+ nombre+"? No podras volver a restaurarlo")
            if (respuesta == true){
                let direccion ="http://18.144.45.33:3333/api/v1/sensores/"+id+"/destroy"
            axios.delete(direccion, {
                headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            }).then(data =>{
                console.log(data)
            });
            location.reload();
            }
            else{
                return false;
            }
    },
    Mandar(id,tipo){
        this.$router.push('/Sensor/'+id+ '/'+tipo);
    },
    Mandar2(id, nombre){
        this.$router.push('/ActualizarSen/'+id+ '/'+nombre);
    }
},
mounted:function(){
    this.id_Apartado = this.$route.params.id;
    let direccion ="http://18.144.45.33:3333/api/v1/sensores/"+this.id_Apartado+"/get"
    axios.get(direccion,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then (data =>{ 
            this.Datos = data.data
            console.log(this.Datos)
        });
    }
}
</script>

<style>

</style>