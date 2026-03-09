<script setup>
import { useI18n } from 'vue-i18n'
import PageShell from '@/components/PageShell.vue'
const { t } = useI18n()
</script>

<template>
  <PageShell :title="t('home.nav.about')">
    <div class="coming-soon">
      <p>Em breve</p>
    </div>
  </PageShell>
</template>

<style scoped>
.coming-soon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.18);
}
</style>
