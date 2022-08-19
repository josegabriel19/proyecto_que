<template>
<navbar/>
<div class="container">
<br><br>
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Crear Seccion
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><h3>Crear<span class="badge badge-primary">Apartado</span></h3></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form v-on:submit.prevent ="create">
  <div class="form-group">
    <label for="exampleInputEmail1"><h4><span class="badge badge-primary">Nombre</span></h4></label>
    <input type="text" class="form-control w-50" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingreasa el nombre al apartado" v-model="nombre">
  </div>
  <div class="form-group" style="justify-content: center;">
    <label for="exampleInputPassword1"><h4><span class="badge badge-primary">Descripcion</span></h4></label>
    <input  type="text" class="form-control w-50" id="exampleInputPassword1" placeholder=" Ingresa una descripcion al apartado"  v-model="descripcion" >
  </div>

 
    <div class="alert alert-success" role="alert" v-if="error">
      {{error}}
    </div>
  
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn btn-success">Crear</button>
      </div>
  
</form>
      </div>
      
    </div>
  </div>
</div>
<br><br>
    <div class="card w-100">
        <div class="card-body" v-for="apartado in nom" :key="apartado._id">
            <h5 class="card-title">{{apartado.nombre_apartado}}</h5>
            <p class="card-text">{{apartado.descripcion}}.</p>
                <p class="lead">
                    <a class="btn btn-dark btn-lg" id="no" role="button" v-on:click="Mostrar(apartado._id)" >Ver</a> |
                    <a class="btn btn-dark btn-lg" id="no" role="button" v-on:click="Eliminar(apartado._id, apartado.nombre_apartado)">Eliminar</a> |
                    <a class="btn btn-dark btn-lg" id="no" role="button"  v-on:click="Mostrar2(apartado._id)">Actualizar</a>
                </p>
            <hr>
        </div>
    </div>
</div>

</template>

<script>
import axios from 'axios'
import navbar from '@/components/Navbar.vue';

export default {
    name: "apartado",
    components:{
        navbar
    },
    data:function(){
        return{
            nom:null,
            id_Queseria:null,
            nombre: null,
            descripcion: null,
            id_queseria:null,
            error:null
        }
    },
    methods:{
        create(){
            let json = {
                "nombre_apartado": this.nombre,
                "descripcion": this.descripcion
            };
            this.id_queseria =  this.$route.params.id_Queseria
            console.log(this.id_queseria)
            let direccion = "http://18.144.45.33:3333/api/v1/apartados/"+this.id_Queseria+"/create"
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
        },
        Mostrar(id){
            console.log(id)
            this.$router.push('/Sensores/'+id)
        },
        Mostrar2(id){
            console.log(id)
            this.$router.push('/Seccion/'+id)
        },
        Eliminar(id, Nombre){
            
            let respuesta = confirm("Estas Seguro que quieres Eliminar "+Nombre+" ? No podras volver a restaurarlo")
            if (respuesta == true){
                let direccion = "http://18.144.45.33:3333/api/v1/apartados/"+id+"/destroy"

                axios.delete(direccion,{
                    headers:{
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(data =>{
                    console.log (data)
                });
                location.reload();
            }
            else{
                return false;
            }
        },
        enviar(){
            this.$router.push('/Create_Apartado/'+this.id_Queseria)
        }
    }
    ,
    mounted:function(){
        this.id_Queseria = this.$route.params.id;

        let direccion="http://18.144.45.33:3333/api/v1/apartados/"+this.id_Queseria+"/get"
        axios.get(direccion,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then (data =>{
            this.nom = data.data
            console.log(data)
        });
    }
}
</script>

<style>
#no{
    color:gold;
}

</style>