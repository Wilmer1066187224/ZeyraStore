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
      const existing = this.items.find(
  p => p.id === producto.id && p.talla === producto.talla
)

      if (existing) {
        existing.cantidad++
      } else {
        this.items.push({ ...producto, cantidad: 1 })
      }

      this.saveCart()
    },

  removeFromCart(id, talla) {
  this.items = this.items.filter(
    p => !(p.id === id && p.talla === talla)
  )
  this.saveCart()
},

   increase(id, talla) {
  const item = this.items.find(
    p => p.id === id && p.talla === talla
  )

  if (item) item.cantidad++

  this.saveCart()
},
   decrease(id, talla) {
  const item = this.items.find(
    p => p.id === id && p.talla === talla
  )

  if (item && item.cantidad > 1) {
    item.cantidad--
  } else {
    this.removeFromCart(id, talla)
  }

  this.saveCart()
}
  },

  getters: {
    totalItems: (state) =>
      state.items.reduce((acc, item) => acc + item.cantidad, 0),

    totalPrice: (state) =>
      state.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  }
})
