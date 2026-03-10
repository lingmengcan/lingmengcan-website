<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Bot,
  MessageSquare,
  BookOpen,
  Workflow,
  Palette,
  Puzzle
} from 'lucide-vue-next'

const features = [
  {
    icon: Bot,
    title: '多模型支持',
    desc: '兼容 OpenAI、Ollama、DeepSeek、Anthropic 等主流大模型，通过 LangChain 统一接入，灵活切换。',
    iconBg: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))',
    iconColor: '#60A5FA',
  },
  {
    icon: MessageSquare,
    title: '智能对话',
    desc: '多轮对话、上下文记忆、流式输出，支持模型实时切换和对话管理，高效智能交互。',
    iconBg: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(20,184,166,0.2))',
    iconColor: '#34D399',
  },
  {
    icon: BookOpen,
    title: '知识库 RAG',
    desc: '基于 LangChain + ChromaDB 的文档检索增强系统，支持 PDF、Word、Markdown 文档智能问答。',
    iconBg: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(249,115,22,0.2))',
    iconColor: '#FBBF24',
  },
  {
    icon: Workflow,
    title: '工作流引擎',
    desc: '可视化拖拽式工作流设计器，支持 LLM、HTTP、条件分支、循环、并行等 7 种节点类型。',
    iconBg: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))',
    iconColor: '#C084FC',
  },
  {
    icon: Palette,
    title: 'AI 绘图',
    desc: '集成 Stable Diffusion，支持 ControlNet、文生图、参数调优，内置媒体管理和批量生成。',
    iconBg: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(251,113,133,0.2))',
    iconColor: '#F472B6',
  },
  {
    icon: Puzzle,
    title: '插件市场',
    desc: '可扩展的插件系统，通过 JSON Schema 动态定义工作流节点，支持 MCP 协议集成。',
    iconBg: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(14,165,233,0.2))',
    iconColor: '#22D3EE',
  },
]

// 滚动渐入
const cardsRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )
  if (cardsRef.value) observer.observe(cardsRef.value)
})
</script>

<template>
  <section class="features-section">
    <div class="features-container">
      <h2 class="section-title">
        <span class="gradient-text">核心特性</span>
      </h2>
      <p class="section-subtitle">
        一站式 AI 应用开发平台，覆盖从模型接入到应用落地的全流程
      </p>

      <div ref="cardsRef" class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="glass-card feature-card"
          :class="isVisible ? 'visible' : ''"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <!-- Icon -->
          <div
            class="feature-icon"
            :style="{ background: feature.iconBg }"
          >
            <component :is="feature.icon" :size="24" :style="{ color: feature.iconColor }" />
          </div>

          <!-- Text -->
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  padding: 96px 24px;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  padding: 28px;
  opacity: 0;
  transform: translateY(32px);
  transition: all 0.5s ease;
  cursor: default;
}

.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;
}

.feature-desc {
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.6;
}
</style>
