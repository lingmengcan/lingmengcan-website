<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import FeaturesGrid from '@/components/home/FeaturesGrid.vue'
import ScreenshotShowcase from '@/components/home/ScreenshotShowcase.vue'
import TechStack from '@/components/home/TechStack.vue'
import QuickStart from '@/components/home/QuickStart.vue'
import OpenSource from '@/components/home/OpenSource.vue'
import CTASection from '@/components/home/CTASection.vue'
</script>

<template>
  <div>
    <HeroSection />
    <FeaturesGrid />
    <ScreenshotShowcase />
    <TechStack />
    <QuickStart />
    <OpenSource />
    <CTASection />
  </div>
</template>
