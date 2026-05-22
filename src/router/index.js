import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Checkout from '../views/Checkout.vue'
import ProductDetail from '../views/ProductDetail.vue' // 👈 importar

const routes = [
  { path: '/', component: Home },
  { path: '/productos', component: Products },
  { path: '/checkout', component: Checkout },

  // 👇 NUEVA RUTA DINÁMICA DE PRODUCTO
  { 
    path: '/producto/:id',
    component: ProductDetail
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router