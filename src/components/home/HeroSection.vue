<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Rocket, Monitor } from 'lucide-vue-next'

// --- Canvas 粒子背景 ---
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId = 0

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
}

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = 800)

  const particles: Particle[] = []
  const count = Math.min(80, Math.floor(width / 15))

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    })
  }

  function draw() {
    ctx!.clearRect(0, 0, width, height)

    // 连线
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          ctx!.beginPath()
          ctx!.moveTo(particles[i].x, particles[i].y)
          ctx!.lineTo(particles[j].x, particles[j].y)
          ctx!.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 150)})`
          ctx!.lineWidth = 0.5
          ctx!.stroke()
        }
      }
    }

    // 粒子
    for (const p of particles) {
      ctx!.beginPath()
      ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(139, 92, 246, ${p.alpha})`
      ctx!.fill()

      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > width) p.vx *= -1
      if (p.y < 0 || p.y > height) p.vy *= -1
    }

    animationId = requestAnimationFrame(draw)
  }

  draw()

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = 800
  }
  window.addEventListener('resize', handleResize)
}

onMounted(() => {
  initCanvas()
})
onUnmounted(() => {
  cancelAnimationFrame(animationId)
})

// --- 打字机效果 ---
const typeText = ref('')
const fullText = '知识库 · 智能对话 · 工作流 · AI 绘图'
const showCursor = ref(true)

onMounted(() => {
  let i = 0
  const typeInterval = setInterval(() => {
    if (i < fullText.length) {
      typeText.value += fullText[i]
      i++
    } else {
      clearInterval(typeInterval)
      // 光标闪烁
      setInterval(() => { showCursor.value = !showCursor.value }, 530)
    }
  }, 80)
})
</script>

<template>
  <section class="hero-section">
    <!-- Canvas 背景 -->
    <canvas
      ref="canvasRef"
      class="hero-canvas"
    />

    <!-- 径向渐变叠加 -->
    <div class="hero-glow" />

    <!-- 内容 -->
    <div class="hero-content">
      <!-- 标签 -->
      <div class="hero-badge">
        <span class="hero-badge-dot" />
        v1.1.0 · 开源免费 · MIT License
      </div>

      <!-- 标题 -->
      <h1 class="hero-title">
        <span class="gradient-text">Lingmengcan</span>
        <br />
        <span style="color: white;">AI Platform</span>
      </h1>

      <!-- 副标题 -->
      <p class="hero-subtitle">
        基于大语言模型的端到端 AI 应用开发平台
      </p>

      <!-- 打字机 -->
      <p class="hero-typewriter">
        {{ typeText }}<span :style="{ opacity: showCursor ? 1 : 0 }" class="hero-cursor">|</span>
      </p>

      <!-- CTA 按钮 -->
      <div class="hero-cta">
        <router-link to="/docs" class="btn-primary">
          <Rocket :size="18" />
          快速开始
        </router-link>
        <router-link to="/demo" class="btn-secondary">
          <Monitor :size="18" />
          在线体验
        </router-link>
      </div>

      <!-- 技术标签 -->
      <div class="hero-tags">
        <span
          v-for="tag in ['Vue 3', 'NestJS', 'LangChain', 'TypeScript', 'MIT License']"
          :key="tag"
          class="hero-tag"
        >
          {{ tag }}
        </span>
      </div>

      <!-- GitHub 数据 -->
      <div class="hero-stats">
        <div class="hero-stat">
          <span style="color: #FACC15;">⭐</span>
          <span style="font-weight: 600; color: white;">1.2k+</span> Stars
        </div>
        <div class="hero-stat">
          <span>🍴</span>
          <span style="font-weight: 600; color: white;">280+</span> Forks
        </div>
        <div class="hero-stat">
          <span>👥</span>
          <span style="font-weight: 600; color: white;">30+</span> Contributors
        </div>
      </div>
    </div>

    <!-- 底部渐变过渡 -->
    <div class="hero-bottom-gradient" />
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 740px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  top: 33%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.06), transparent 70%);
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 20px 24px 0;
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  margin-bottom: 32px;
  border-radius: 9999px;
  border: 1px solid rgba(99, 102, 241, 0.3);
  background: rgba(99, 102, 241, 0.08);
  color: #A5B4FC;
  font-size: 14px;
  font-weight: 500;
}

.hero-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ADE80;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.hero-title {
  font-size: clamp(40px, 7vw, 72px);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(18px, 2.5vw, 24px);
  color: #94A3B8;
  margin-bottom: 12px;
  font-weight: 500;
}

.hero-typewriter {
  font-size: 18px;
  color: rgba(165, 180, 252, 0.8);
  margin-bottom: 40px;
  height: 28px;
}

.hero-cursor {
  transition: opacity 0.1s;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-bottom: 48px;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
}

.hero-tag {
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #94A3B8;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  font-size: 14px;
  color: #94A3B8;
}

.hero-stat {
  display: flex;
  align-items: center;
  gap: 6px;
}

.hero-bottom-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 128px;
  background: linear-gradient(to top, #0A0A0F, transparent);
  pointer-events: none;
}

@media (max-width: 640px) {
  .hero-stats {
    gap: 16px;
    font-size: 12px;
  }
}
</style>
