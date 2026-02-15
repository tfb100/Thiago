<template>
  <section id="inicio" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-hero-from to-hero-to relative overflow-hidden animate-gradient">
    <!-- Particle Background -->
    <ParticleBackground 
      :particle-count="40"
      particle-color="rgba(255, 255, 255, 0.6)"
      line-color="rgba(255, 255, 255, 0.15)"
      :speed="0.5"
    />

    <!-- Animated background elements -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-300 rounded-full blur-3xl animate-float" style="animation-delay: 2s;"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex justify-center items-center">
        <!-- Text Content -->
        <div class="text-white space-y-6 animate-slide-up text-center max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold leading-normal pb-8">
            Olá, eu sou
            <span class="inline-block text-gradient from-blue-200 to-cyan-200 mt-2 py-6 px-1 leading-[1.4]">Thiago Barcelos</span>
          </h1>
          
          <!-- Typing Animation -->
          <div class="h-16 flex justify-center items-center mt-12">
            <p class="text-xl md:text-2xl text-blue-100 font-semibold">
              {{ currentRole }}
              <span class="animate-pulse">|</span>
            </p>
          </div>

          <p class="text-lg text-blue-200 leading-relaxed max-w-2xl mx-auto">
            Profissional de tecnologia com <span class="font-bold text-white">8 nomeações</span> em órgãos públicos, 
            apaixonado por <span class="font-bold text-cyan-300">IA</span>, 
            <span class="font-bold text-cyan-300">automação</span> e 
            <span class="font-bold text-cyan-300">software livre</span>.
          </p>
          
          <div class="flex flex-wrap gap-4 pt-4 justify-center">
            <a
              href="#experiencia"
              @click.prevent="scrollToSection('experiencia')"
              class="ripple px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl glow-effect"
            >
              Ver Experiência
            </a>
            <a
              href="#contato"
              @click.prevent="scrollToSection('contato')"
              class="ripple px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shimmer"
            >
              Entrar em Contato
            </a>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 pt-8">
            <div class="text-center glass-effect rounded-lg p-4 hover:glass-effect-strong transition-all duration-300">
              <div class="text-3xl font-bold text-cyan-300">{{ animatedYears }}</div>
              <div class="text-sm text-blue-200">Anos de Experiência</div>
            </div>
            <div class="text-center glass-effect rounded-lg p-4 hover:glass-effect-strong transition-all duration-300">
              <div class="text-3xl font-bold text-cyan-300">{{ animatedPositions }}</div>
              <div class="text-sm text-blue-200">Nomeações</div>
            </div>
            <div class="text-center glass-effect rounded-lg p-4 hover:glass-effect-strong transition-all duration-300">
              <div class="text-3xl font-bold text-cyan-300">{{ animatedTools }}</div>
              <div class="text-sm text-blue-200">Ferramentas</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator - Moved outside container to stay at bottom of section -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 hidden sm:block">
      <div class="flex flex-col items-center gap-2">
        <span class="text-white text-sm opacity-75">Role para explorar</span>
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ParticleBackground from './ParticleBackground.vue'
import { useScrollToSection } from '../composables/useScrollToSection'

const { scrollToSection } = useScrollToSection()

const roles = [
  'Analista em TI',
  'Especialista em Tecnologia',
  'Entusiasta de IA',
  'Open Source Advocate'
]

const currentRole = ref('')
const currentRoleIndex = ref(0)
const currentCharIndex = ref(0)
const isDeleting = ref(false)


// Animated counters
const animatedYears = ref(0)
const animatedPositions = ref(0)
const animatedTools = ref(0)

const targetYears = 10
const targetPositions = 8
const targetTools = 3

// Typing animation
const typeRole = () => {
  const fullRole = roles[currentRoleIndex.value]
  
  if (!isDeleting.value) {
    if (currentCharIndex.value < fullRole.length) {
      currentRole.value = fullRole.substring(0, currentCharIndex.value + 1)
      currentCharIndex.value++
      setTimeout(typeRole, 100)
    } else {
      setTimeout(() => {
        isDeleting.value = true
        typeRole()
      }, 2000)
    }
  } else {
    if (currentCharIndex.value > 0) {
      currentRole.value = fullRole.substring(0, currentCharIndex.value - 1)
      currentCharIndex.value--
      setTimeout(typeRole, 50)
    } else {
      isDeleting.value = false
      currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length
      setTimeout(typeRole, 500)
    }
  }
}

// Counter animation
const animateCounter = (current, target, setter, duration = 2000) => {
  const increment = target / (duration / 16)
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      setter(target)
      clearInterval(timer)
    } else {
      setter(Math.floor(current))
    }
  }, 16)
}



onMounted(() => {
  typeRole()
  
  // Animate counters
  setTimeout(() => {
    animateCounter(0, targetYears, (val) => animatedYears.value = val)
    animateCounter(0, targetPositions, (val) => animatedPositions.value = val, 2500)
    animateCounter(0, targetTools, (val) => animatedTools.value = val, 1500)
  }, 500)


})


</script>
