<script setup>
import { useCartStore } from '../stores/cart'
import { computed } from 'vue'

const cart = useCartStore()

defineProps({
  open: Boolean
})

const emit = defineEmits(['close'])

const totalItems = computed(() =>
  cart.items.reduce((acc, item) => acc + item.cantidad, 0)
)
</script>

<template>
  <transition name="fade">
<div v-if="open" class="fixed inset-0 z-[99999] flex bg-transparent">
      
      <!-- Fondo oscuro -->
      <div
        class="flex-1 bg-black/50 backdrop-blur-sm transition-opacity"
        @click="emit('close')"
      ></div>

      <!-- Panel carrito -->
      <transition name="slide">
        <aside
          class="w-96 max-w-full bg-white p-6 shadow-2xl overflow-y-auto flex flex-col"
        >
          
          <!-- Header -->
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-2xl font-bold">🛒 Tu carrito</h2>
              <p class="text-sm text-gray-500">
                {{ totalItems }} producto(s)
              </p>
            </div>

            <button
              @click="emit('close')"
              class="text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>

          <!-- Carrito vacío -->
          <div
            v-if="cart.items.length === 0"
            class="flex-1 flex items-center justify-center text-gray-500 text-center"
          >
            <div>
              <p class="text-lg mb-2">Tu carrito está vacío</p>
              <p class="text-sm text-gray-400">
                Agrega productos para comenzar tu compra
              </p>
            </div>
          </div>

          <!-- Productos -->
<div
  v-for="item in cart.items"
  :key="item.id"
  class="border-b py-4 flex justify-between items-start"
>
  <div>
    <p class="font-semibold">{{ item.nombre }}</p>

   <p class="text-sm text-gray-600">
  ${{ Number(item.precio_venta).toLocaleString('es-CO') }}
</p>

    <!-- Controles cantidad -->
    <div class="flex items-center gap-3 mt-3">
      <button
        @click="cart.decrease(item.id)"
        class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
        
        >
        -
      </button>

      <span class="font-medium">
        {{ item.cantidad }}
      </span>

      <button
        @click="cart.increase(item.id)"
        class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
      >
        +
      </button>
    </div>
  </div>

  <button
  @click="cart.removeFromCart(item.id)"
  class="border border-gray-300
         text-gray-700
         px-4 py-2 rounded-full
         text-sm font-medium
         hover:border-red-500
         hover:text-red-500
         hover:bg-red-50
         transition-all duration-300"
>
  Eliminar
</button>
</div>


          <!-- Total -->
          <div
            v-if="cart.items.length > 0"
            class="mt-auto pt-6 border-t"
          >
            <div class="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>
                ${{ cart.totalPrice.toLocaleString('es-CO') }}
              </span>
            </div>

        <router-link
  to="/checkout"
  class="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-fuchsia-600 transition-all duration-300 text-center block"
  @click="emit('close')"
>
  Finalizar compra
</router-link>

<router-link
  to="/checkout"
  class="block mt-6 bg-black text-white text-center py-3 rounded-lg"
>
  Ir al checkout
</router-link>


          </div>

        </aside>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
/* Fade fondo */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide panel */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
