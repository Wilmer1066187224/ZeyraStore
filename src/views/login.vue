<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()     

const form = ref({
    correo: '',
    password: ''
})

const login = async () => {

    try {

       const response = await axios.post(
    'http://127.0.0.1:8000/api/login',
    form.value
)

console.log(response.data)

auth.login(
    response.data.token,
    response.data.cliente
)

router.push('/')
    } catch (error) {

        alert(
            error.response?.data?.message ||
            'No fue posible iniciar sesión.'
        )

    }

}
</script>

<template>

<section class="min-h-screen bg-gray-100 flex items-center justify-center py-16 px-4">

    <div class="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

        <div class="text-center mb-10">

            <h1 class="text-4xl font-black text-gray-900">
                Iniciar Sesión
            </h1>

            <p class="text-gray-500 mt-3">
                Bienvenido nuevamente a ZEYRA STORE
            </p>

        </div>

        <form @submit.prevent="login" class="space-y-6">

            <div>

                <label class="block font-semibold text-gray-700 mb-2">
                    Correo electrónico
                </label>

                <input
                    v-model="form.correo"
                    type="email"
                    placeholder="correo@email.com"
                    class="w-full h-14 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                >

            </div>

            <div>

                <label class="block font-semibold text-gray-700 mb-2">
                    Contraseña
                </label>

                <input
                    v-model="form.password"
                    type="password"
                    placeholder="********"
                    class="w-full h-14 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                >

            </div>

            <button
                type="submit"
                class="w-full h-14 rounded-xl bg-black text-white font-bold text-lg hover:bg-gray-800 transition duration-300"
            >
                Iniciar sesión
            </button>

        </form>

        <div class="text-center mt-8">

            <p class="text-gray-600">

                ¿No tienes una cuenta?

                <router-link
                    to="/registrar"
                    class="font-bold text-black hover:underline ml-1"
                >
                    Regístrate aquí
                </router-link>

            </p>

        </div>

    </div>

</section>

</template>