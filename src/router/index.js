import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Checkout from '../views/Checkout.vue'
import ProductDetail from '../views/ProductDetail.vue'
import PedidoExitoso from '@/views/PedidoExitoso.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

import { useAuthStore } from '@/stores/auth'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/productos',
        component: Products
    },
    {
        path: '/checkout',
        component: Checkout
    },
    {
        path: '/registrar',
        name: 'registrar',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/producto/:id',
        component: ProductDetail
    },
    {
        path: '/pedido-exitoso/:id',
        name: 'pedido-exitoso',
        component: PedidoExitoso
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {

    const auth = useAuthStore()

    // Proteger Checkout
    if (to.path === '/checkout' && !auth.isAuthenticated) {

        next('/login')

    } else {

        next()

    }

})

export default router