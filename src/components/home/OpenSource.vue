<script setup lang="ts">
import { Star, GitFork, Package, Users } from 'lucide-vue-next'

const stats = [
  { icon: Star, label: 'Stars', value: '1.2k+', color: '#FACC15' },
  { icon: GitFork, label: 'Forks', value: '280+', color: '#60A5FA' },
  { icon: Package, label: 'Releases', value: '18', color: '#34D399' },
  { icon: Users, label: 'Contributors', value: '30+', color: '#C084FC' },
]
</script>

<template>
  <section class="opensource-section">
    <div class="opensource-container">
      <h2 class="section-title">
        <span class="gradient-text">开源 · 透明 · 可信赖</span>
      </h2>
      <p class="section-subtitle">
        MIT 许可证 · 完全免费 · 支持私有化部署
      </p>

      <!-- Stats -->
      <div class="stats-grid">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="glass-card stat-card"
        >
          <component :is="stat.icon" :size="24" :style="{ color: stat.color }" />
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Star button -->
      <div style="text-align: center;">
        <a
          href="https://github.com/lingmengcan/lingmengcan-ai"
          target="_blank"
          rel="noopener"
          class="btn-primary"
        >
          <Star :size="18" />
          Star on GitHub
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.opensource-section {
  padding: 96px 24px;
  background: linear-gradient(to bottom, transparent, #0D0D15, transparent);
}

.opensource-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 700px;
  margin: 0 auto 48px;
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  padding: 24px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 12px 0 4px;
}

.stat-label {
  font-size: 14px;
  color: #64748B;
}
</style>
