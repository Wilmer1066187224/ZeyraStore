<script setup>
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const route = useRoute()

const venta = ref(null)

onMounted(async () => {

  try {

    const response = await axios.get(
      `http://127.0.0.1:8000/api/ventas/${route.params.id}`
    )

    venta.value = response.data

  } catch (error) {

    console.error(error)

  }

})
</script>

<template>

  <div class="min-h-screen bg-gray-100 py-10">

    <div
      v-if="venta"
      class="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl"
    >

      <div class="text-center mb-8">

        <div class="text-6xl mb-4">
          🎉
        </div>

        <h1 class="text-4xl font-black">
          Compra realizada
        </h1>

      </div>

      <div class="space-y-3 mb-8">

        <p>
          <strong>Pedido:</strong>
          #{{ venta.id }}
        </p>

        <p>
          <strong>Cliente:</strong>
          {{ venta.cliente.nombre }}
        </p>

        <p>
          <strong>Método de pago:</strong>
          {{ venta.metodo_pago }}
        </p>

        <p>
          <strong>Total:</strong>
          ${{ Number(venta.total).toLocaleString('es-CO') }}
        </p>

      </div>

      <h2 class="text-2xl font-bold mb-4">
        Productos comprados
      </h2>

      <div
        v-for="detalle in venta.detalles"
        :key="detalle.id"
        class="border rounded-xl p-4 mb-4"
      >

        <p class="font-bold">
          {{ detalle.producto.nombre }}
        </p>

        <p>
          Cantidad:
          {{ detalle.cantidad }}
        </p>

        <p>
          Subtotal:
          ${{ Number(detalle.subtotal).toLocaleString('es-CO') }}
        </p>

      </div>

      <router-link
        to="/"
        class="mt-6 inline-block bg-black text-white px-8 py-3 rounded-xl"
      >
        Volver a la tienda
      </router-link>

    </div>

  </div>

</template>