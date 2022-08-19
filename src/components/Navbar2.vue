<template>
 <nav class="navbar navbar-dark navbar-expand-lg bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Bienvenido a SmrtCheez</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      
      </ul>
      <div class="button">
      <router-link to="/registro">
        <button class="btn btn-primary " type="button"  aria-haspopup="true" aria-expanded="false" value="Iniciar Sesion">
        Registrarse
      </button></router-link> |
      <router-link to="/login">
       <button class="btn btn-success " type="button"  aria-haspopup="true" aria-expanded="false" value="Iniciar Sesion">
        Iniciar Sesion
      </button></router-link>
      </div>
    </div>
  </div>
  <router-view/>
</nav>
</template>

<script>
 
export default {

}
</script>

<style>

</style>