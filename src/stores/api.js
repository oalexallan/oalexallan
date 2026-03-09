import { defineStore } from 'pinia'
import { ref }         from 'vue'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function apiFetch(path, lang) {
  const url = `${BASE}${path}?lang=${lang}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`)
  return res.json()
}

export const useApiStore = defineStore('api', () => {
  // ── Skills ──────────────────────────────────────
  const skills        = ref([])
  const skillsLoading = ref(false)
  const skillsError   = ref(null)

  async function fetchSkills(lang = 'pt') {
    skillsLoading.value = true
    skillsError.value   = null
    try {
      const data   = await apiFetch('/skills', lang)
      skills.value = data.items || []
    } catch (e) {
      skillsError.value = e.message
    } finally {
      skillsLoading.value = false
    }
  }

  // ── Projects ─────────────────────────────────────
  const projects        = ref([])
  const projectsLoading = ref(false)
  const projectsError   = ref(null)

  async function fetchProjects(lang = 'pt') {
    projectsLoading.value = true
    projectsError.value   = null
    try {
      const data      = await apiFetch('/projects', lang)
      projects.value  = data.items || []
    } catch (e) {
      projectsError.value = e.message
    } finally {
      projectsLoading.value = false
    }
  }

  // ── About ────────────────────────────────────────
  const about        = ref(null)
  const aboutLoading = ref(false)
  const aboutError   = ref(null)

  async function fetchAbout(lang = 'pt') {
    aboutLoading.value = true
    aboutError.value   = null
    try {
      about.value = await apiFetch('/about', lang)
    } catch (e) {
      aboutError.value = e.message
    } finally {
      aboutLoading.value = false
    }
  }

  return {
    skills, skillsLoading, skillsError, fetchSkills,
    projects, projectsLoading, projectsError, fetchProjects,
    about, aboutLoading, aboutError, fetchAbout,
  }
})
