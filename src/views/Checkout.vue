<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'


const auth = useAuthStore()
const router = useRouter()
const cart = useCartStore()

const envio = ref({
  nombre: '',
  apellido: '',
  email: '',
  documento: '',
  direccion: '',
  ciudad: '',
  telefono: ''
})

const metodoPago = ref('tarjeta')

const subtotal = computed(() => cart.totalPrice)

const envioCosto = computed(() =>
  subtotal.value > 250000 ? 0 : 15000
)

const total = computed(() =>
  subtotal.value + envioCosto.value
)

// Cargar automáticamente los datos del cliente
onMounted(() => {

  console.log(auth.user)

  if (auth.user) {

envio.value.nombre = auth.user.nombre
envio.value.apellido = auth.user.apellido
envio.value.email = auth.user.correo
envio.value.documento = auth.user.documento
envio.value.telefono = auth.user.telefono
envio.value.direccion = auth.user.direccion
envio.value.ciudad = auth.user.ciudad

  }

})




const finalizarCompra = async () => {

    if (!auth.isAuthenticated) {
        alert('Debes iniciar sesión para finalizar tu compra.')
        router.push('/login')
        return
    }

    if (
        !envio.value.nombre ||
        !envio.value.email ||
        !envio.value.documento ||
        !envio.value.telefono ||
        !envio.value.ciudad
    ) {
        alert('Completa los datos requeridos')
        return
    }

    // Mostrar el carrito
    console.log("CARRITO:")
    console.table(cart.items)

    const productos = cart.items.map(item => ({
        producto_id: Number(item.id),
        cantidad: Number(item.cantidad)
    }))

    const ventaData = {
        nombre: envio.value.nombre,
        apellido: envio.value.apellido,
        email: envio.value.email,
        documento: envio.value.documento,
        telefono: envio.value.telefono,
        ciudad: envio.value.ciudad,
        metodo_pago: metodoPago.value,
        productos: productos
    }


    try {

        const response = await axios.post(
            'http://127.0.0.1:8000/api/ventas',
            ventaData
        )

        console.log(response.data)

        cart.items = []
        cart.saveCart()

        router.push('/pedido-exitoso/' + response.data.venta.id)

    } catch (error) {

        console.log(error)

        if (error.response) {

            console.log(error.response.data)

            alert(JSON.stringify(error.response.data))

        } else {

            alert(error.message)

        }

    }

}


</script>

<template>
  <section
    class="min-h-screen bg-[#f3f4f6]
           pt-28 pb-20"
  >

    <!-- TOP -->
    <div class="max-w-7xl mx-auto px-6 mb-10">

      <div
        class="flex items-center justify-between
               flex-wrap gap-6"
      >

        <div>

          <p
            class="uppercase tracking-[4px]
                   text-gray-500 text-sm
                   font-semibold"
          >
            Checkout
          </p>

          <h1
            class="text-4xl md:text-5xl
                   font-black text-[#111]"
          >
            Finalizar compra
          </h1>

        </div>

        <!-- STEPS -->
        <div
          class="flex items-center gap-4
                 text-sm font-medium"
        >

          <div class="flex items-center gap-2">
            <div
              class="w-9 h-9 rounded-full
                     bg-black text-white
                     flex items-center justify-center"
            >
              ✓
            </div>

            <span class="text-gray-500">
              Carrito
            </span>
          </div>

          <div class="w-10 h-[2px] bg-gray-300"></div>

          <div class="flex items-center gap-2">
            <div
              class="w-9 h-9 rounded-full
                     bg-[#1f2937] text-white
                     flex items-center justify-center"
            >
              2
            </div>

            <span class="font-bold text-[#111]">
              Información
            </span>
          </div>

          <div class="w-10 h-[2px] bg-gray-300"></div>

          <div class="flex items-center gap-2">
            <div
              class="w-9 h-9 rounded-full
                     bg-gray-200 text-gray-500
                     flex items-center justify-center"
            >
              3
            </div>

            <span class="text-gray-400">
              Pago
            </span>
          </div>

        </div>

      </div>

    </div>

    <!-- CONTENT -->
    <div
      class="max-w-7xl mx-auto px-6
             grid xl:grid-cols-[1.2fr_0.8fr]
             gap-8"
    >

      <!-- LEFT -->
      <div
        class="bg-white rounded-[28px]
               border border-gray-200
               shadow-sm p-7 md:p-10"
      >

        <!-- TITLE -->
        <div class="mb-8">

          <h2 class="text-2xl font-black text-[#111]">
            Información de envío
          </h2>

          <p class="text-gray-500 mt-2">
            Completa tus datos para continuar.
          </p>

        </div>

        <!-- FORM -->
        <div class="space-y-6">

          <!-- EMAIL -->
          <div>

            <label
              class="block text-sm font-semibold
                     text-gray-700 mb-2"
            >
              Correo electrónico
            </label>

            <input
              v-model="envio.email"
              type="email"
              placeholder="correo@email.com"
              class="w-full h-14 px-5
                     rounded-2xl
                     bg-[#f9fafb]
                     border border-gray-200
                     outline-none transition
                     focus:border-[#111]
                     focus:bg-white"
            />
   <div>

  <label
    class="block text-sm font-semibold
           text-gray-700 mb-2"
  >
    Cédula de ciudadanía
  </label>

  <input
    v-model="envio.documento"
    type="text"
    placeholder="Ej: 1065000001"
    class="w-full h-14 px-5
           rounded-2xl
           bg-[#f9fafb]
           border border-gray-200
           outline-none transition
           focus:border-[#111]
           focus:bg-white"
  />

</div>

          </div>

          <!-- ROW -->
          <div class="grid md:grid-cols-2 gap-5">

            <div>

              <label
                class="block text-sm font-semibold
                       text-gray-700 mb-2"
              >
                Nombre
              </label>

              <input
                v-model="envio.nombre"
                type="text"
                placeholder="Tu nombre"
                class="w-full h-14 px-5
                       rounded-2xl
                       bg-[#f9fafb]
                       border border-gray-200
                       outline-none transition
                       focus:border-[#111]
                       focus:bg-white"
              />

            </div>

            <div>

              <label
                class="block text-sm font-semibold
                       text-gray-700 mb-2"
              >
                Apellido
              </label>

              <input
                v-model="envio.apellido"
                type="text"
                placeholder="Tu apellido"
                class="w-full h-14 px-5
                       rounded-2xl
                       bg-[#f9fafb]
                       border border-gray-200
                       outline-none transition
                       focus:border-[#111]
                       focus:bg-white"
              />

            </div>

          </div>

          <!-- 
          <div>

            <label
              class="block text-sm font-semibold
                     text-gray-700 mb-2"
            >
              Dirección
            </label>

            <input
              v-model="envio.direccion"
              type="text"
              placeholder="Dirección de entrega"
              class="w-full h-14 px-5
                     rounded-2xl
                     bg-[#f9fafb]
                     border border-gray-200
                     outline-none transition
                     focus:border-[#111]
                     focus:bg-white"
            />

          </div>
             ADDRESS -->
          <!-- ROW -->
          <div class="grid md:grid-cols-2 gap-5">

            <div>

              <label
                class="block text-sm font-semibold
                       text-gray-700 mb-2"
              >
                Ciudad
              </label>

              <input
                v-model="envio.ciudad"
                type="text"
                placeholder="Ciudad"
                class="w-full h-14 px-5
                       rounded-2xl
                       bg-[#f9fafb]
                       border border-gray-200
                       outline-none transition
                       focus:border-[#111]
                       focus:bg-white"
              />

            </div>

            <div>

              <label
                class="block text-sm font-semibold
                       text-gray-700 mb-2"
              >
                Teléfono
              </label>

              <input
                v-model="envio.telefono"
                type="text"
                placeholder="+57 300 000 0000"
                class="w-full h-14 px-5
                       rounded-2xl
                       bg-[#f9fafb]
                       border border-gray-200
                       outline-none transition
                       focus:border-[#111]
                       focus:bg-white"
              />

            </div>

          </div>

        </div>

        <!-- PAYMENT -->
        <div class="mt-10">

          <h2
            class="text-2xl font-black
                   text-[#111] mb-6"
          >
            Método de pago
          </h2>

          <div class="space-y-4">

            <!-- TARJETA -->
            <label
              class="flex items-center justify-between
                     border border-gray-200
                     rounded-2xl p-5
                     cursor-pointer
                     hover:border-black
                     transition"
            >

              <div class="flex items-center gap-4">

                <input
                  type="radio"
                  value="tarjeta"
                  v-model="metodoPago"
                  class="accent-black"
                />

                <div>

                  <p class="font-bold">
                    Tarjeta crédito / débito
                  </p>

                  <p class="text-sm text-gray-500">
                    Visa, Mastercard
                  </p>

                </div>

              </div>

              <span class="text-2xl">
                💳
              </span>

            </label>

            <!-- PSE -->
            <label
              class="flex items-center justify-between
                     border border-gray-200
                     rounded-2xl p-5
                     cursor-pointer
                     hover:border-black
                     transition"
            >

              <div class="flex items-center gap-4">

                <input
                  type="radio"
                  value="pse"
                  v-model="metodoPago"
                  class="accent-black"
                />

                <div>

                  <p class="font-bold">
                    PSE
                  </p>

                  <p class="text-sm text-gray-500">
                    Pago desde tu banco
                  </p>

                </div>

              </div>

              <span class="text-2xl">
                🏦
              </span>

            </label>

            <!-- CONTRA -->
            <label
              class="flex items-center justify-between
                     border border-gray-200
                     rounded-2xl p-5
                     cursor-pointer
                     hover:border-black
                     transition"
            >

              <div class="flex items-center gap-4">

                <input
                  type="radio"
                  value="contraentrega"
                  v-model="metodoPago"
                  class="accent-black"
                />

                <div>

                  <p class="font-bold">
                    Contra entrega
                  </p>

                  <p class="text-sm text-gray-500">
                    Paga al recibir
                  </p>

                </div>

              </div>

              <span class="text-2xl">
                📦
              </span>

            </label>

          </div>

        </div>

        <!-- BTN -->
        <button
          @click="finalizarCompra"
          class="w-full mt-10 h-16
                 rounded-2xl
                 bg-[#111]
                 text-white
                 font-bold text-lg
                 hover:bg-[#222]
                 transition"
        >
          Finalizar compra
        </button>

      </div>

      <!-- RIGHT -->
      <div>

        <div
          class="bg-white rounded-[28px]
                 border border-gray-200
                 shadow-sm
                 sticky top-28"
        >

          <!-- HEADER -->
          <div
            class="border-b border-gray-100
                   px-7 py-6"
          >

            <h2
              class="text-2xl font-black
                     text-[#111]"
            >
              Resumen del pedido
            </h2>

          </div>

          <!-- PRODUCTS -->
          <div class="p-7 space-y-6">

            <div
              v-for="item in cart.items"
              :key="item.id + item.talla"
              class="flex gap-4"
            >

              <img
                :src="item.imagen"
                class="w-24 h-24 rounded-2xl
                       object-cover"
              />

              <div class="flex-1">

                <h3
                  class="font-bold leading-tight"
                >
                  {{ item.nombre }}
                </h3>

                <p
                  class="text-sm text-gray-500 mt-2"
                >
                  Talla {{ item.talla }}
                </p>

                <p
                  class="text-sm text-gray-500"
                >
                  Cantidad: {{ item.cantidad }}
                </p>

                <p
                  class="font-black text-lg mt-3"
                >
                  ${{ (item.precio_venta * item.cantidad).toLocaleString('es-CO') }}
                </p>

              </div>

            </div>

            <!-- TOTALS -->
            <div
              class="border-t border-gray-200
                     pt-6 space-y-4"
            >

              <div class="flex justify-between">

                <span class="text-gray-500">
                  Subtotal
                </span>

                <span class="font-semibold">
                  ${{ subtotal.toLocaleString('es-CO') }}
                </span>

              </div>

              <div class="flex justify-between">

                <span class="text-gray-500">
                  Envío
                </span>

                <span class="font-semibold">
                  {{
                    envioCosto === 0
                      ? 'Gratis'
                      : '$' + envioCosto.toLocaleString('es-CO')
                  }}
                </span>

              </div>

              <div
                class="flex justify-between
                       items-center
                       border-t border-gray-200
                       pt-5"
              >

                <span
                  class="text-xl font-black"
                >
                  Total
                </span>

                <span
                  class="text-3xl font-black
                         text-[#111]"
                >
                  ${{ total.toLocaleString('es-CO') }}
                </span>

              </div>

            </div>

            <!-- SECURITY -->
            <div
              class="bg-[#f9fafb]
                     border border-gray-200
                     rounded-2xl p-5"
            >

              <div class="flex gap-3">

                <div class="text-2xl">
                  🔒
                </div>

                <div>

                  <p class="font-bold text-[#111]">
                    Compra segura
                  </p>

                  <p
                    class="text-sm text-gray-500
                           mt-1 leading-relaxed"
                  >
                    Tus pagos y datos están protegidos.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </section>
</template>