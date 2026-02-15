<script setup>
import NavigationBar from './components/NavigationBar.vue'
import HeroSection from './components/HeroSection.vue'
import ConcursosSection from './components/ConcursosSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import AISection from './components/AISection.vue'
import OpenSourceSection from './components/OpenSourceSection.vue'
import DevSection from './components/DevSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import ScrollToTop from './components/ScrollToTop.vue'

</script>

<template>
  <div class="min-h-screen">

    <NavigationBar />
    <main>
      <HeroSection />
      <ConcursosSection />
      <ExperienceSection />
      <AISection />
      <DevSection />
      <OpenSourceSection />
      <ContactSection />
    </main>
    <FooterSection />
    <ScrollToTop />
  </div>
</template>

<style scoped>
/* Additional component-specific styles can go here */
</style>
