import { createRouter, createWebHistory } from 'vue-router';
import Inicio from '../views/Inicio.vue';
import ClienteForm from '../views/ClienteForm.vue';
import PagoForm from '../views/PagoForm.vue';

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio,
  },
  {
    path: '/agregarCliente',
    name: 'agregarCliente',
    component: ClienteForm,
  },
  {
    path: '/agregarPago',
    name: 'agregarPago',
    component: PagoForm,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
