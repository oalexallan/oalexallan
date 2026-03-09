<script setup>
import 'animate.css'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  title: { type: String, required: true },
})

const router = useRouter()
const visible = ref(false)
onMounted(() => setTimeout(() => { visible.value = true }, 150))
</script>

<template>
  <section class="page">
    <header
      class="page-header"
      :class="visible ? 'animate__animated animate__fadeInDown' : 'invisible'"
      style="--animate-duration:0.6s"
    >
      <button class="btn-back" @click="router.push('/')">← home</button>
      <h2 class="page-title">{{ title }}</h2>
    </header>

    <div
      class="page-body"
      :class="visible ? 'animate__animated animate__fadeIn' : 'invisible'"
      style="--animate-duration:0.7s; --animate-delay:0.2s"
    >
      <slot />
    </div>
  </section>
</template>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: column;
  padding: 2rem 5vw 6rem;
}

.invisible { opacity: 0; }

.page-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.btn-back {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.25s;
  padding: 0;
}

.btn-back:hover { color: rgba(255, 255, 255, 0.8); }

.page-title {
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  color: #fff;
  font-weight: 200;
  font-family: 'Georgia', serif;
  letter-spacing: 0.1em;
}

.page-body {
  flex: 1;
}
</style>
