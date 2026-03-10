<script setup lang="ts">
import { ExternalLink, MessageSquare, Workflow, Palette } from 'lucide-vue-next'

const demoUrl = 'http://ai.lingmengcan.com'

const features = [
  {
    icon: MessageSquare,
    title: '智能对话',
    desc: '多模型 AI 对话，支持上下文记忆和流式输出',
    iconBg: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))',
    iconColor: '#60A5FA',
  },
  {
    icon: Workflow,
    title: '工作流设计',
    desc: '拖拽编排 AI 工作流，多种节点类型实时调试',
    iconBg: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))',
    iconColor: '#C084FC',
  },
  {
    icon: Palette,
    title: 'AI 绘图',
    desc: 'Stable Diffusion 文生图，支持 ControlNet',
    iconBg: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(251,113,133,0.2))',
    iconColor: '#F472B6',
  },
]
</script>

<template>
  <div class="demo-page">
    <section class="page-hero">
      <h1 class="page-hero-title">
        <span class="gradient-text">在线体验</span>
      </h1>
      <p class="page-hero-desc">
        无需安装，直接在线体验 Lingmengcan AI 平台的核心功能
      </p>
      <div class="hero-action">
        <a
          :href="demoUrl"
          target="_blank"
          rel="noopener"
          class="btn-primary demo-go-btn"
        >
          <ExternalLink :size="18" />
          前往 Demo 站点
        </a>
        <p class="demo-url-hint">{{ demoUrl }}</p>
      </div>
    </section>

    <!-- Feature Preview Cards -->
    <section class="demo-features-section">
      <div class="demo-grid">
        <a
          v-for="feature in features"
          :key="feature.title"
          :href="demoUrl"
          target="_blank"
          rel="noopener"
          class="glass-card demo-card"
        >
          <div class="demo-icon" :style="{ background: feature.iconBg }">
            <component :is="feature.icon" :size="28" :style="{ color: feature.iconColor }" />
          </div>
          <h3 class="demo-title">{{ feature.title }}</h3>
          <p class="demo-desc">{{ feature.desc }}</p>
          <span class="demo-link">
            <ExternalLink :size="14" />
            立即体验
          </span>
        </a>
      </div>
    </section>

    <!-- Notice -->
    <section class="notice-section">
      <div class="glass-card notice-box">
        <h3 class="notice-title">💡 Demo 环境说明</h3>
        <ul class="notice-list">
          <li>• 使用共享演示账号，数据会定期清理</li>
          <li>• 默认账号：admin / 123456</li>
          <li>• 如需完整体验全部功能，推荐本地部署</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.demo-page {
  padding-top: 24px;
}

.page-hero {
  padding: 80px 24px 40px;
  text-align: center;
}

.page-hero-title {
  font-size: clamp(32px, 6vw, 60px);
  font-weight: 800;
  margin-bottom: 24px;
}

.page-hero-desc {
  font-size: 18px;
  color: #94A3B8;
  max-width: 640px;
  margin: 0 auto;
}

.hero-action {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.demo-go-btn {
  font-size: 16px;
  padding: 14px 32px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.demo-url-hint {
  font-size: 14px;
  color: #64748B;
  font-family: monospace;
}

.demo-features-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px 64px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}

.demo-card {
  padding: 28px;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
  text-decoration: none;
  display: block;
}

.demo-card:hover {
  transform: translateY(-4px);
}

.demo-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  transition: transform 0.3s;
}

.demo-card:hover .demo-icon {
  transform: scale(1.1);
}

.demo-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.demo-desc {
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 20px;
  line-height: 1.6;
}

.demo-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #818CF8;
  transition: color 0.2s;
}

.demo-card:hover .demo-link {
  color: #A5B4FC;
}

.notice-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px 96px;
}

.notice-box {
  padding: 24px;
  border-left: 4px solid #F59E0B;
}

.notice-title {
  color: white;
  font-weight: 600;
  margin-bottom: 8px;
}

.notice-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  color: #94A3B8;
}
</style>
