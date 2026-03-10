<script setup lang="ts">
const stacks = [
  {
    category: '前端层',
    dotColor: '#34D399',
    borderColor: 'rgba(16, 185, 129, 0.2)',
    items: [
      { name: 'Vue 3', desc: '渐进式框架' },
      { name: 'TDesign', desc: '企业级 UI 库' },
      { name: 'Tailwind CSS', desc: '原子化样式' },
      { name: 'Vue Flow', desc: '工作流画布' },
    ],
  },
  {
    category: '服务层',
    dotColor: '#60A5FA',
    borderColor: 'rgba(59, 130, 246, 0.2)',
    items: [
      { name: 'NestJS', desc: '企业级框架' },
      { name: 'TypeORM', desc: 'ORM 层' },
      { name: 'MySQL', desc: '关系数据库' },
      { name: 'JWT', desc: '身份认证' },
    ],
  },
  {
    category: 'AI 层',
    dotColor: '#C084FC',
    borderColor: 'rgba(168, 85, 247, 0.2)',
    items: [
      { name: 'LangChain', desc: 'AI 编排框架' },
      { name: 'ChromaDB', desc: '向量数据库' },
      { name: 'OpenAI', desc: 'GPT / Embedding' },
      { name: 'Ollama', desc: '本地模型部署' },
    ],
  },
]
</script>

<template>
  <section class="tech-section">
    <div class="tech-container">
      <h2 class="section-title">
        <span class="gradient-text">现代化技术架构</span>
      </h2>
      <p class="section-subtitle">
        前后端全 TypeScript，统一开发体验，主流技术栈无缝对接
      </p>

      <div class="tech-grid">
        <div
          v-for="stack in stacks"
          :key="stack.category"
          class="glass-card tech-card"
        >
          <h3 class="tech-card-title">
            <span class="tech-dot" :style="{ background: stack.dotColor }" />
            {{ stack.category }}
          </h3>
          <div class="tech-items">
            <div
              v-for="item in stack.items"
              :key="item.name"
              class="tech-item"
              :style="{ borderColor: stack.borderColor }"
            >
              <span class="tech-item-name">{{ item.name }}</span>
              <span class="tech-item-desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-section {
  padding: 96px 24px;
  background: linear-gradient(to bottom, transparent, #0D0D15, transparent);
}

.tech-container {
  max-width: 1200px;
  margin: 0 auto;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .tech-grid {
    grid-template-columns: 1fr;
  }
}

.tech-card {
  padding: 28px;
}

.tech-card-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tech-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.tech-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tech-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid;
  transition: all 0.2s;
}

.tech-item:hover {
  background: rgba(255, 255, 255, 0.03);
}

.tech-item-name {
  font-size: 14px;
  font-weight: 500;
  color: white;
}

.tech-item-desc {
  font-size: 12px;
  color: #64748B;
}
</style>
