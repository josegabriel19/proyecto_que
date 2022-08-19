<template>
  <nav2/><br><br>
  <div class="container">
    <h1 id = "title">Un poco de historia del Queso</h1>
    <hr>
    <img src="@/assets/q.jpg" alt="500" ><br><br>    
    <hr>
    <div class="container-sm">
        <p id="biografia"> El queso es un alimento derivado de la leche, que se crea a partir de la separación del suero del
        coágulo de la leche gracias a la acción del cuajo u otro coagulante. Se piensa que surgió como un método para aprovechar 
        los excedentes de la leche. Su historia no está bien definida, por lo que se ha dado lugar a diferentes leyendas sobre su
        orígenes. Los arqueólogos muestran evidencias de que existe desde el tercer milenio antes de Cristo. Según la mitología 
        griega fueron los dioses del Olimpo quienes enseñaron a los mortales su producción, como un regalo. También está la leyenda
        árabe, según la cual un pastor nómada quién se quedó sin recipiente para transportar su leche, mató un cabrito y utilizó su
        estómago como odre (o recipiente biológico). De camino a casa, a consecuencia del calor y de las condiciones idóneas del estómago 
        del animal, la leche se
        transformó en un sedimento sólido que resultó de su agrado y a partir de entonces se decidió producirlo.</p> 
     </div>
    </div>
    <br>
</template>

<script>
import nav2 from "@/components/Navbar2.vue"
export default {
    name:"Principal",
    components:{
        nav2

    }

}
</script>

<style>
#title{
    color:black;
}

#biografia{
    font-family: Arial, Helvetica, sans-serif;
    text-align: justify;
    color:black;
    font-size: 40;
    
}

</style>