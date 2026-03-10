<script setup lang="ts">
import { ref } from 'vue'

const tabs = [
  { id: 'chat', label: '💬 对话', img: '/screenshots/chat1.png' },
  { id: 'workflow', label: '🔄 工作流', img: '/screenshots/workflow.png' },
  { id: 'draw', label: '🎨 绘图', img: '/screenshots/txt2img.png' },
  { id: 'knowledge', label: '📚 知识库', img: '/screenshots/plugin.png' },
]

const activeTab = ref('chat')
const activeImg = ref(tabs[0].img)
const isTransitioning = ref(false)

function switchTab(tab: typeof tabs[0]) {
  if (tab.id === activeTab.value) return
  isTransitioning.value = true
  setTimeout(() => {
    activeTab.value = tab.id
    activeImg.value = tab.img
    setTimeout(() => {
      isTransitioning.value = false
    }, 50)
  }, 200)
}
</script>

<template>
  <section class="screenshot-section">
    <div class="screenshot-container">
      <h2 class="section-title">产品预览</h2>
      <p class="section-subtitle">
        直观感受平台各模块的操作界面
      </p>

      <!-- Tab -->
      <div class="tab-bar">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="switchTab(tab)"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Screenshot with macOS window frame -->
      <div class="screenshot-wrapper">
        <div class="screenshot-frame">
          <!-- macOS title bar -->
          <div class="macos-bar">
            <span class="dot red" />
            <span class="dot yellow" />
            <span class="dot green" />
            <span class="macos-title">Lingmengcan AI Platform</span>
          </div>
          <!-- Screenshot -->
          <div class="screenshot-body">
            <img
              :src="activeImg"
              :alt="activeTab"
              class="screenshot-img"
              :class="{ transitioning: isTransitioning }"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.screenshot-section {
  padding: 96px 24px;
}

.screenshot-container {
  max-width: 1200px;
  margin: 0 auto;
}

.tab-bar {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
}

.tab-btn {
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #94A3B8;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.06);
}

.tab-btn.active {
  background: rgba(99, 102, 241, 0.2);
  color: #A5B4FC;
  border-color: rgba(99, 102, 241, 0.3);
}

.screenshot-wrapper {
  max-width: 960px;
  margin: 0 auto;
  perspective: 1200px;
}

.screenshot-frame {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  transform: rotateX(2deg);
  transition: all 0.5s;
}

.macos-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #1A1A24;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot.red { background: #FF5F57; }
.dot.yellow { background: #FFBD2E; }
.dot.green { background: #28C840; }

.macos-title {
  font-size: 12px;
  color: #64748B;
  margin-left: 12px;
}

.screenshot-body {
  background: #12121A;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.screenshot-img {
  width: 100%;
  transition: all 0.3s;
}

.screenshot-img.transitioning {
  opacity: 0;
  transform: scale(0.98);
}
</style>
