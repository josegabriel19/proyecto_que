<template>
<navbar/>
    
    <div class="container">
    <h1>Actualizar {{nombre_sen}}</h1><hr><br>
      <form v-on:submit.prevent ="update">
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Escribe el nombre del sensor" v-model="form.nombre_sensor">
      </div>
       
        <select class="form-select" aria-label="Default select example" v-model="form.tipo">
            <option selected  ></option>
            <option value="ultrasonico">ultrasonico</option>
            <option value="temperatura">temperatura</option>
            <option value="gas">gas</option>
            <option value="flama">flama</option>
            <option value="infrarrojo">infrarrojo</option>
        </select><br>
        <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">Descrip</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Escribe la descripcion del sensor" v-model="form.descripcion">
        </div>
        <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">Imagen</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Escribe el link de la imagen" v-model="form.imagen">
        </div>
        <div class="modal-footer">
        
        <button type="submit" class="btn btn-success center" data-bs-dismiss="modal">Actualizar</button>
        </div>
        </form>
    </div>
  
</template>

<script>

import navbar from '@/components/Navbar.vue'
import axios from 'axios'


export default {
    name:"Actualizar_Sensor",
    components:{
        navbar

    },
    data:function(){
        return{
            nombre_sen: null,
            id: null,
            form:{
                "nombre_sensor":"",
                "pines":"",
                "tipo":"",
                "descripcion":"",
                "imagen":"",
            }
        }
    },
    methods:{
        update(){
        this.nombre_sen = this.$route.params.nombre;
        this.id= this.$route.params.id;
        const url = "http://18.144.45.33:3333/api/v1/sensores/"+this.id+"/update"

        axios.put(url, this.form,{
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
        this.id= this.$route.params.id;
        const response = "http://18.144.45.33:3333/api/v1/sensor/"+this.id+"/get"
        axios.get(response,{
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(data =>{
                this.form.nombre_sensor = data.data.nombre_sensor
                this.form.pines = data.data.pines
                this.form.tipo = data.data.tipo
                this.form.descripcion = data.data.descripcion
                this.form.tipo = data.data.tipo
                this.form.imagen = data.data.imagen

                console.log(this.form.pin )
            });

    }
}
</script>

<style>

</style>