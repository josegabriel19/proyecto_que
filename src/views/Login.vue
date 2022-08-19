<template>
<div class="home">
<navbar1/>
<login/>

</div>
  
</template>


<script>
import login from '@/components/Login.vue'
export default {
    name: 'HomeView',
    components: {
    login
  }
}
</script>

<style>

</style>