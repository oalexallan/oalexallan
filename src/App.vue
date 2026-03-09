<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginModal from '@/components/LoginModal.vue'

const auth      = useAuthStore()
const showLogin = ref(false)
</script>

<template>
  <div class="app-root">
    <div class="login-bar">
      <template v-if="auth.isLoggedIn">
        <span class="user-name">{{ auth.user.name }}</span>
        <button class="btn-login" @click="auth.logout()">Sair</button>
      </template>
      <template v-else>
        <button class="btn-login" @click="showLogin = true">Login</button>
      </template>
    </div>

    <RouterView />

    <LoginModal v-if="showLogin" @close="showLogin = false" />
  </div>
</template>

<style scoped>
.app-root {
  position: relative;
  min-height: 100vh;
}

.login-bar {
  position: fixed;
  top: 1.6rem;
  right: 2rem;
  z-index: 500;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.user-name {
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
}

.btn-login {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.45rem 1.1rem;
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s;
}
.btn-login:hover {
  border-color: rgba(255, 255, 255, 0.55);
  color: #fff;
}
</style>
