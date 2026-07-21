import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {

    state: () => ({
        items: JSON.parse(localStorage.getItem('cart')) || []
    }),

    actions: {

        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.items))
        },

       addToCart(producto) {

    console.log("LLEGÓ AL STORE")
    console.log(producto)

    console.log("ID DEL STORE:", producto.id)

    const existing = this.items.find(
        p => Number(p.id) === Number(producto.id)
    )

    if (existing) {

        existing.cantidad++

    } else {

        this.items.push({
            id: Number(producto.id),
            nombre: producto.nombre,
            imagen: producto.imagen,
            precio_venta: Number(producto.precio_venta),
            cantidad: 1
        })

    }

    console.log("CARRITO NUEVO")
    console.table(this.items)

    this.saveCart()
},

        removeFromCart(id) {

            this.items = this.items.filter(
                item => Number(item.id) !== Number(id)
            )

            this.saveCart()

        },

        increase(id) {

            const item = this.items.find(
                p => Number(p.id) === Number(id)
            )

            if (item) {

                item.cantidad++

                this.saveCart()

            }

        },

        decrease(id) {

            const item = this.items.find(
                p => Number(p.id) === Number(id)
            )

            if (!item) return

            if (item.cantidad > 1) {

                item.cantidad--

            } else {

                this.removeFromCart(id)

            }

            this.saveCart()

        },

        clearCart() {

            this.items = []

            this.saveCart()

        }

    },

    getters: {

        totalItems: (state) => {

            return state.items.reduce((total, item) => {

                return total + Number(item.cantidad)

            }, 0)

        },

        totalPrice: (state) => {

            return state.items.reduce((total, item) => {

                return total + (
                    Number(item.precio_venta) *
                    Number(item.cantidad)
                )

            }, 0)

        }

    }

})