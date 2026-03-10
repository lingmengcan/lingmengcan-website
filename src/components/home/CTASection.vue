<script setup lang="ts">
import { Rocket, MessageCircle } from 'lucide-vue-next'
</script>

<template>
  <section class="cta-section">
    <!-- 背景光效 -->
    <div class="cta-glow" />

    <div class="cta-content">
      <h2 class="cta-title">
        准备好构建你的
        <span class="gradient-text">AI 应用</span>
        了吗？
      </h2>
      <p class="cta-subtitle">
        从零开始，快速搭建属于你的 AI 平台。完全开源，永久免费。
      </p>
      <div class="cta-buttons">
        <router-link to="/docs" class="btn-primary">
          <Rocket :size="18" />
          立即开始
        </router-link>
        <router-link to="/community" class="btn-secondary">
          <MessageCircle :size="18" />
          加入社区
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding: 128px 24px;
  position: relative;
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  background: rgba(99, 102, 241, 0.06);
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 10;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: white;
  margin-bottom: 24px;
  line-height: 1.2;
}

.cta-subtitle {
  font-size: 18px;
  color: #94A3B8;
  margin-bottom: 40px;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}
</style>
