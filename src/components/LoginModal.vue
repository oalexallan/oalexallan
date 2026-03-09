<script setup>
import 'animate.css'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const emit  = defineEmits(['close'])
const auth  = useAuthStore()

const tab      = ref('login')   // 'login' | 'register'
const username = ref('')
const password = ref('')
const error    = ref('')
const loading  = ref(false)

function close() { emit('close') }

async function submit() {
  error.value = ''
  loading.value = true
  try {
    auth.loginWithCredentials(username.value, password.value)
    close()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function googleLogin() {
  auth.loginWithGoogle()
  close()
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-backdrop" @click.self="close">
      <div class="modal-glass animate__animated animate__fadeInDown" style="--animate-duration:0.35s">

        <!-- Fechar -->
        <button class="btn-close" @click="close">✕</button>

        <!-- Tabs -->
        <div class="tabs">
          <button :class="['tab', { active: tab === 'login' }]" @click="tab = 'login'">
            Entrar
          </button>
          <button :class="['tab', { active: tab === 'register' }]" @click="tab = 'register'">
            Registrar
          </button>
        </div>

        <!-- Google -->
        <button class="btn-google" @click="googleLogin">
          <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
            <path d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z" fill="#FFC107"/>
            <path d="M6.3 14.7l6.6 4.8C14.6 16 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" fill="#FF3D00"/>
            <path d="M24 44c5.5 0 10.4-2.1 14.1-5.4l-6.5-5.5C29.6 34.9 27 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.6 35.6 16.3 44 24 44z" fill="#4CAF50"/>
            <path d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.5 5.5C37.4 39.5 44 35 44 24c0-1.2-.1-2.4-.4-3.5z" fill="#1976D2"/>
          </svg>
          Continuar com Google
        </button>

        <div class="divider"><span>ou</span></div>

        <!-- Form -->
        <form @submit.prevent="submit" class="form">
          <input
            v-model="username"
            type="text"
            :placeholder="tab === 'login' ? 'Usuário' : 'Escolha um usuário'"
            class="input"
            autocomplete="username"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Senha"
            class="input"
            autocomplete="current-password"
          />
          <p v-if="error" class="error">{{ error }}</p>
          <button type="submit" class="btn-submit" :disabled="loading">
            {{ tab === 'login' ? 'Entrar' : 'Criar conta' }}
          </button>
        </form>

      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-glass {
  position: relative;
  width: min(420px, 92vw);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 2.4rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.btn-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.8rem;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
}
.btn-close:hover { color: #fff; }

/* Tabs */
.tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.tab {
  background: none;
  border: none;
  color: rgba(255,255,255,0.35);
  font-size: 0.78rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.5rem 1.2rem 0.8rem;
  cursor: pointer;
  transition: color 0.2s;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}
.tab.active {
  color: #fff;
  border-bottom-color: rgba(255,255,255,0.5);
}

/* Google */
.btn-google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.75);
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  width: 100%;
}
.btn-google:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.3);
  color: #fff;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: rgba(255,255,255,0.2);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.1);
}

/* Form */
.form { display: flex; flex-direction: column; gap: 0.7rem; }

.input {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  font-size: 0.82rem;
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
}
.input::placeholder { color: rgba(255,255,255,0.25); }
.input:focus { border-color: rgba(255,255,255,0.35); }

.error {
  font-size: 0.74rem;
  color: rgba(255, 100, 100, 0.85);
  letter-spacing: 0.05em;
}

.btn-submit {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.8rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  margin-top: 0.3rem;
}
.btn-submit:hover {
  background: rgba(255,255,255,0.16);
  border-color: rgba(255,255,255,0.4);
}
.btn-submit:disabled { opacity: 0.5; pointer-events: none; }
</style>
