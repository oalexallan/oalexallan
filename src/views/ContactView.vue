<script setup>
import { ref, computed } from 'vue'
import { useI18n }      from 'vue-i18n'
import { useRouter }    from 'vue-router'
import PageShell        from '@/components/PageShell.vue'
import { useAuthStore } from '@/stores/auth'

const { t, locale } = useI18n()
const auth   = useAuthStore()
const router = useRouter()

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const MAX       = 1500
const message   = ref('')
const sent      = ref(false)
const sending   = ref(false)
const sendError = ref(null)
const countdown = ref(5)
const remaining = computed(() => MAX - message.value.length)

async function send() {
  if (!message.value.trim() || sending.value) return
  sending.value   = true
  sendError.value = null

  try {
    const res = await fetch(`${BASE}/contact`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${auth.user.token}`,
      },
      body: JSON.stringify({
        message:   message.value.trim(),
        userAgent: navigator.userAgent,
        lang:      locale.value,
      }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Erro ao enviar.')

    sent.value    = true
    message.value = ''
    countdown.value = 5
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        router.push('/')
      }
    }, 1000)
  } catch (e) {
    sendError.value = e.message
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <PageShell :title="t('home.nav.contact')">

    <!-- Sem login -->
    <div v-if="!auth.isLoggedIn" class="blocked">
      <p class="blocked-icon">◍</p>
      <p class="blocked-msg">Faça login para enviar uma mensagem de contato.</p>
    </div>

    <!-- Com login -->
    <div v-else class="contact-wrap">

      <Transition name="fade">
        <div v-if="sent" class="success-msg animate__animated animate__fadeIn">
          <span class="success-icon">✓</span>
          <p class="success-title">Mensagem enviada!</p>
          <p class="success-sub">Redirecionando em {{ countdown }}s...</p>
        </div>
      </Transition>

      <form v-if="!sent" class="contact-form" @submit.prevent="send">
        <label class="form-label">Mensagem</label>

        <textarea
          v-model="message"
          class="textarea"
          :maxlength="MAX"
          placeholder="Escreva sua mensagem..."
          rows="8"
        />

        <div class="form-footer">
          <span class="char-count" :class="{ warn: remaining < 200 }">
            {{ remaining }} caracteres restantes
          </span>
          <button type="submit" class="btn-send" :disabled="!message.trim() || sending">
            {{ sending ? '...' : 'Enviar' }}
          </button>
        </div>

        <p v-if="sendError" class="send-error">{{ sendError }}</p>
      </form>

    </div>

  </PageShell>
</template>

<style scoped>
/* --- Bloqueado --- */
.blocked {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 1.2rem;
  text-align: center;
}

.blocked-icon {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.12);
}

.blocked-msg {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.06em;
  line-height: 1.7;
}

/* --- Formulário --- */
.contact-wrap {
  max-width: 580px;
  margin: 0 auto;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.form-label {
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
}

.textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
  line-height: 1.75;
  padding: 1rem 1.2rem;
  resize: vertical;
  outline: none;
  transition: border-color 0.25s;
  font-family: inherit;
}

.textarea::placeholder { color: rgba(255, 255, 255, 0.2); }
.textarea:focus { border-color: rgba(255, 255, 255, 0.3); }

.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.char-count {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0.1em;
  transition: color 0.3s;
}
.char-count.warn { color: rgba(255, 160, 60, 0.75); }

.btn-send {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  padding: 0.7rem 1.8rem;
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s;
}
.btn-send:hover {
  border-color: rgba(255, 255, 255, 0.55);
  color: #fff;
}
.btn-send:disabled {
  opacity: 0.3;
  pointer-events: none;
}

/* --- Sucesso --- */
.success-msg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 2rem;
  text-align: center;
  --animate-duration: 0.5s;
}

.success-icon {
  font-size: 1.8rem;
  color: rgba(100, 220, 160, 0.5);
}

.success-title {
  font-size: 0.88rem;
  color: rgba(100, 220, 160, 0.75);
  letter-spacing: 0.1em;
}

.success-sub {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.15em;
}

.send-error {
  font-size: 0.72rem;
  color: rgba(220, 90, 90, 0.7);
  letter-spacing: 0.08em;
  margin-top: 0.2rem;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
