<script setup>
import 'animate.css'
import { ref, watch, onMounted } from 'vue'
import { useI18n }    from 'vue-i18n'
import { useApiStore } from '@/stores/api.js'
import PageShell from '@/components/PageShell.vue'

const { t, locale } = useI18n()
const api = useApiStore()

const visible = ref([])

async function load() {
  visible.value = []
  await api.fetchSkills(locale.value)
  api.skills.forEach((_, i) => {
    setTimeout(() => { visible.value.push(i) }, 300 + i * 60)
  })
}

onMounted(load)
watch(locale, load)
</script>

<template>
  <PageShell :title="t('skills.title')">

    <div v-if="api.skillsLoading" class="state-msg">{{ t('common.loading') }}</div>
    <div v-else-if="api.skillsError" class="state-msg state-error">
      <span class="state-icon">◌</span>
      <span>Serviço indisponível.</span>
    </div>

    <!-- Grid -->
    <div v-else class="skills-grid">
      <div
        v-for="(skill, i) in api.skills"
        :key="skill.id || i"
        class="skill-card animate__animated animate__fadeInUp"
        :class="{ invisible: !visible.includes(i) }"
        :style="{ '--animate-duration': '0.45s' }"
      >
        <h3 class="skill-name">{{ skill.name }}</h3>
        <p class="skill-desc">{{ skill.description }}</p>
      </div>
    </div>

  </PageShell>
</template>

<style scoped>
.state-msg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  height: 40vh;
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-align: center;
}

.state-error { color: rgba(255, 255, 255, 0.2); }

.state-icon {
  font-size: 1.6rem;
  opacity: 0.4;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
}

.skill-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.4rem 1.6rem;
  transition: border-color 0.25s, background 0.25s;
}

.skill-card:hover {
  border-color: rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.03);
}

.skill-name {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}

.skill-desc {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.38);
  font-weight: 300;
  line-height: 1.75;
}

.invisible { opacity: 0; }

@media (max-width: 768px) {
  .skills-grid { grid-template-columns: 1fr; }
}
</style>
