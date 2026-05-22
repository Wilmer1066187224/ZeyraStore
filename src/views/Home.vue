<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

const productosDestacados = ref([
  {
    id: 1,
    nombre: 'Nike Air Urban',
    precio: 320000,
    imagen:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    nombre: 'Chaqueta Premium',
    precio: 210000,
    imagen:
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    nombre: 'Street Hoodie',
    precio: 185000,
    imagen:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
  },
])
</script>

<template>
  <div class="bg-[#f5f5f5] min-h-screen">

    <!-- HERO -->
    <section class="max-w-7xl mx-auto px-6 pt-32">

      <div
        class="grid lg:grid-cols-2 rounded-[45px] overflow-hidden
               bg-gradient-to-r from-[#050505]
               via-[#0d1020] to-[#6d0a7f]
               shadow-2xl"
      >

        <!-- LEFT -->
        <div class="flex items-center">

          <div class="p-10 lg:p-16 text-white">

            <p
              class="uppercase tracking-[8px]
                     text-fuchsia-400 font-bold text-sm"
            >
              Nueva colección
            </p>

            <h1
              class="mt-6 text-6xl lg:text-8xl
                     font-black leading-none"
            >
              ZEYRA

              <span class="block text-fuchsia-500">
                STORE
              </span>

            </h1>

            <p
              class="mt-8 text-lg text-gray-300
                     leading-relaxed max-w-xl"
            >
              Descubre moda premium, sneakers exclusivos
              y estilo urbano con una experiencia moderna,
              elegante y profesional inspirada en las mejores
              tiendas ecommerce del mundo.
            </p>

            <div class="mt-10 flex flex-wrap gap-4">

              <router-link
                to="/productos"
                class="px-8 py-4 bg-fuchsia-600 text-white
                       rounded-2xl font-bold shadow-xl
                       hover:bg-fuchsia-700 hover:scale-105
                       transition duration-300"
              >
                Comprar ahora
              </router-link>

              <router-link
                to="/productos"
                class="px-8 py-4 bg-white text-black
                       rounded-2xl font-bold
                       hover:bg-gray-200 hover:scale-105
                       transition duration-300"
              >
                Ver catálogo
              </router-link>

            </div>

          </div>

        </div>

        <!-- RIGHT IMAGE -->
        <div class="relative min-h-[650px] overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1400&auto=format&fit=crop"
            alt="Moda urbana"
            class="absolute inset-0 w-full h-full
                   object-cover hover:scale-105
                   transition duration-700"
          />

          <div
            class="absolute inset-0
                   bg-gradient-to-t from-black/40 to-transparent"
          ></div>

        </div>

      </div>

    </section>

    <!-- BENEFITS -->
    <section class="max-w-7xl mx-auto px-6 py-16">

      <div class="grid md:grid-cols-4 gap-6">

        <div
          class="bg-white rounded-[30px] p-8
                 shadow-sm hover:shadow-2xl
                 hover:-translate-y-2
                 transition duration-300"
        >
          <div class="text-5xl">🚚</div>

          <h3 class="mt-5 text-xl font-black">
            Envíos rápidos
          </h3>

          <p class="mt-3 text-gray-500 leading-relaxed">
            Entregas seguras y rápidas en toda Colombia.
          </p>
        </div>

        <div
          class="bg-white rounded-[30px] p-8
                 shadow-sm hover:shadow-2xl
                 hover:-translate-y-2
                 transition duration-300"
        >
          <div class="text-5xl">💳</div>

          <h3 class="mt-5 text-xl font-black">
            Pagos seguros
          </h3>

          <p class="mt-3 text-gray-500 leading-relaxed">
            Protección total en todas tus compras online.
          </p>
        </div>

        <div
          class="bg-white rounded-[30px] p-8
                 shadow-sm hover:shadow-2xl
                 hover:-translate-y-2
                 transition duration-300"
        >
          <div class="text-5xl">🔥</div>

          <h3 class="mt-5 text-xl font-black">
            Tendencias
          </h3>

          <p class="mt-3 text-gray-500 leading-relaxed">
            Inspirado en el estilo urbano internacional.
          </p>
        </div>

        <div
          class="bg-white rounded-[30px] p-8
                 shadow-sm hover:shadow-2xl
                 hover:-translate-y-2
                 transition duration-300"
        >
          <div class="text-5xl">⭐</div>

          <h3 class="mt-5 text-xl font-black">
            Calidad premium
          </h3>

          <p class="mt-3 text-gray-500 leading-relaxed">
            Productos seleccionados con altos estándares.
          </p>
        </div>

      </div>

    </section>

    <!-- PRODUCTS -->
    <section class="max-w-7xl mx-auto px-6 pb-24">

      <div class="flex justify-between items-center mb-12">

        <div>

          <p
            class="text-fuchsia-600 uppercase
                   tracking-[5px] font-bold text-sm"
          >
            Productos destacados
          </p>

          <h2 class="text-5xl font-black mt-2 text-black">
            Lo más vendido
          </h2>

        </div>

        <router-link
          to="/productos"
          class="font-bold hover:text-fuchsia-600 transition"
        >
          Ver todo →
        </router-link>

      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <div
          v-for="producto in productosDestacados"
          :key="producto.id"
          class="group bg-white rounded-[35px]
                 overflow-hidden border border-gray-100
                 hover:-translate-y-3 hover:shadow-2xl
                 transition duration-500"
        >

          <!-- IMAGE -->
          <div class="relative overflow-hidden">

            <img
              :src="producto.imagen"
              :alt="producto.nombre"
              class="h-96 w-full object-cover
                     group-hover:scale-110
                     transition duration-700"
            />

            <div
              class="absolute top-5 left-5
                     bg-black text-white text-xs
                     px-4 py-2 rounded-full font-bold"
            >
              NUEVO
            </div>

          </div>

          <!-- CONTENT -->
          <div class="p-7">

            <h3 class="text-2xl font-black">
              {{ producto.nombre }}
            </h3>

            <p class="mt-3 text-gray-500 leading-relaxed">
              Diseño exclusivo y moderno para destacar tu estilo.
            </p>

            <div class="mt-7 flex justify-between items-center">

              <span class="text-3xl font-black text-black">
                ${{ producto.precio.toLocaleString('es-CO') }}
              </span>

              <button
                @click="cart.addToCart(producto)"
                class="bg-black text-white
                       px-6 py-3 rounded-2xl
                       font-bold shadow-lg
                       hover:bg-fuchsia-600
                       hover:scale-105
                       transition duration-300"
              >
                Agregar
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- BANNER -->
    <section class="bg-black py-28">

      <div class="max-w-5xl mx-auto px-6 text-center text-white">

        <p
          class="uppercase tracking-[8px]
                 text-fuchsia-400 font-bold"
        >
          ZEYRA EXPERIENCE
        </p>

        <h2
          class="mt-6 text-5xl lg:text-7xl
                 font-black leading-tight"
        >
          Moda urbana,
          <span class="text-fuchsia-500">
            sneakers y estilo premium
          </span>
        </h2>

        <p
          class="mt-8 text-lg text-gray-400
                 leading-relaxed max-w-3xl mx-auto"
        >
          Inspirado en las mejores plataformas ecommerce
          del mundo para ofrecer una experiencia moderna,
          elegante y visualmente impactante.
        </p>

        <router-link
          to="/productos"
          class="inline-block mt-12
                 px-10 py-5 bg-fuchsia-600
                 rounded-2xl font-bold text-lg
                 hover:bg-fuchsia-700
                 hover:scale-105
                 transition duration-300 shadow-2xl"
        >
          Explorar colección
        </router-link>

      </div>

    </section>

    <!-- FOOTER -->
    <footer class="bg-[#111] text-gray-400">

      <div
        class="max-w-7xl mx-auto px-6 py-20
               grid md:grid-cols-4 gap-12"
      >

        <div>

          <h3 class="text-4xl font-black text-white">
            ZEYRA<span class="text-fuchsia-600">.</span>
          </h3>

          <p class="mt-6 leading-relaxed">
            Ecommerce moderno inspirado en las mejores
            plataformas premium de moda y sneakers.
          </p>

        </div>

        <div>

          <h4 class="text-white font-bold text-lg mb-6">
            Categorías
          </h4>

          <ul class="space-y-3">
            <li>Hombre</li>
            <li>Mujer</li>
            <li>Tennis</li>
            <li>Streetwear</li>
          </ul>

        </div>

        <div>

          <h4 class="text-white font-bold text-lg mb-6">
            Ayuda
          </h4>

          <ul class="space-y-3">
            <li>Soporte</li>
            <li>Políticas</li>
            <li>Envíos</li>
            <li>Pagos</li>
          </ul>

        </div>

        <div>

          <h4 class="text-white font-bold text-lg mb-6">
            Contacto
          </h4>

          <ul class="space-y-3">
            <li>📍 Colombia</li>
            <li>📞 +57 300 000 0000</li>
            <li>✉️ contacto@zeyrastore.com</li>
          </ul>

        </div>

      </div>

      <div
        class="border-t border-gray-800
               py-6 text-center text-sm"
      >
        © {{ new Date().getFullYear() }}
        ZEYRA STORE — Todos los derechos reservados
      </div>

    </footer>

  </div>
</template>