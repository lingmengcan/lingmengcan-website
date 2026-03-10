<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  MessageSquare,
  BookOpen,
  Workflow,
  Palette,
  Puzzle,
  Shield,
  Check
} from 'lucide-vue-next'

const features = [
  {
    id: 'chat',
    icon: MessageSquare,
    title: '智能对话',
    subtitle: '多模型支持的 AI 对话系统',
    desc: '基于 LangChain 构建的智能对话系统，支持多轮对话、上下文记忆、流式输出。兼容 OpenAI、Ollama、DeepSeek、Anthropic 等主流模型，支持运行时实时切换。',
    features: ['多模型无缝切换', '多轮对话上下文记忆', '流式输出实时响应', '对话历史管理与搜索', 'Prompt 模板管理'],
    img: '/screenshots/chat1.png',
    gradient: 'linear-gradient(135deg, #3B82F6, #6366F1)',
  },
  {
    id: 'knowledge',
    icon: BookOpen,
    title: '知识库 RAG',
    subtitle: '智能文档检索增强系统',
    desc: '基于 LangChain + ChromaDB 的 RAG 系统，支持 PDF、Word、Markdown 等多格式文档上传、智能解析分块、向量化存储和语义检索，实现基于企业知识库的精准问答。',
    features: ['多格式文档上传 (PDF/Word/MD)', '智能文档解析和分块', '向量化存储和语义检索', '知识库问答和来源引用', '多知识库管理'],
    img: '/screenshots/plugin.png',
    gradient: 'linear-gradient(135deg, #F59E0B, #F97316)',
  },
  {
    id: 'workflow',
    icon: Workflow,
    title: '工作流引擎',
    subtitle: '可视化 AI 工作流编排',
    desc: '基于 Vue Flow 的可视化拖拽工作流设计器，支持 7 种节点类型（LLM、HTTP、条件分支、循环、并行、数据库、数据转换），实时调试执行，构建复杂的 AI 自动化流程。',
    features: ['可视化拖拽设计器', '7 种节点类型', '实时调试执行面板', '变量传递与数据转换', '执行历史记录'],
    img: '/screenshots/workflow.png',
    gradient: 'linear-gradient(135deg, #A855F7, #EC4899)',
  },
  {
    id: 'draw',
    icon: Palette,
    title: 'AI 绘图',
    subtitle: 'Stable Diffusion 文生图',
    desc: '集成 Stable Diffusion 的 AI 绘图模块，支持文生图、ControlNet 控制生成、参数精细调优。内置媒体管理系统，支持批量生成和画廊浏览。',
    features: ['Stable Diffusion 文生图', 'ControlNet 精确控制', '参数面板精细调优', '批量生成管理', '瀑布流画廊浏览'],
    img: '/screenshots/txt2img.png',
    gradient: 'linear-gradient(135deg, #EC4899, #FB7185)',
  },
  {
    id: 'plugin',
    icon: Puzzle,
    title: '插件市场',
    subtitle: '可扩展的插件生态',
    desc: '可扩展的插件系统，支持通过 JSON Schema 动态定义工作流节点。集成 MCP 协议，通过 @langchain/mcp-adapters 接入更多外部能力。',
    features: ['JSON Schema 动态定义', 'MCP 协议集成', '插件热加载', '工作流节点扩展', '第三方服务集成'],
    img: '/screenshots/plugin.png',
    gradient: 'linear-gradient(135deg, #06B6D4, #0EA5E9)',
  },
  {
    id: 'rbac',
    icon: Shield,
    title: '企业级权限',
    subtitle: 'RBAC 细粒度权限控制',
    desc: '完整的 RBAC 权限管理系统，支持用户管理、角色分配、动态菜单配置和按钮级权限控制。字典管理系统方便维护业务枚举数据。',
    features: ['用户/角色/菜单管理', '动态路由和菜单', '按钮级细粒度控制', '数据字典管理', 'JWT Token 认证'],
    img: '/screenshots/role.png',
    gradient: 'linear-gradient(135deg, #10B981, #14B8A6)',
  },
]

const visibleSections = ref<Set<string>>(new Set())

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.value.add(entry.target.id)
        }
      })
    },
    { threshold: 0.15 }
  )
  document.querySelectorAll('.feature-block').forEach((el) => observer.observe(el))
})
</script>

<template>
  <div class="features-page">
    <!-- Hero -->
    <section class="page-hero">
      <h1 class="page-hero-title">
        <span class="gradient-text">功能介绍</span>
      </h1>
      <p class="page-hero-desc">
        覆盖 AI 应用开发全流程的 6 大核心模块，满足从个人开发者到企业级的多元需求
      </p>
    </section>

    <!-- Feature Blocks -->
    <section class="features-list">
      <div
        v-for="(feature, index) in features"
        :key="feature.id"
        :id="feature.id"
        class="feature-block"
        :class="{
          visible: visibleSections.has(feature.id),
          reversed: index % 2 === 1
        }"
      >
        <!-- Text -->
        <div class="feature-text" :class="{ 'order-2': index % 2 === 1 }">
          <div class="feature-header">
            <div class="feature-icon-box" :style="{ background: feature.gradient }">
              <component :is="feature.icon" :size="20" style="color: white;" />
            </div>
            <div>
              <h2 class="feature-name">{{ feature.title }}</h2>
              <p class="feature-sub">{{ feature.subtitle }}</p>
            </div>
          </div>
          <p class="feature-description">{{ feature.desc }}</p>
          <ul class="feature-list">
            <li v-for="f in feature.features" :key="f" class="feature-list-item">
              <Check :size="16" style="color: #34D399; flex-shrink: 0;" />
              {{ f }}
            </li>
          </ul>
        </div>

        <!-- Screenshot -->
        <div class="feature-screenshot" :class="{ 'order-1': index % 2 === 1 }">
          <div class="screenshot-frame">
            <div class="macos-bar">
              <span class="dot red" />
              <span class="dot yellow" />
              <span class="dot green" />
            </div>
            <div class="screenshot-body">
              <img :src="feature.img" :alt="feature.title" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.features-page {
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

.features-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 96px;
  display: flex;
  flex-direction: column;
  gap: 128px;
}

.feature-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.7s ease;
}

.feature-block.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1024px) {
  .feature-block {
    grid-template-columns: 1fr;
  }
  .order-1, .order-2 {
    order: unset !important;
  }
}

.order-1 { order: 1; }
.order-2 { order: 2; }

.feature-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.feature-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-name {
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.feature-sub {
  font-size: 14px;
  color: #64748B;
}

.feature-description {
  color: #94A3B8;
  line-height: 1.6;
  margin-bottom: 24px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-list-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #94A3B8;
}

.screenshot-frame {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.macos-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #1A1A24;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red { background: #FF5F57; }
.dot.yellow { background: #FFBD2E; }
.dot.green { background: #28C840; }

.screenshot-body {
  background: #12121A;
}

.screenshot-body img {
  width: 100%;
  display: block;
}
</style>
