import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/Login.vue'
import register from '../views/Registro.vue'
import inicio from '../views/Inicio.vue'
import perfil from '../views/Perfil.vue'
import apartados from '../views/Apartados.vue'
import ActQueseria from '../views/ActualizarQueseria.vue'
import sensores from '../views/Sensores.vue'
import Principal from '../views/Principal.vue'
import Sensor from '../views/Sensor.vue'
import ActSecc from '../views/ActualizarSeccion.vue'
import ActSen from '../views/Actualizar_Sensor.vue'

const routes = [
  
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/registro',
    name: 'register',
    component: register
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: inicio
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: perfil
  },
  {
    path: '/apartado/:id',
    name: 'apartado',
    component: apartados
  },
  {
    path: '/Act_Queseria/:id',
    name: 'Act_Queseria',
    component: ActQueseria
  },
  {
    path: '/Sensores/:id',
    name: 'Sensores',
    component: sensores
  },
  {
    path: '/Principal',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/Principal',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/Sensor/:id/:tipo',
    name: 'Sensor',
    component: Sensor
  },
  {
    path: '/Seccion/:id',
    name: 'ActSecc',
    component: ActSecc
  },
  {
    path: '/ActualizarSen/:id/:nombre',
    name: 'ActSen',
    component: ActSen
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
