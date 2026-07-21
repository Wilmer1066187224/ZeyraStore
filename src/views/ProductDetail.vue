<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCartStore } from '@/stores/cart'
import { useRoute } from 'vue-router'

const cart = useCartStore()
const route = useRoute()

const producto = ref(null)
const imagenActiva = ref('')
const tallaSeleccionada = ref(null)

onMounted(async () => {

  try {

    const response = await axios.get(
      `http://127.0.0.1:8000/api/productos/${route.params.id}`
    )

    producto.value = response.data

    imagenActiva.value = response.data.imagen

  } catch (error) {

    console.error(error)

  }

})

const addToCart = () => {

    console.log("PRODUCTO COMPLETO")
    console.log(producto.value)

    console.log("ID:", producto.value.id)

    cart.addToCart({
        ...producto.value,
        talla: tallaSeleccionada.value
    })

}
</script>

<template>

  <div v-if="producto">

    <section class="pt-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

      <!-- IMAGEN -->
      <div>
        <img
          :src="imagenActiva"
          class="w-full rounded-lg shadow-lg"
        />
      </div>

      <!-- INFO -->
      <div>

        <h1 class="text-3xl font-semibold mb-4">
          {{ producto.nombre }}
        </h1>

        <p class="text-2xl font-bold mb-6">
          $ {{ Number(producto.precio_venta).toLocaleString('es-CO') }}
        </p>

        <div class="mb-6">
          <span class="font-semibold">Stock disponible:</span>
          {{ producto.stock }}
        </div>

        <!-- Tallas -->
        <div class="mb-8">

          <h3 class="mb-3 font-medium">
            Talla
          </h3>

          <div class="flex gap-3">
            
            <button
              v-for="talla in ['37','38','39','40','41','42']"
              :key="talla"
              @click="tallaSeleccionada = talla"
              :class="[
                'border px-4 py-2 rounded',
                tallaSeleccionada === talla
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              ]"
            >
              {{ talla }}
            </button>

          </div>

        </div>

        <!-- BOTON -->
        <button
          @click="addToCart"
          class="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition"
        >
          AGREGAR AL CARRITO
        </button>

        <!-- DESCRIPCION -->
        <div class="mt-12 space-y-4 text-sm text-gray-600">

          <details open>

            <summary class="cursor-pointer font-medium">
              Información del producto
            </summary>

            <p class="mt-2">
              {{ producto.descripcion }}
            </p>

          </details>

          <details>

            <summary class="cursor-pointer font-medium">
              Material
            </summary>

            <p class="mt-2">
              Material premium de alta calidad.
            </p>

          </details>

          <details>

            <summary class="cursor-pointer font-medium">
              Envíos y devoluciones
            </summary>

            <p class="mt-2">
              Envíos a toda Colombia.
            </p>

          </details>

        </div>

      </div>

    </section>

  </div>

  <div
    v-else
    class="flex justify-center items-center min-h-screen"
  >
    <h2 class="text-2xl font-bold">
      Cargando producto...
    </h2>
  </div>

</template>