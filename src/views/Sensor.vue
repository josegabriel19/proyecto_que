<template>
<Navbar/><br>

<div class="container">
    <h1>Vista Sensor</h1><br><br>
    <div class="card" style="width: 22rem; height: 21rem" id="con">
        <div class="card-body" >
            <h5 class="card-title">Sensor {{tipo_sensor}}</h5><br><br><br>
            
            <h1>{{datos2}}</h1><br><br>
            <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Mostrar Historico
                </button>
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Historico</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body" v-for="valor in datosalrevez" :key="valor._id"> 
                               Valor lectura: {{valor.value}}
                               <br>
                               Actualizacion:{{valor.created_at}}
                            </div>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    </div>
</div>

</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'

export default {
    name:"Sensor",
    components:{
        Navbar
    },
    data:function(){
    return{
        id_Sensor: null,
        tipo_sensor: null,
        datos:null,
        datos2:null,
        datosalrevez:null,
        historico:null
    }
},
mounted:function(){
    this.id_Sensor = this.$route.params.id;
    this.tipo_sensor = this.$route.params.tipo;
        let direccion ="http://18.144.45.33:3333/api/v1/values/"+this.id_Sensor +"/get"
        axios.get(direccion,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then (data =>{ 
            this.datos =data.data
            this.datosalrevez = this.datos.reverse()
            console.log(data.data.info)
            console.log(this.tipo_sensor)

            if (this.tipo_sensor == "ultrasonico"){
                this.datos2 = parseInt(this.datosalrevez[0]["value"])+ "cm"
                console.log(this.datos2)
                }
            
            if (this.tipo_sensor == "temperatura"){
                this.datos2 = parseInt(this.datosalrevez[0]["value"])+ " C°"
                }
            
            if (this.tipo_sensor == "infrarrojo"){

                if (this.datos[this.datos.length -1]["value"] == 1){
                    this.datos2 = parseInt(this.datosalrevez[0]["value"])+ " Se detecto una Persona"
                    console.log(this.datos2)

                }
                else if (this.datos[this.datos.length -1]["value"] == 0){
                    this.datos2 = parseInt(this.datosalrevez[0]["value"])+ " No se detecto nada"
                }
            }
            if (this.tipo_sensor == "flama"){
                if (this.datos[this.datos.length -1]["value"] == 1){
                    this.datos2 = parseInt(this.datosalrevez[0]["value"])+ " Se detecto flama"
                    console.log(this.datos[this.datos.length -1]["value"] )
                }
                else if (this.datos[this.datos.length -1]["value"] == 0){
                    this.datos2 = parseInt(this.datosalrevez[0]["value"])+ " No se detecto flama"
                }
            }
            
        });
    }
}

</script>

<style>

#con{
    text-align: center;
    margin: auto;
}

</style>