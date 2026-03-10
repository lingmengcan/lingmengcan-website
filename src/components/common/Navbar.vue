<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Star, Menu, X } from 'lucide-vue-next'

const router = useRouter()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: '功能', path: '/features' },
  { name: '文档', path: '/docs' },
  { name: 'Demo', path: '/demo' },
  { name: '社区', path: '/community' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const goTo = (path: string) => {
  router.push(path)
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header
    class="navbar"
    :class="{ scrolled: isScrolled }"
  >
    <nav class="navbar-inner">
      <!-- Logo -->
      <router-link to="/" class="logo-link">
        <div class="logo-icon">
          <img src="/logo.svg" alt="Logo" class="logo-img" />
        </div>
        <span class="logo-text">Lingmengcan</span>
      </router-link>

      <!-- Desktop Nav -->
      <div class="nav-links">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          active-class="nav-link-active"
        >
          {{ item.name }}
        </router-link>
      </div>

      <!-- Right Actions -->
      <div class="nav-actions">
        <a
          href="https://github.com/lingmengcan/lingmengcan-ai"
          target="_blank"
          rel="noopener"
          class="github-btn"
        >
          <Star :size="15" />
          <span>GitHub Star</span>
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="mobile-toggle"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <Menu v-if="!isMobileMenuOpen" :size="22" />
        <X v-else :size="22" />
      </button>
    </nav>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-menu"
      >
        <div class="mobile-menu-inner">
          <button
            v-for="item in navItems"
            :key="item.path"
            class="mobile-link"
            @click="goTo(item.path)"
          >
            {{ item.name }}
          </button>
          <a
            href="https://github.com/lingmengcan/lingmengcan-ai"
            target="_blank"
            rel="noopener"
            class="mobile-link"
            style="display: flex; align-items: center; gap: 8px;"
          >
            <Star :size="15" />
            GitHub Star
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: all 0.3s;
  background: transparent;
}

.navbar.scrolled {
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-icon {
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
  transition: all 0.3s;
}

.logo-icon:hover {
  background: rgba(253, 224, 71, 0.18);
  box-shadow: 0 4px 16px rgba(253, 224, 71, 0.2);
}

.logo-img {
  width: 26px;
  height: 26px;
  object-fit: contain;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.01em;
  transition: color 0.2s;
}

.logo-link:hover .logo-text {
  color: #818CF8;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
  color: #94A3B8;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.06);
}

.nav-link-active {
  color: white !important;
  background: rgba(255, 255, 255, 0.08);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.github-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
}

.github-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.mobile-toggle {
  display: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-toggle:hover {
  color: white;
}

.mobile-menu {
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.mobile-menu-inner {
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-link {
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #94A3B8;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
}

.mobile-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.06);
}

@media (max-width: 768px) {
  .nav-links,
  .nav-actions {
    display: none;
  }
  .mobile-toggle {
    display: block;
  }
}

/* Transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.25s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
