<script setup>
import NavigationBar from './components/NavigationBar.vue'
import HeroSection from './components/HeroSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import AISection from './components/AISection.vue'
import OpenSourceSection from './components/OpenSourceSection.vue'
import ContactSection from './components/ContactSection.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import CustomCursor from './components/CustomCursor.vue'
</script>

<template>
  <div class="min-h-screen">
    <CustomCursor />
    <NavigationBar />
    <main>
      <HeroSection />
      <ExperienceSection />
      <AISection />
      <OpenSourceSection />
      <ContactSection />
    </main>
    <ScrollToTop />
  </div>
</template>

<style scoped>
/* Additional component-specific styles can go here */
</style>
