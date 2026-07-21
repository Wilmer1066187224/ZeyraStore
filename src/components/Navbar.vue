<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import CartDrawer from './CartDrawer.vue'

const cart = useCartStore()
const auth = useAuthStore()

const logout = () => {
    auth.logout()
}

const open = ref(false)

const showHombre = ref(false)
const showMujer = ref(false)
const showAccesorios = ref(false)
</script>

<template>
  <!-- NAVBAR -->
  <header class="fixed top-0 left-0 w-full z-50">

    <!-- TOPBAR -->
    <div class="bg-black text-white text-xs hidden md:block">
      <div
        class="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between"
      >
        <div class="flex items-center gap-6">
          <span>🚚 ENVÍOS GRATIS DESDE $200.000</span>
          <span>🔥 NUEVA COLECCIÓN</span>
          <span>💳 PAGOS SEGUROS</span>
        </div>

        <router-link
          to="/contacto"
          class="hover:text-fuchsia-400 transition"
        >
          Centro de ayuda
        </router-link>
      </div>
    </div>

    <!-- MAIN NAV -->
    <nav class="bg-white border-b border-gray-200 shadow-sm">

      <div
        class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8"
      >

        <!-- LOGO -->
        <router-link
          to="/"
          class="text-4xl font-black tracking-tight text-black"
        >
          ZEYRA<span class="text-fuchsia-600">.</span>
        </router-link>

        <!-- SEARCH -->
        <div class="hidden lg:flex flex-1">

          <div class="relative w-full max-w-2xl mx-auto">

            <input
              type="text"
              placeholder="Busca productos, categorías o marcas..."
              class="w-full bg-[#f5f5f5] border border-gray-200
                     rounded-full px-6 py-4 pr-20 outline-none
                     focus:border-fuchsia-500 focus:bg-white transition"
            />

            <button
              class="absolute right-2 top-1/2 -translate-y-1/2
                     bg-black hover:bg-fuchsia-600 transition
                     text-white rounded-full px-5 py-3"
            >
              🔍
            </button>

          </div>

        </div>

        <!-- ACTIONS -->
        <div class="flex items-center gap-6">

      <div class="hidden md:flex items-center gap-4">

        <!---------------------->

    <router-link
        v-if="!auth.isAuthenticated"
        to="/login"
        class="text-sm font-semibold hover:text-fuchsia-600 transition"
    >
        Entrar
    </router-link>

    <template v-else>

        <span class="font-semibold text-gray-700">
            Hola, {{ auth.user.nombre }}
        </span>

        <button
            @click="logout"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
        >
            Salir
        </button>

    </template>

</div>

        <!---------------------->

        
          <router-link
            to="/favoritos"
            class="text-xl hover:scale-110 transition"
          >
            ❤️
          </router-link>

          <!-- CART -->
          <button
            @click="open = true"
            class="relative text-2xl hover:scale-110 transition"
          >
            🛒

            <span
              v-if="cart.totalItems > 0"
              class="absolute -top-2 -right-3 bg-fuchsia-600 text-white
                     text-[10px] w-5 h-5 rounded-full
                     flex items-center justify-center font-bold"
            >
              {{ cart.totalItems }}
            </span>
          </button>

        </div>

      </div>

      <!-- MENU -->
      <div class="hidden lg:block border-t border-gray-100 bg-white">

        <div
          class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center gap-14
                 text-[14px] font-bold tracking-wide relative"
        >

          <router-link
            to="/productos"
            class="hover:text-fuchsia-600 transition"
          >
            NUEVOS
          </router-link>

          <!-- HOMBRE -->
          <div
            class="relative h-full flex items-center"
            @mouseenter="showHombre = true"
            @mouseleave="showHombre = false"
          >

            <span class="cursor-pointer hover:text-fuchsia-600 transition">
              HOMBRE
            </span>

            <!-- MEGA MENU -->
            <transition name="fade">

              <div
                v-if="showHombre"
                class="absolute left-1/2 -translate-x-1/2 top-16
                       w-[900px] bg-white rounded-3xl shadow-2xl
                       border border-gray-100 p-10 grid grid-cols-4 gap-10"
              >

                <div>
                  <h3 class="font-black text-black mb-5">
                    Ropa
                  </h3>

                  <ul class="space-y-3 text-sm text-gray-600">
                    <li class="hover:text-fuchsia-600 cursor-pointer">
                      Camisetas
                    </li>

                    <li class="hover:text-fuchsia-600 cursor-pointer">
                      Jeans
                    </li>

                    <li class="hover:text-fuchsia-600 cursor-pointer">
                      Hoodies
                    </li>

                    <li class="hover:text-fuchsia-600 cursor-pointer">
                      Chaquetas
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="font-black text-black mb-5">
                    Calzado
                  </h3>

                  <ul class="space-y-3 text-sm text-gray-600">
                    <li class="hover:text-fuchsia-600 cursor-pointer">
                      Sneakers
                    </li>

                    <li class="hover:text-fuchsia-600 cursor-pointer">
                      Running
                    </li>

                    <li class="hover:text-fuchsia-600 cursor-pointer">
                      Botas
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="font-black text-black mb-5">
                    Accesorios
                  </h3>

                  <ul class="space-y-3 text-sm text-gray-600">
                    <li class="hover:text-fuchsia-600 cursor-pointer">
                      Gorras
                    </li>

                    <li class="hover:text-fuchsia-600 cursor-pointer">
                      Relojes
                    </li>

                    <li class="hover:text-fuchsia-600 cursor-pointer">
                      Mochilas
                    </li>
                  </ul>
                </div>

                <!-- IMAGE -->
                <div class="relative overflow-hidden rounded-2xl">

                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
                    class="h-full w-full object-cover hover:scale-105 transition duration-500"
                  />

                  <div
                    class="absolute inset-0 bg-gradient-to-t
                           from-black/70 to-transparent"
                  ></div>

                  <div class="absolute bottom-5 left-5 text-white">
                    <p class="text-xs tracking-[4px] uppercase">
                      New Drop
                    </p>

                    <h4 class="text-2xl font-black mt-2">
                      STREETWEAR
                    </h4>
                  </div>

                </div>

              </div>

            </transition>

          </div>

          <!-- MUJER -->
          <div
            class="relative h-full flex items-center"
            @mouseenter="showMujer = true"
            @mouseleave="showMujer = false"
          >

            <span class="cursor-pointer hover:text-fuchsia-600 transition">
              MUJER
            </span>

            <transition name="fade">

              <div
                v-if="showMujer"
                class="absolute left-1/2 -translate-x-1/2 top-16
                       w-[850px] bg-white rounded-3xl shadow-2xl
                       border border-gray-100 p-10 grid grid-cols-3 gap-10"
              >

                <div>
                  <h3 class="font-black mb-5">
                    Colecciones
                  </h3>

                  <ul class="space-y-3 text-sm text-gray-600">
                    <li>Vestidos</li>
                    <li>Crop Tops</li>
                    <li>Jeans</li>
                    <li>Blazers</li>
                  </ul>
                </div>

                <div>
                  <h3 class="font-black mb-5">
                    Tendencias
                  </h3>

                  <ul class="space-y-3 text-sm text-gray-600">
                    <li>Oversize</li>
                    <li>Premium</li>
                    <li>Street Style</li>
                    <li>Casual</li>
                  </ul>
                </div>

                <div class="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop"
                    class="h-full w-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>

              </div>

            </transition>

          </div>

          <router-link
            to="/productos"
            class="hover:text-fuchsia-600 transition"
          >
            TENNIS
          </router-link>

          <router-link
            to="/productos"
            class="hover:text-fuchsia-600 transition"
          >
            ROPA
          </router-link>

          <router-link
            to="/productos"
            class="hover:text-fuchsia-600 transition"
          >
            ACCESORIOS
          </router-link>

          <router-link
            to="/productos"
            class="text-red-500 hover:text-red-600 transition"
          >
            OFERTAS
          </router-link>

        </div>

      </div>

    </nav>

  </header>

  <!-- SPACER -->
  <div class="h-[136px]"></div>

  <!-- CART -->
  <CartDrawer
    :open="open"
    @close="open = false"
  />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>