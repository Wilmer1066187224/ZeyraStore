<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

const productos = [
  {
    id: 1,
    nombre: "Camiseta urbana",
    precio: 75000,
    imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    categoria: "Streetwear",
    tallas: ["S", "M", "L"]
  },
  {
    id: 2,
    nombre: "Jeans slim fit",
    precio: 140000,
    imagen: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
    categoria: "Denim",
    tallas: ["30", "32", "34"]
  },
  {
    id: 3,
    nombre: "Chaqueta casual",
    precio: 220000,
    imagen: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop",
    categoria: "Premium",
    tallas: ["S", "M", "L"]
  },
  {
    id: 4,
    nombre: "Sneakers Urban",
    precio: 280000,
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    categoria: "Sneakers",
    tallas: ["39", "40", "41"]
  },
]

const addProduct = (producto) => {
  if (!producto.tallaSeleccionada) {
    alert("Selecciona una talla")
    return
  }

  cart.addToCart({
    ...producto,
    talla: producto.tallaSeleccionada
  })
}
</script>

<template>
  <div class="bg-[#f5f5f5] min-h-screen">

    <!-- HERO -->
    <section class="relative h-[420px] overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
        class="absolute inset-0 w-full h-full object-cover"
      />

      <div class="absolute inset-0 bg-black/60"></div>

      <div
        class="relative z-10 h-full max-w-7xl mx-auto px-8
               flex flex-col justify-center text-white"
      >

        <p class="uppercase tracking-[8px] text-fuchsia-400 font-bold text-sm">
          Colección exclusiva
        </p>

        <h1 class="text-5xl lg:text-7xl font-black mt-5 leading-none">
          PRODUCTOS
          <span class="block text-fuchsia-500">
            ZEYRA
          </span>
        </h1>

        <p class="mt-6 text-lg text-gray-300 max-w-2xl leading-relaxed">
          Descubre prendas premium, sneakers exclusivos y moda urbana
          diseñada para destacar tu estilo.
        </p>

      </div>

    </section>

    <!-- FILTROS -->
    <section class="max-w-7xl mx-auto px-8 py-10">

      <div
        class="bg-white rounded-[30px] p-6 shadow-sm
               flex flex-wrap gap-4 justify-between items-center"
      >

        <div class="flex flex-wrap gap-3">

          <button
            class="px-6 py-3 rounded-2xl bg-black text-white font-semibold"
          >
            Todos
          </button>

          <button
            class="px-6 py-3 rounded-2xl bg-[#f3f3f3]
                   hover:bg-black hover:text-white transition"
          >
            Hombre
          </button>

          <button
            class="px-6 py-3 rounded-2xl bg-[#f3f3f3]
                   hover:bg-black hover:text-white transition"
          >
            Sneakers
          </button>

          <button
            class="px-6 py-3 rounded-2xl bg-[#f3f3f3]
                   hover:bg-black hover:text-white transition"
          >
            Streetwear
          </button>

        </div>

        <select
          class="bg-[#f5f5f5] px-5 py-3 rounded-2xl
                 outline-none border border-gray-200"
        >
          <option>Más recientes</option>
          <option>Menor precio</option>
          <option>Mayor precio</option>
        </select>

      </div>

    </section>

    <!-- PRODUCTOS -->
    <section class="max-w-7xl mx-auto px-8 pb-24">

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <router-link
          v-for="producto in productos"
          :key="producto.id"
          :to="`/producto/${producto.id}`"
          class="group bg-white rounded-[35px]
                 overflow-hidden relative
                 border border-gray-100
                 hover:-translate-y-3
                 hover:shadow-2xl
                 transition duration-500 block"
        >

          <!-- IMAGE -->
          <div class="relative overflow-hidden">

            <img
              :src="producto.imagen"
              class="h-80 w-full object-cover
                     group-hover:scale-110
                     transition duration-700"
            />

            <!-- BADGE -->
            <div
              class="absolute top-5 left-5
                     bg-black text-white
                     text-xs font-bold
                     px-4 py-2 rounded-full"
            >
              {{ producto.categoria }}
            </div>

            <!-- OVERLAY -->
            <div
              class="absolute inset-0 bg-black/50
                     opacity-0 group-hover:opacity-100
                     transition duration-300
                     flex flex-col justify-end p-5"
            >

              <!-- TALLAS -->
              <div class="flex gap-2 mb-4">

                <button
                  v-for="talla in producto.tallas"
                  :key="talla"
                  @click.stop="producto.tallaSeleccionada = talla"
                  :class="[
                    'px-4 py-2 rounded-xl text-sm font-semibold transition',
                    producto.tallaSeleccionada === talla
                      ? 'bg-fuchsia-600 text-white'
                      : 'bg-white text-black hover:bg-black hover:text-white'
                  ]"
                >
                  {{ talla }}
                </button>

              </div>

              <!-- BTN -->
              <button
                @click.stop="addProduct(producto)"
                class="bg-white text-black py-3 rounded-2xl
                       font-bold hover:bg-fuchsia-600
                       hover:text-white transition"
              >
                Agregar al carrito
              </button>

            </div>

          </div>

          <!-- INFO -->
          <div class="p-6">

            <p class="text-sm text-fuchsia-600 font-bold uppercase tracking-wide">
              {{ producto.categoria }}
            </p>

            <h2 class="mt-2 text-2xl font-black text-black">
              {{ producto.nombre }}
            </h2>

            <p class="mt-3 text-gray-500 leading-relaxed text-sm">
              Diseño moderno inspirado en las tendencias urbanas premium.
            </p>

            <div class="mt-6 flex justify-between items-center">

              <span class="text-3xl font-black text-black">
                ${{ producto.precio.toLocaleString('es-CO') }}
              </span>

              <div
                class="w-11 h-11 rounded-2xl bg-[#f3f3f3]
                       flex items-center justify-center
                       group-hover:bg-black group-hover:text-white
                       transition"
              >
                →
              </div>

            </div>

          </div>

        </router-link>

      </div>

    </section>

  </div>
</template>