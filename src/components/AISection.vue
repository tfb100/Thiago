<template>
  <section id="ia-automacao" class="min-h-screen py-20 bg-gradient-to-br from-ai-from to-ai-to animate-gradient relative overflow-hidden">
    <!-- Particle Background -->
    <ParticleBackground 
      :particle-count="35"
      shape="triangle"
      particle-color="#60a5fa"
      line-color="rgba(96, 165, 250, 0.15)"
      :speed="1.2"
    />

    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-40 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-40 right-40 w-80 h-80 bg-sky-400 rounded-full blur-3xl animate-float" style="animation-delay: 2s;"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div 
        ref="headerRef"
        :class="['text-center mb-16 transition-all duration-700', headerVisible ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
      >
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          IA & Automação
        </h2>
        <p class="text-xl text-blue-100 max-w-2xl mx-auto">
          Explorando o futuro da tecnologia com inteligência artificial e automação para o dia a dia de TI
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Interest Cards -->
        <div class="order-2 md:order-1">
          <div class="grid grid-cols-1 gap-6">
            <div
              v-for="(interest, index) in interests"
              :key="index"
              ref="cardRefs"
              :class="['glass-effect-strong rounded-xl p-6 transition-all duration-700 cursor-pointer',
                       cardsVisible[index] ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
              :style="{ 
                transitionDelay: `${index * 100}ms`,
                transform: magneticTransforms[index]
              }"
              @mouseenter="handleMagneticEnter(index)"
              @mousemove="handleMagneticMove(index, $event)"
              @mouseleave="handleMagneticLeave(index)"
            >
              <div class="flex items-start space-x-4 mb-4">
                <div class="flex-shrink-0">
                  <div class="w-14 h-14 bg-gradient-to-br from-blue-400 to-sky-400 rounded-lg flex items-center justify-center text-3xl shadow-lg glow-effect-purple animate-pulse">
                    <component :is="interest.icon" class="w-8 h-8 text-white" />
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-white mb-2">{{ interest.title }}</h3>
                  <p class="text-blue-100 text-sm">{{ interest.description }}</p>
                </div>
              </div>
              
              <!-- Skill Progress Bar -->
              <div class="mt-4">
                <div class="flex justify-between text-sm text-blue-200 mb-2">
                  <span>Nível de Interesse</span>
                  <span class="font-bold">{{ interest.level }}%</span>
                </div>
                <div class="h-3 bg-blue-900/30 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-blue-400 to-sky-300 rounded-full transition-all duration-1000 ease-out glow-effect-purple"
                    :style="{ 
                      width: cardsVisible[index] ? `${interest.level}%` : '0%',
                      transitionDelay: `${index * 100 + 300}ms`
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Image -->
        <div 
          ref="imageRef"
          :class="['order-1 md:order-2 flex justify-center transition-all duration-700',
                   imageVisible ? 'reveal-scale revealed' : 'reveal-scale']"
        >
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-sky-400 rounded-2xl blur-2xl opacity-50 animate-pulse group-hover:opacity-75 transition-opacity duration-300"></div>
            <div class="absolute -inset-4 bg-gradient-to-r from-sky-400 to-blue-400 rounded-2xl blur-xl opacity-30 animate-float"></div>
            <img
              src="/images/ai-automation.png"
              alt="IA e Automação"
              loading="lazy"
              decoding="async"
              width="512"
              height="384"
              class="relative rounded-2xl shadow-2xl max-w-lg w-full transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 glow-effect-purple"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import ParticleBackground from './ParticleBackground.vue'
import { Bot, Settings, Cpu, LineChart } from 'lucide-vue-next'

const interests = [
  {
    icon: Bot,
    title: 'Inteligência Artificial',
    description: 'Explorando aplicações de IA para otimizar processos e melhorar a eficiência operacional em ambientes de TI.',
    level: 90
  },
  {
    icon: Settings,
    title: 'Automação de Processos',
    description: 'Implementando soluções de automação para reduzir tarefas repetitivas e aumentar a produtividade da equipe.',
    level: 95
  },
  {
    icon: Cpu,
    title: 'Machine Learning',
    description: 'Estudando algoritmos de aprendizado de máquina para análise preditiva e tomada de decisões inteligentes.',
    level: 85
  },
  {
    icon: LineChart,
    title: 'Análise de Dados',
    description: 'Utilizando IA para extrair insights valiosos de grandes volumes de dados e apoiar decisões estratégicas.',
    level: 88
  }
]

const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal(0.2)
const { elementRef: imageRef, isVisible: imageVisible } = useScrollReveal(0.2)

const cardRefs = ref([])
const cardsVisible = ref(interests.map(() => false))
const magneticTransforms = ref(interests.map(() => 'translate(0, 0)'))

// Magnetic hover effect
const handleMagneticEnter = (index) => {
  // Effect is handled in mousemove
}

const handleMagneticMove = (index, event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left - rect.width / 2
  const y = event.clientY - rect.top - rect.height / 2
  
  const moveX = x * 0.15
  const moveY = y * 0.15
  
  magneticTransforms.value[index] = `translate(${moveX}px, ${moveY}px) scale(1.02)`
}

const handleMagneticLeave = (index) => {
  magneticTransforms.value[index] = 'translate(0, 0) scale(1)'
}

onMounted(() => {
  // Observe each card
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.value.indexOf(entry.target)
          if (index !== -1) {
            cardsVisible.value[index] = true
          }
        }
      })
    },
    { threshold: 0.2 }
  )

  cardRefs.value.forEach((card) => {
    if (card) observer.observe(card)
  })
})
</script>
