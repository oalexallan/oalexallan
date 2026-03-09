<script setup>
import 'animate.css'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import logoBlue from '@/assets/logo-blue.png'
import heroBg from '@/assets/hero.jpg'

const { t } = useI18n()

const SEEN_KEY = 'home_seen'

const imgVisible  = ref(false)
const textVisible = ref(false)
const btnVisible  = ref(false)
const showMenu    = ref(false)
const leaving     = ref(false)

const navItems = [
  { key: 'projects', icon: '◈', to: '/projects' },
  { key: 'about',    icon: '◉', to: '/about'    },
  { key: 'skills',   icon: '◎', to: '/skills'   },
  { key: 'resume',   icon: '◧', to: '/resume'   },
  { key: 'contact',  icon: '◍', to: '/contact'  },
  { key: 'news',     icon: '◈', to: '/news'     },
  { key: 'games',    icon: '◬', to: '/games'    },
]

onMounted(() => {
  if (localStorage.getItem(SEEN_KEY)) {
    showMenu.value   = true
    imgVisible.value = true
  } else {
    setTimeout(() => { imgVisible.value  = true }, 300)
    setTimeout(() => { textVisible.value = true }, 900)
    setTimeout(() => { btnVisible.value  = true }, 1400)
  }
})

function onContinue() {
  localStorage.setItem(SEEN_KEY, '1')
  leaving.value = true
  setTimeout(() => { showMenu.value = true }, 500)
}
</script>

<template>
  <section class="hero">

    <header class="hero-header animate__animated animate__fadeIn">
      <img :src="logoBlue" alt="oalexallan" class="logo" />
    </header>

    <div class="hero-body">

      <!-- Foto -->
      <div
        class="photo-wrap"
        :class="imgVisible ? 'animate__animated animate__fadeIn' : 'invisible'"
      >
        <img :src="heroBg" alt="hero" class="photo" />
        <div class="photo-fade" />
      </div>

      <!-- Coluna direita -->
      <div class="right-col">

        <!-- TELA 1: boas-vindas -->
        <div
          v-if="!showMenu"
          class="panel welcome-panel"
          :class="leaving ? 'panel-leaving' : ''"
        >
          <div
            class="text-wrap"
            :class="textVisible ? 'animate__animated animate__fadeInUp' : 'invisible'"
          >
            <p class="tagline">{{ t('home.tagline') }}</p>
            <h1 class="welcome-text">{{ t('home.welcome') }}</h1>
          </div>

          <div
            class="btn-wrap"
            :class="btnVisible ? 'animate__animated animate__fadeInUp' : 'invisible'"
          >
            <button class="btn-continue" @click="onContinue" :disabled="leaving">
              {{ t('home.continue') }}
              <span class="arrow">↓</span>
            </button>
          </div>
        </div>

        <!-- TELA 2: menu -->
        <div v-if="showMenu" class="panel menu-panel">

          <div class="bio-wrap animate__animated animate__fadeInDown" style="--animate-duration:0.6s">
            <p class="tagline">Alex Allan</p>
            <p class="bio-text">{{ t('home.bio') }}</p>
          </div>

          <nav class="nav-grid">
            <RouterLink
              v-for="(item, i) in navItems"
              :key="item.key"
              :to="item.to"
              class="nav-card animate__animated animate__fadeInUp"
              :style="{ '--animate-delay': `${i * 70 + 300}ms`, '--animate-duration': '0.45s' }"
            >
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-label">{{ t(`home.nav.${item.key}`) }}</span>
            </RouterLink>
          </nav>

        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* --- Header --- */
.hero-header {
  padding: 2rem 2.5rem;
  --animate-duration: 1.4s;
}

.logo {
  height: 30px;
  width: auto;
  filter: brightness(0) invert(1);
  opacity: 0.8;
}

/* --- Body --- */
.hero-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw 8vh;
  gap: 4vw;
}

/* --- Foto --- */
.photo-wrap {
  flex: 0 0 44%;
  position: relative;
  --animate-duration: 1.6s;
}

.photo {
  width: 100%;
  height: 74vh;
  object-fit: cover;
  object-position: 38% center;
  display: block;
}

.photo-fade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right,  transparent 35%, #000 100%),
    linear-gradient(to bottom, #000 0%,         transparent 14%),
    linear-gradient(to top,    #000 0%,         transparent 14%),
    linear-gradient(to right,  #000 0%,         transparent 10%);
}

/* --- Coluna direita --- */
.right-col {
  flex: 1;
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.panel {
  width: 100%;
}

/* --- Boas-vindas --- */
.welcome-panel {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.panel-leaving .text-wrap {
  animation: exitUp 0.4s ease forwards;
}

.panel-leaving .btn-wrap {
  animation: exitUp 0.4s ease 0.1s forwards;
}

@keyframes exitUp {
  to {
    opacity: 0;
    transform: translateY(-28px);
  }
}

.invisible { opacity: 0; }

.tagline {
  font-size: clamp(0.65rem, 0.9vw, 0.8rem);
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-weight: 400;
  margin-bottom: 0.9rem;
}

.welcome-text {
  font-size: clamp(2.8rem, 5vw, 5rem);
  color: #fff;
  font-weight: 200;
  font-family: 'Georgia', serif;
  letter-spacing: 0.04em;
  line-height: 1.05;
}

.btn-continue {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  cursor: pointer;
  transition: border-color 0.3s, color 0.3s;
}

.btn-continue:disabled { pointer-events: none; }

.btn-continue:hover {
  border-color: rgba(255, 255, 255, 0.65);
  color: #fff;
}

.arrow { transition: transform 0.3s; }

.btn-continue:hover .arrow {
  transform: translateY(4px);
}

/* --- Menu --- */
.menu-panel {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.bio-text {
  font-size: clamp(0.82rem, 1.05vw, 0.96rem);
  color: rgba(255, 255, 255, 0.42);
  font-weight: 300;
  line-height: 1.75;
  max-width: 38ch;
  margin-top: 0.4rem;
}

/* Grid 2 colunas */
.nav-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.55rem;
}

.nav-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.95rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.09);
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
  transition: border-color 0.25s, color 0.25s, background 0.25s;
}

.nav-card:hover {
  border-color: rgba(255, 255, 255, 0.38);
  color: #fff;
  background: rgba(255, 255, 255, 0.04);
}

.nav-icon {
  font-size: 0.9rem;
  opacity: 0.45;
}

.nav-label {
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 400;
}

/* --- Tablet --- */
@media (max-width: 900px) {
  .hero-body {
    flex-direction: column;
    justify-content: center;
    padding: 2vh 8vw 8vh;
    gap: 4vh;
  }

  .photo-wrap {
    flex: none;
    width: 85%;
    max-width: 480px;
  }

  .photo { height: 42vh; }

  .photo-fade {
    background:
      linear-gradient(to bottom, #000 0%, transparent 12%),
      linear-gradient(to top,    #000 0%, transparent 25%),
      linear-gradient(to right,  #000 0%, transparent 8%),
      linear-gradient(to left,   #000 0%, transparent 8%);
  }

  .right-col {
    width: 100%;
    min-height: auto;
    justify-content: center;
  }

  .welcome-panel,
  .bio-wrap { text-align: center; }

  .welcome-panel { align-items: center; }

  .bio-text { max-width: 100%; }

  .nav-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* --- Mobile --- */
@media (max-width: 480px) {
  .photo-wrap { width: 100%; }
  .photo { height: 35vh; }
  .welcome-text { font-size: clamp(2.2rem, 10vw, 3rem); }
  .nav-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
