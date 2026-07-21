<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
    nombre: '',
    apellido: '',
    documento: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    departamento: '',
    codigo_postal: '',
    password: '',
    password_confirmation: ''
})

const registrar = async () => {

    try {

        const response = await axios.post(
            'http://127.0.0.1:8000/api/register',
            form.value
        )

        alert(response.data.message)

        router.push('/login')

    } catch (error) {

        console.log(error)

        if (error.response) {

            const errores = error.response.data.errors

            if (errores) {

                let mensaje = ''

                Object.values(errores).forEach(item => {
                    mensaje += item[0] + '\n'
                })

                alert(mensaje)

            } else {

                alert(error.response.data.message)

            }

        }

    }

}
</script>

<template>

<section class="min-h-screen bg-gray-100 flex items-center justify-center py-16 px-4">

    <div class="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10">

        <div class="text-center mb-10">

            <h1 class="text-4xl font-black text-gray-900">
                Crear Cuenta
            </h1>

            <p class="text-gray-500 mt-3">
                Regístrate para comprar en ZEYRA STORE
            </p>

        </div>

        <form class="space-y-6">

            <div class="grid md:grid-cols-2 gap-6">

    <div>

        <label class="font-semibold text-gray-700">
            Nombre
        </label>

        <input
            v-model="form.nombre"
            type="text"
            class="w-full mt-2 h-14 rounded-xl border border-gray-300 px-4"
            placeholder="Nombre"
        >

    </div>

    <div>

        <label class="font-semibold text-gray-700">
            Apellido
        </label>

        <input
            v-model="form.apellido"
            type="text"
            class="w-full mt-2 h-14 rounded-xl border border-gray-300 px-4"
            placeholder="Apellido"
        >

    </div>

</div>

            <div>

                <label class="font-semibold text-gray-700">
                    Documento
                </label>

                <input
                    v-model="form.documento"
                    type="text"
                    class="w-full mt-2 h-14 rounded-xl border border-gray-300 px-4"
                    placeholder="Número de documento"
                >

            </div>

            <div>

                <label class="font-semibold text-gray-700">
                    Correo electrónico
                </label>

                <input
                    v-model="form.correo"
                    type="email"
                    class="w-full mt-2 h-14 rounded-xl border border-gray-300 px-4"
                    placeholder="correo@email.com"
                >

            </div>

            <div class="grid md:grid-cols-2 gap-6">

                <div>

                    <label class="font-semibold text-gray-700">
                        Teléfono
                    </label>

                    <input
                        v-model="form.telefono"
                        type="text"
                        class="w-full mt-2 h-14 rounded-xl border border-gray-300 px-4"
                        placeholder="3001234567"
                    >

                </div>
<div class="grid md:grid-cols-2 gap-6">

    <div>

        <label class="font-semibold text-gray-700">
            Ciudad
        </label>

        <input
            v-model="form.ciudad"
            type="text"
            class="w-full mt-2 h-14 rounded-xl border border-gray-300 px-4"
            placeholder="Ciudad"
        >

    </div>

    <div>

        <label class="font-semibold text-gray-700">
            Departamento
        </label>

        <input
            v-model="form.departamento"
            type="text"
            class="w-full mt-2 h-14 rounded-xl border border-gray-300 px-4"
            placeholder="Departamento"
        >

    </div>

</div>
<div>

    <label class="font-semibold text-gray-700">
        Código Postal
    </label>

    <input
        v-model="form.codigo_postal"
        type="text"
        class="w-full mt-2 h-14 rounded-xl border border-gray-300 px-4"
        placeholder="230001"
    >

</div>

            </div>

            <div class="grid md:grid-cols-2 gap-6">

                <div>

                    <label class="font-semibold text-gray-700">
                        Contraseña
                    </label>

                    <input
                        v-model="form.password"
                        type="password"
                        class="w-full mt-2 h-14 rounded-xl border border-gray-300 px-4"
                        placeholder="********"
                    >

                </div>

                <div>

                    <label class="font-semibold text-gray-700">
                        Confirmar contraseña
                    </label>

                    <input
                        v-model="form.password_confirmation"
                        type="password"
                        class="w-full mt-2 h-14 rounded-xl border border-gray-300 px-4"
                        placeholder="********"
                    >

                </div>

            </div>

            <button
                type="button"
                @click="registrar"
                class="w-full h-14 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition"
            >
                Crear mi cuenta
            </button>

        </form>

        <div class="text-center mt-8">

            <p class="text-gray-600">

                ¿Ya tienes una cuenta?

                <router-link
                    to="/login"
                    class="font-bold text-black hover:underline"
                >
                    Inicia sesión
                </router-link>

            </p>

        </div>

    </div>

</section>

</template>