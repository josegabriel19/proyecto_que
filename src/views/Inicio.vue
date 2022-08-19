<template>

<div class="container">
<navbar/>

<div class="dv">

</div>
<br>
<div class="container">
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Crear Local
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Crear Nueva Queseria</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form v-on:submit.prevent ="create">
        <div class="form-group">
            <label for="exampleInputEmail1"><h4><span class="badge badge-primary">Nombre</span></h4></label>
            <input type="text" class="form-control w-50" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingreasa el nombre de la Queseria" v-model="nombre">
        </div>
        <div class="form-group" style="justify-content: center;">
            <label for="exampleInputPassword1"><h4><span class="badge badge-primary">Telefono</span></h4></label>
            <input  type="text" class="form-control w-50" id="exampleInputPassword1" placeholder=" Ingresa numero de Telefono"  v-model="telefono" >
        </div>
        <div class="form-group" style="justify-content: center;">
            <label for="exampleInputPassword1"><h4><span class="badge badge-primary">Direccion</span></h4></label>
            <input  type="text" class="form-control w-50" id="exampleInputPassword1" placeholder="Ingresa la direccion de la queseria"  v-model="direccion" >
        </div>
        <div class="form-group" name="ape" id="ape">
            <label class="control-label" for="exampleInputPassword1"><h4><span class="badge badge-primary">Horarios</span></h4></label>
            <input type="Text" class="form-control w-50" name="Ap" id="Ap" placeholder="Ingresa los horarios de la queseria"  v-model="horarios">
        </div>
        <div class="form-group" name="ape" id="ape">
            <label class="control-label" for="exampleInputPassword1"><h4><span class="badge badge-primary">Descripcion</span></h4></label>
            <input type="Text" class="form-control w-50" name="Ap" id="Ap" placeholder="Ingresa una descripcion para la queseria"  v-model="descripcion">
        </div>
            <div class="alert alert-danger" role="alert" v-if="error">
            {{error}}
            </div>
            <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn btn-primary">Crear</button>
      </div>
        </form>
      </div>
    </div>
  </div>
</div><br><br>
    <div class="jumbotron" v-for="queso in Nombre" :key="queso._id">
    <h1 class="display-4">{{queso.nombre_queseria}}</h1>
    <p class="lead">{{queso.descripcion}}</p>
    <hr class="my-4">
    <p class="lead">
        <a class="btn btn-dark btn-lg" id="ll" role="button" v-on:click="mostrar(queso._id)" >Mostrar</a> |
        <a class="btn btn-dark btn-lg" id="la" role="button" v-on:click="eliminar(queso._id)">Eliminar</a> |
        <a class="btn btn-dark btn-lg"  id="le" role="button" v-on:click="Mandar(queso._id)">Actualizar</a>
    </p>
     <router-view/>
    </div>
</div>
</div>


</template>

<script>
import navbar from '@/components/Navbar.vue';
import footer from '@/components/Footer.vue';
import axios from 'axios';

export default {
    name: "Inicio",
    components:{
        navbar,
        footer
    },
    data: function(){
        return {
            Nombre: null,
            nombre: null,
            telefono:null,
            direccion: null,
            horarios:null,
            descripcion: null,
            error:null,
            message:null,
            messages:null
        }
    },
    methods:{
        mostrar(id){
            console.log(id)
            this.$router.push('/apartado/'+id)
        },
        create(){
            let json = {
                "nombre_queseria": this.nombre,
                "telefono":this.telefono,
                "direccion":this.direccion,
                "horarios":this.horarios,
                "descripcion":this.descripcion

            };
            axios.post('http://18.144.45.33:3333/api/v1/queseria/create', json,{
                 headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            }).then (data =>{
                console.log(data)
                this.message=data.data.message

                Pusher.logToConsole = true;

                var pusher = new Pusher('321a5c897ce91d5d3023', {
                cluster: 'us2'
                });

                var channel = pusher.subscribe('my-channel');
                channel.bind('my-event', function(data) {
                app.messages.push(JSON.stringify(data));
                });
                // Vue application
                const app = new Vue({
                el: '#app',
                data: {
                    messages: [],
                },
                });
               
                if (data.data.status == 'ok'){
                  location.reload();
                }
                  this.error = data.data[0].message

            });
        }
        
        ,
        eliminar(id){
            var respuesta = confirm("Estas Seguro que quieres eliminar Esta queseria? No podras volver a restaurarla")
            if (respuesta == true){
                let direccion ="http://18.144.45.33:3333/api/v1/queseria/delete/"+id
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
        Mandar(id){
            this.$router.push('/Act_Queseria/'+id);
        }
        
    },
    mounted:function(){
        let direccion = "http://18.144.45.33:3333/api/v1/queseria/index";
        axios.get(direccion,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then (data =>{
            this.Nombre = data.data;
            console.log(data.data)
        });
    }
}
</script>

<style>
.cont{
    text-align: left;
}
.dv{
    text-align: left;
}

#ll{
    color:aqua;
}
#la{
color:red;
}
#le{
    color:yellow;

}
</style>