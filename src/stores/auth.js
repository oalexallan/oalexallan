import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'))

  const isLoggedIn = computed(() => !!user.value)

  function loginWithCredentials(username, password) {
    // Placeholder — substituir por chamada à API
    if (!username || !password) throw new Error('Preencha todos os campos.')
    const u = { name: username, provider: 'credentials', avatar: null }
    user.value = u
    localStorage.setItem('auth_user', JSON.stringify(u))
  }

  async function loginWithGoogle() {
    const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const res  = await fetch(`${BASE}/auth/google/url`)
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  function handleGoogleCallback(token) {
    const base64  = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('')))
    const u = { name: payload.name, email: payload.email, avatar: payload.picture || null, provider: 'google', token }
    user.value = u
    localStorage.setItem('auth_user', JSON.stringify(u))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('auth_user')
  }

  return { user, isLoggedIn, loginWithCredentials, loginWithGoogle, handleGoogleCallback, logout }
})
