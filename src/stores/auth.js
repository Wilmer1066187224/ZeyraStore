import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {

    const token = ref(localStorage.getItem('token') || null)

    const user = ref(
        JSON.parse(localStorage.getItem('cliente')) || null
    )

    const isAuthenticated = computed(() => !!token.value)

    function login(tokenValue, cliente) {

        token.value = tokenValue
        user.value = cliente

        localStorage.setItem('token', tokenValue)
        localStorage.setItem('cliente', JSON.stringify(cliente))

    }

    function logout() {

        token.value = null
        user.value = null

        localStorage.removeItem('token')
        localStorage.removeItem('cliente')

    }

    return {
        token,
        user,
        isAuthenticated,
        login,
        logout
    }

})