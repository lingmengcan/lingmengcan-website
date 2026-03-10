import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      meta: { title: 'Lingmengcan AI - 端到端 AI 应用开发平台' },
    },
    {
      path: '/features',
      name: 'Features',
      component: () => import('@/views/Features.vue'),
      meta: { title: '功能介绍 - Lingmengcan AI' },
    },
    {
      path: '/docs',
      name: 'Docs',
      component: () => import('@/views/Docs.vue'),
      meta: { title: '文档中心 - Lingmengcan AI' },
    },
    {
      path: '/demo',
      name: 'Demo',
      component: () => import('@/views/Demo.vue'),
      meta: { title: '在线体验 - Lingmengcan AI' },
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('@/views/Community.vue'),
      meta: { title: '社区交流 - Lingmengcan AI' },
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'Lingmengcan AI'
  next()
})

export default router
