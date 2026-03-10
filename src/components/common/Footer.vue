<script setup lang="ts">
const links = [
  {
    title: '快速链接',
    items: [
      { name: '快速开始', href: '/docs' },
      { name: '功能介绍', href: '/features' },
      { name: 'API 文档', href: '/docs' },
      { name: '更新日志', href: '/changelog' },
    ],
  },
  {
    title: '社区',
    items: [
      { name: 'GitHub', href: 'https://github.com/lingmengcan/lingmengcan-ai', external: true },
      { name: 'QQ 群', href: '/community' },
      { name: 'Issues', href: 'https://github.com/lingmengcan/lingmengcan-ai/issues', external: true },
    ],
  },
  {
    title: '更多',
    items: [
      { name: '在线 Demo', href: '/demo' },
      { name: '社区交流', href: '/community' },
    ],
  },
]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="footer-logo-icon">
              <img src="/logo.svg" alt="Logo" class="footer-logo-img" />
            </div>
            <span class="footer-logo-text">Lingmengcan AI</span>
          </div>
          <p class="footer-desc">
            基于大语言模型的端到端 AI 应用开发平台。<br />
            知识库 · 智能对话 · 工作流 · AI 绘图
          </p>
        </div>

        <!-- Link Columns -->
        <div v-for="group in links" :key="group.title" class="footer-link-group">
          <h4 class="footer-link-title">{{ group.title }}</h4>
          <ul class="footer-link-list">
            <li v-for="link in group.items" :key="link.name">
              <a
                v-if="(link as any).external"
                :href="link.href"
                target="_blank"
                rel="noopener"
                class="footer-link"
              >
                {{ link.name }}
              </a>
              <router-link
                v-else
                :to="link.href"
                class="footer-link"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="footer-bottom">
        <p class="footer-copyright">
          MIT License · © 2024-2026 Lingmengcan
        </p>
        <p class="footer-credit">
          Made with ❤️ by the Open Source Community
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: #0A0A0F;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.footer-brand {
  /* First column, spans 2fr */
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.footer-logo-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(253, 224, 71, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(253, 224, 71, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-logo-img {
  width: 26px;
  height: 26px;
  object-fit: contain;
}

.footer-logo-text {
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.footer-desc {
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.6;
  max-width: 320px;
}

.footer-link-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
}

.footer-link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  font-size: 14px;
  color: #94A3B8;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: white;
}

.footer-bottom {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-copyright,
.footer-credit {
  font-size: 14px;
  color: #475569;
}
</style>
