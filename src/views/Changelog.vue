<script setup lang="ts">
import { Sparkles, Bug, Zap } from 'lucide-vue-next'

const releases = [
  {
    version: 'v1.1.0',
    date: '2026-03-02',
    isLatest: true,
    changes: [
      {
        type: 'feature',
        icon: Sparkles,
        label: '新功能',
        color: '#34D399',
        bg: 'rgba(16, 185, 129, 0.1)',
        items: [
          '工作流引擎：新增并行节点和循环节点',
          '插件市场：支持自定义工作流节点',
          'MCP 协议集成，通过 @langchain/mcp-adapters 接入',
          '数据源管理模块',
          '工作流执行历史记录',
        ],
      },
      {
        type: 'fix',
        icon: Bug,
        label: '修复',
        color: '#FBBF24',
        bg: 'rgba(245, 158, 11, 0.1)',
        items: [
          '修复对话流式输出中断问题',
          '修复知识库文档解析内存泄漏',
          '修复工作流条件分支判断逻辑错误',
        ],
      },
      {
        type: 'improvement',
        icon: Zap,
        label: '优化',
        color: '#60A5FA',
        bg: 'rgba(59, 130, 246, 0.1)',
        items: [
          'NestJS 10 → 11 框架升级',
          'LangChain 升级至最新版本',
          '对话列表加载性能优化',
        ],
      },
    ],
  },
  {
    version: 'v1.0.0',
    date: '2025-12-01',
    isLatest: false,
    changes: [
      {
        type: 'feature',
        icon: Sparkles,
        label: '新功能',
        color: '#34D399',
        bg: 'rgba(16, 185, 129, 0.1)',
        items: [
          '智能对话系统：多模型支持、多轮对话、流式输出',
          '知识库 RAG：文档上传、向量化存储、语义检索',
          '工作流引擎：可视化设计器、5 种基础节点类型',
          'AI 绘图：Stable Diffusion 集成、ControlNet',
          '插件市场：JSON Schema 动态配置',
          'RBAC 权限系统：用户、角色、菜单、字典管理',
        ],
      },
    ],
  },
  {
    version: 'v0.9.0',
    date: '2025-09-15',
    isLatest: false,
    changes: [
      {
        type: 'feature',
        icon: Sparkles,
        label: '新功能',
        color: '#34D399',
        bg: 'rgba(16, 185, 129, 0.1)',
        items: [
          '项目初始化：Vue 3 + NestJS 架构搭建',
          '基础认证系统：JWT Token 登录',
          '初版对话模块',
        ],
      },
    ],
  },
]
</script>

<template>
  <div class="changelog-page">
    <section class="page-hero">
      <h1 class="page-hero-title">
        <span class="gradient-text">更新日志</span>
      </h1>
      <p class="page-hero-desc">
        追踪每个版本的新功能、Bug 修复和性能优化
      </p>
    </section>

    <section class="timeline-section">
      <!-- Timeline -->
      <div class="timeline">
        <!-- 时间线竖线 -->
        <div class="timeline-line" />

        <div
          v-for="release in releases"
          :key="release.version"
          class="timeline-item"
        >
          <!-- 时间线圆点 -->
          <div class="timeline-dot" :class="{ latest: release.isLatest }" />

          <!-- Version Header -->
          <div class="version-header">
            <h2 class="version-name">{{ release.version }}</h2>
            <span v-if="release.isLatest" class="latest-badge">Latest</span>
            <span class="version-date">{{ release.date }}</span>
          </div>

          <!-- Changes -->
          <div class="changes-list">
            <div
              v-for="group in release.changes"
              :key="group.type"
              class="glass-card change-group"
            >
              <div class="change-header">
                <div class="change-icon" :style="{ background: group.bg }">
                  <component :is="group.icon" :size="14" :style="{ color: group.color }" />
                </div>
                <h3 class="change-label" :style="{ color: group.color }">{{ group.label }}</h3>
              </div>
              <ul class="change-items">
                <li v-for="item in group.items" :key="item" class="change-item">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.changelog-page {
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

.timeline-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px 96px;
}

.timeline {
  position: relative;
}

.timeline-line {
  position: absolute;
  left: 19px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, rgba(99, 102, 241, 0.5), rgba(255, 255, 255, 0.08), transparent);
}

.timeline-item {
  position: relative;
  padding-left: 56px;
  padding-bottom: 64px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: 10px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: #1A1A24;
}

.timeline-dot.latest {
  background: #6366F1;
  border-color: #818CF8;
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.4);
}

.version-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.version-name {
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.latest-badge {
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(99, 102, 241, 0.2);
  color: #A5B4FC;
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 9999px;
}

.version-date {
  font-size: 14px;
  color: #64748B;
}

.changes-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.change-group {
  padding: 20px;
}

.change-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.change-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.change-label {
  font-size: 14px;
  font-weight: 600;
}

.change-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.change-item {
  font-size: 14px;
  color: #94A3B8;
  padding-left: 16px;
  position: relative;
}

.change-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #475569;
}
</style>
