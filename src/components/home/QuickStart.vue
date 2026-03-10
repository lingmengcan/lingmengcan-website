<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check } from 'lucide-vue-next'

const steps = [
  { step: 1, label: '克隆项目', code: 'git clone https://github.com/lingmengcan/lingmengcan-ai.git' },
  { step: 2, label: '启动后端', code: 'cd lingmengcan-ai/service && pnpm install && pnpm run start:dev' },
  { step: 3, label: '启动前端', code: 'cd lingmengcan-ai/web && pnpm install && pnpm dev' },
  { step: 4, label: '开始使用', code: '# 访问 http://localhost:8089  账号：admin / 123456' },
]

const copied = ref<number | null>(null)

async function copyCode(code: string, index: number) {
  try {
    await navigator.clipboard.writeText(code)
    copied.value = index
    setTimeout(() => { copied.value = null }, 2000)
  } catch {
    // fallback
  }
}
</script>

<template>
  <section class="quickstart-section">
    <div class="quickstart-container">
      <h2 class="section-title">5 分钟快速启动</h2>
      <p class="section-subtitle">
        只需几行命令，即可在本地运行完整的 AI 应用平台
      </p>

      <div class="steps-list">
        <div
          v-for="item in steps"
          :key="item.step"
          class="glass-card step-card"
        >
          <div class="step-header">
            <span class="step-number">{{ item.step }}</span>
            <span class="step-label">{{ item.label }}</span>
          </div>
          <div class="step-code-area">
            <code class="step-code">
              <span class="step-prompt">$ </span>{{ item.code }}
            </code>
            <button
              class="copy-btn"
              @click="copyCode(item.code, item.step)"
              :title="copied === item.step ? '已复制' : '复制'"
            >
              <Check v-if="copied === item.step" :size="15" style="color: #34D399;" />
              <Copy v-else :size="15" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quickstart-section {
  padding: 96px 24px;
}

.quickstart-container {
  max-width: 800px;
  margin: 0 auto;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-card {
  overflow: hidden;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366F1, #8B5CF6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.step-label {
  font-size: 14px;
  font-weight: 500;
  color: #94A3B8;
}

.step-code-area {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: rgba(30, 30, 46, 0.5);
}

.step-code {
  flex: 1;
  font-size: 14px;
  color: rgba(52, 211, 153, 0.9);
  overflow-x: auto;
  white-space: nowrap;
}

.step-prompt {
  color: #64748B;
  user-select: none;
}

.copy-btn {
  margin-left: 12px;
  padding: 6px;
  color: #64748B;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.2s;
}

.copy-btn:hover {
  color: white;
}
</style>
