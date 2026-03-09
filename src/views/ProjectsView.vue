<script setup>
import 'animate.css'
import { ref, watch, onMounted } from 'vue'
import { useI18n }    from 'vue-i18n'
import { useApiStore } from '@/stores/api.js'
import PageShell from '@/components/PageShell.vue'

const { t, locale } = useI18n()
const api = useApiStore()

const visible = ref([])

const difficultyColor = {
  easy:   'rgba(100, 220, 160, 0.7)',
  medium: 'rgba(220, 180, 80, 0.7)',
  hard:   'rgba(220, 90, 90, 0.7)',
}

async function load() {
  visible.value = []
  await api.fetchProjects(locale.value)
  api.projects.forEach((_, i) => {
    setTimeout(() => visible.value.push(i), 150 + i * 80)
  })
}

onMounted(load)
watch(locale, load)
</script>

<template>
  <PageShell :title="t('projects.title')">

    <div v-if="api.projectsLoading" class="state-msg">{{ t('common.loading') }}</div>
    <div v-else-if="api.projectsError" class="state-msg state-error">
      <span class="state-icon">◌</span>
      <span>Serviço indisponível.</span>
    </div>

    <div v-else class="projects-grid">
      <div
        v-for="(project, i) in api.projects"
        :key="project.id || i"
        class="project-card animate__animated animate__fadeInUp"
        :class="{ invisible: !visible.includes(i) }"
        :style="{ '--animate-duration': '0.5s' }"
      >
        <!-- Imagem -->
        <div class="card-img-wrap">
          <img :src="project.image" :alt="project.title" class="card-img" loading="lazy" />
          <span
            class="badge-difficulty"
            :style="{ color: difficultyColor[project.difficulty] }"
          >{{ t(`projects.difficulty.${project.difficulty}`) }}</span>
        </div>

        <!-- Conteúdo -->
        <div class="card-body">
          <h3 class="card-title">{{ project.title }}</h3>
          <p class="card-desc">{{ project.description }}</p>

          <!-- Linguagens -->
          <div class="card-langs">
            <span v-for="lang in project.languages" :key="lang" class="lang-tag">
              {{ lang }}
            </span>
          </div>

          <!-- Links -->
          <div class="card-links">
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener"
              class="card-link"
            >{{ t('projects.github') }}</a>
            <a
              v-if="project.pageUrl"
              :href="project.pageUrl"
              target="_blank"
              rel="noopener"
              class="card-link card-link--demo"
            >{{ t('projects.demo') }}</a>
            <a
              v-if="project.gColabUrl"
              :href="project.gColabUrl"
              target="_blank"
              rel="noopener"
              class="card-link card-link--colab"
            >{{ t('projects.colab') }}</a>
          </div>
        </div>
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.7rem;
}

.invisible { opacity: 0; }

/* --- Card --- */
.project-card {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.25s, background 0.25s;
  overflow: hidden;
}

.project-card:hover {
  border-color: rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.02);
}

/* --- Imagem --- */
.card-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: rgba(255,255,255,0.03);
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
  filter: brightness(0.85);
}

.project-card:hover .card-img {
  transform: scale(1.04);
  filter: brightness(1);
}

.badge-difficulty {
  position: absolute;
  top: 0.7rem;
  right: 0.8rem;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 500;
}

/* --- Body --- */
.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.2rem 1.3rem 1.1rem;
}

.card-title {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.88);
  font-weight: 500;
  letter-spacing: 0.05em;
}

.card-desc {
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 300;
  line-height: 1.75;
  flex: 1;
}

/* --- Lang tags --- */
.card-langs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.lang-tag {
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.2rem 0.55rem;
}

/* --- Links --- */
.card-links {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: auto;
}

.card-link {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.35rem 0.9rem;
  transition: color 0.2s, border-color 0.2s;
}

.card-link:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.5);
}

.card-link--demo {
  color: rgba(100, 200, 255, 0.6);
  border-color: rgba(100, 200, 255, 0.2);
}

.card-link--demo:hover {
  color: rgba(100, 200, 255, 1);
  border-color: rgba(100, 200, 255, 0.6);
}

.card-link--colab {
  color: rgba(255, 165, 60, 0.6);
  border-color: rgba(255, 165, 60, 0.2);
}

.card-link--colab:hover {
  color: rgba(255, 165, 60, 1);
  border-color: rgba(255, 165, 60, 0.6);
}

/* --- Tablet --- */
@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
