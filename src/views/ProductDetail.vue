<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRoute } from 'vue-router'

const cart = useCartStore()
const route = useRoute()

// Simulación de producto (luego lo hacemos dinámico)
const producto = ref({
  id: 1,
  nombre: "Camiseta básica premium",
  precio: 89900,
  tallas: ["XS", "S", "M", "L", "XL"],
  descripcion: "Camiseta en algodón premium con ajuste ceñido.",
  imagenes: [
    "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  ]
})

const imagenActiva = ref(producto.value.imagenes[0])
const tallaSeleccionada = ref(null)

const addToCart = () => {
  if (!tallaSeleccionada.value) {
    alert("Selecciona una talla")
    return
  }

  cart.addToCart({
    ...producto.value,
    talla: tallaSeleccionada.value
  })
}
</script>

<template>
  <section class="pt-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

    <!-- GALERÍA -->
    <div class="flex gap-6">

      <!-- Miniaturas -->
      <div class="flex flex-col gap-4">
        <img
          v-for="img in producto.imagenes"
          :key="img"
          :src="img"
          @click="imagenActiva = img"
          class="w-20 h-24 object-cover cursor-pointer border hover:border-black"
        />
      </div>

      <!-- Imagen principal -->
      <div class="flex-1">
        <img
          :src="imagenActiva"
          class="w-full rounded-lg"
        />
      </div>

    </div>

    <!-- INFO -->
    <div>
      <h1 class="text-3xl font-semibold mb-4">
        {{ producto.nombre }}
      </h1>

      <p class="text-2xl font-bold mb-6">
        $ {{ producto.precio.toLocaleString('es-CO') }}
      </p>

      <!-- Tallas -->
      <div class="mb-8">
        <h3 class="mb-3 font-medium">Talla</h3>

        <div class="flex gap-3">
          <button
            v-for="talla in producto.tallas"
            :key="talla"
            @click="tallaSeleccionada = talla"
            :class="[
              'border px-4 py-2',
              tallaSeleccionada === talla
                ? 'bg-black text-white'
                : 'hover:bg-gray-100'
            ]"
          >
            {{ talla }}
          </button>
        </div>
      </div>

      <!-- Botón -->
      <button
        @click="addToCart"
        class="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition"
      >
        AGREGAR AL CARRITO
      </button>

      <!-- Info desplegable -->
      <div class="mt-12 space-y-4 text-sm text-gray-600">
        <details>
          <summary class="cursor-pointer font-medium">Información del producto</summary>
          <p class="mt-2">{{ producto.descripcion }}</p>
        </details>

        <details>
          <summary class="cursor-pointer font-medium">Material</summary>
          <p class="mt-2">100% algodón</p>
        </details>

        <details>
          <summary class="cursor-pointer font-medium">Envíos y devoluciones</summary>
          <p class="mt-2">Envío gratis desde $250.000</p>
        </details>
      </div>

    </div>

  </section>
</template>