<script setup lang="ts">
import Navbar from '@/components/common/Navbar.vue'
import Footer from '@/components/common/Footer.vue'
</script>

<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column;">
    <Navbar />
    <main style="flex: 1; padding-top: 64px;">
      <slot />
    </main>
    <Footer />
  </div>
</template>
