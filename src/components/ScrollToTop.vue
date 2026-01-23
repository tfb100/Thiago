<template>
  <Transition name="fade-scale">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 group"
      aria-label="Voltar ao topo"
    >
      <!-- Progress Circle -->
      <svg class="absolute inset-0 w-14 h-14 -rotate-90">
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="rgba(255,255,255,0.2)"
          stroke-width="2"
          fill="none"
        />
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="white"
          stroke-width="2"
          fill="none"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          class="transition-all duration-300"
        />
      </svg>
      
      <!-- Arrow Icon -->
      <svg
        class="relative w-6 h-6 mx-auto transform group-hover:-translate-y-1 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isVisible = ref(false)
const scrollProgress = ref(0)

const circumference = 2 * Math.PI * 26
const dashOffset = computed(() => {
  return circumference - (scrollProgress.value / 100) * circumference
})

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  
  scrollProgress.value = (scrollTop / scrollHeight) * 100
  isVisible.value = scrollTop > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
