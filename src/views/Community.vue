<script setup lang="ts">
import { Github, MessageSquare, Mail, GitFork, GitPullRequest, Star } from 'lucide-vue-next'

const channels = [
  {
    icon: Github,
    title: 'GitHub',
    desc: 'Star 项目、提交 Issue、参与代码贡献',
    link: 'https://github.com/lingmengcan/lingmengcan-ai',
    btnText: '前往 GitHub',
    external: true,
    iconBg: 'linear-gradient(135deg, rgba(107,114,128,0.2), rgba(100,116,139,0.2))',
    iconColor: '#D1D5DB',
  },
  {
    icon: MessageSquare,
    title: 'QQ 交流群',
    desc: '群号：651535270，扫码或搜索群号加入',
    link: '/community',
    btnText: '加入 QQ 群',
    external: false,
    iconBg: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))',
    iconColor: '#60A5FA',
  },
  {
    icon: Mail,
    title: '问题反馈',
    desc: '通过 GitHub Issues 提交 Bug 报告和功能建议',
    link: 'https://github.com/lingmengcan/lingmengcan-ai/issues',
    btnText: '提交 Issue',
    external: true,
    iconBg: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(249,115,22,0.2))',
    iconColor: '#FBBF24',
  },
]

const steps = [
  { step: 1, icon: GitFork, title: 'Fork 项目', desc: '将项目 Fork 到你的 GitHub 账号' },
  { step: 2, icon: GitPullRequest, title: '创建分支', desc: '基于 main 创建功能分支' },
  { step: 3, icon: Star, title: '提交代码', desc: '编写代码并提交 commit' },
  { step: 4, icon: GitPullRequest, title: '发起 PR', desc: '向主仓库提交 Pull Request' },
]
</script>

<template>
  <div class="community-page">
    <section class="page-hero">
      <h1 class="page-hero-title">
        <span class="gradient-text">社区交流</span>
      </h1>
      <p class="page-hero-desc">
        加入 Lingmengcan AI 开源社区，一起构建更好的 AI 应用平台
      </p>
    </section>

    <!-- Channels -->
    <section class="channels-section">
      <div class="channels-grid">
        <div
          v-for="channel in channels"
          :key="channel.title"
          class="glass-card channel-card"
        >
          <div class="channel-icon" :style="{ background: channel.iconBg }">
            <component :is="channel.icon" :size="28" :style="{ color: channel.iconColor }" />
          </div>
          <h3 class="channel-title">{{ channel.title }}</h3>
          <p class="channel-desc">{{ channel.desc }}</p>
          <a
            v-if="channel.external"
            :href="channel.link"
            target="_blank"
            rel="noopener"
            class="btn-secondary channel-btn"
          >
            {{ channel.btnText }}
          </a>
          <router-link
            v-else
            :to="channel.link"
            class="btn-secondary channel-btn"
          >
            {{ channel.btnText }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- How to Contribute -->
    <section class="contribute-section">
      <h2 class="section-title" style="font-size: 24px; margin-bottom: 40px;">如何贡献</h2>
      <div class="steps-grid">
        <div
          v-for="s in steps"
          :key="s.step"
          class="glass-card step-card"
        >
          <div class="step-number">{{ s.step }}</div>
          <component :is="s.icon" :size="24" style="color: #818CF8; margin: 0 auto 12px;" />
          <h3 class="step-title">{{ s.title }}</h3>
          <p class="step-desc">{{ s.desc }}</p>

          <!-- Arrow connector -->
          <div v-if="s.step < 4" class="step-arrow">→</div>
        </div>
      </div>

      <div class="contribute-actions">
        <a
          href="https://github.com/lingmengcan/lingmengcan-ai/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener"
          class="btn-primary"
          style="font-size: 14px;"
        >
          🔀 贡献指南
        </a>
        <a
          href="https://github.com/lingmengcan/lingmengcan-ai/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"
          target="_blank"
          rel="noopener"
          class="btn-secondary"
          style="font-size: 14px;"
        >
          📋 Good First Issues
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.community-page {
  padding-top: 24px;
}

.page-hero {
  padding: 80px 24px;
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

.channels-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.channels-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .channels-grid {
    grid-template-columns: 1fr;
  }
}

.channel-card {
  padding: 28px;
  text-align: center;
  transition: all 0.3s;
}

.channel-card:hover {
  transform: translateY(-4px);
}

.channel-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  transition: transform 0.3s;
}

.channel-card:hover .channel-icon {
  transform: scale(1.1);
}

.channel-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.channel-desc {
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 20px;
  line-height: 1.6;
}

.channel-btn {
  font-size: 14px;
  padding: 10px 20px;
  width: 100%;
  justify-content: center;
}

.contribute-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px 96px;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .step-arrow {
    display: none !important;
  }
}

.step-card {
  padding: 24px;
  text-align: center;
  position: relative;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366F1, #8B5CF6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: white;
  font-weight: 700;
  font-size: 14px;
}

.step-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 6px;
}

.step-desc {
  font-size: 12px;
  color: #64748B;
}

.step-arrow {
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  color: #475569;
  font-size: 18px;
}

.contribute-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
}
</style>
