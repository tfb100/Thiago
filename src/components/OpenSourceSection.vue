<template>
  <section id="opensource" class="min-h-screen py-20 bg-gradient-to-br from-opensource-from to-opensource-to animate-gradient relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-60 right-60 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 left-40 w-80 h-80 bg-sky-400 rounded-full blur-3xl animate-float" style="animation-delay: 1s;"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div 
        ref="headerRef"
        :class="['text-center mb-16 transition-all duration-700', headerVisible ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
      >
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Software Livre
        </h2>
        <p class="text-xl text-cyan-100 max-w-2xl mx-auto">
          Especialista em ferramentas open-source para monitoramento, gestão e segurança de TI
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center mb-12">
        <!-- Tools Image -->
        <div 
          ref="imageRef"
          :class="['flex justify-center transition-all duration-700', imageVisible ? 'reveal-scale revealed' : 'reveal-scale']"
        >
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-400 rounded-2xl blur-2xl opacity-50 animate-pulse group-hover:opacity-75 transition-opacity duration-300"></div>
            <div class="absolute -inset-4 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-2xl blur-xl opacity-30 animate-float"></div>
            <img
              src="/images/opensource-tools.png"
              alt="Ferramentas Open Source"
              class="relative rounded-2xl shadow-2xl max-w-lg w-full transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500 glow-effect-orange"
            />
          </div>
        </div>

        <!-- Tools Description -->
        <div 
          ref="descRef"
          :class="['space-y-6 transition-all duration-700', descVisible ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
        >
          <div class="glass-effect-strong rounded-xl p-6">
            <h3 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span class="text-3xl">🔧</span>
              Ferramentas de Expertise
            </h3>
            <p class="text-cyan-100 leading-relaxed mb-4">
              Experiência prática com as principais ferramentas open-source para infraestrutura de TI, 
              garantindo monitoramento eficiente, gestão de serviços e segurança robusta.
            </p>
            
            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4 mt-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-cyan-300">{{ animatedProjects }}</div>
                <div class="text-xs text-cyan-200">Projetos</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-cyan-300">{{ animatedYears }}+</div>
                <div class="text-xs text-cyan-200">Anos</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-cyan-300">{{ animatedTools }}</div>
                <div class="text-xs text-cyan-200">Ferramentas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tools Grid -->
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(tool, index) in tools"
          :key="index"
          ref="toolRefs"
          :class="['glass-effect-strong rounded-xl p-8 text-center transition-all duration-700 cursor-pointer group',
                   toolsVisible[index] ? 'reveal-scale revealed' : 'reveal-scale']"
          :style="{ 
            transitionDelay: `${index * 150}ms`,
            ...getToolStyle(index)
          }"
          @mouseenter="handleToolHover(index)"
          @mousemove="handleToolMove(index, $event)"
          @mouseleave="handleToolLeave(index)"
        >
          <div class="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-float">
            {{ tool.icon }}
          </div>
          <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
            {{ tool.name }}
          </h3>
          <p class="text-cyan-100 mb-4">{{ tool.description }}</p>
          
          <!-- Skill Level -->
          <div class="mb-4">
            <div class="h-2 bg-cyan-900/30 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-cyan-400 to-sky-300 rounded-full transition-all duration-1000 ease-out glow-effect-orange"
                :style="{ 
                  width: toolsVisible[index] ? `${tool.skillLevel}%` : '0%',
                  transitionDelay: `${index * 150 + 400}ms`
                }"
              ></div>
            </div>
            <div class="text-xs text-cyan-200 mt-1">Expertise: {{ tool.skillLevel }}%</div>
          </div>

          <!-- Features -->
          <div class="flex flex-wrap gap-2 justify-center">
            <span
              v-for="(feature, idx) in tool.features"
              :key="idx"
              class="px-3 py-1 bg-cyan-500/30 text-cyan-100 rounded-full text-sm transform hover:scale-110 transition-transform duration-200 shimmer"
            >
              {{ feature }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const tools = [
  {
    icon: '📊',
    name: 'Zabbix',
    description: 'Monitoramento completo de infraestrutura e aplicações em tempo real',
    features: ['Monitoramento', 'Alertas', 'Dashboards', 'Métricas'],
    skillLevel: 95
  },
  {
    icon: '🎫',
    name: 'GLPI',
    description: 'Gestão de ativos de TI e central de serviços (Service Desk)',
    features: ['ITSM', 'Inventário', 'Chamados', 'Ativos'],
    skillLevel: 90
  },
  {
    icon: '🛡️',
    name: 'Wazuh',
    description: 'Plataforma de segurança para detecção de ameaças e compliance',
    features: ['SIEM', 'XDR', 'Compliance', 'Segurança'],
    skillLevel: 85
  }
]

const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal(0.2)
const { elementRef: imageRef, isVisible: imageVisible } = useScrollReveal(0.2)
const { elementRef: descRef, isVisible: descVisible } = useScrollReveal(0.2)

const toolRefs = ref([])
const toolsVisible = ref(tools.map(() => false))
const toolTransforms = ref(tools.map(() => ({ x: 0, y: 0, hover: false })))

// Animated counters
const animatedProjects = ref(0)
const animatedYears = ref(0)
const animatedTools = ref(0)

// 3D card effect
const getToolStyle = (index) => {
  const transform = toolTransforms.value[index]
  if (!transform.hover) {
    return {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    }
  }
  
  return {
    transform: `perspective(1000px) rotateX(${transform.x}deg) rotateY(${transform.y}deg) scale(1.05)`,
  }
}

const handleToolHover = (index) => {
  toolTransforms.value[index].hover = true
}

const handleToolMove = (index, event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = ((y - centerY) / centerY) * -15
  const rotateY = ((x - centerX) / centerX) * 15
  
  toolTransforms.value[index] = {
    x: rotateX,
    y: rotateY,
    hover: true
  }
}

const handleToolLeave = (index) => {
  toolTransforms.value[index] = { x: 0, y: 0, hover: false }
}

// Animate counters
const animateCounter = (setter, target, duration = 2000) => {
  const increment = target / (duration / 16)
  let current = 0
  
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
  // Observe tools
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = toolRefs.value.indexOf(entry.target)
          if (index !== -1) {
            toolsVisible.value[index] = true
          }
        }
      })
    },
    { threshold: 0.2 }
  )

  toolRefs.value.forEach((tool) => {
    if (tool) observer.observe(tool)
  })

  // Animate counters when description is visible
  const descObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          animateCounter((val) => animatedProjects.value = val, 15, 1500)
          animateCounter((val) => animatedYears.value = val, 5, 2000)
          animateCounter((val) => animatedTools.value = val, 3, 1000)
        }, 300)
      }
    },
    { threshold: 0.2 }
  )

  if (descRef.value) {
    descObserver.observe(descRef.value)
  }
})
</script>
