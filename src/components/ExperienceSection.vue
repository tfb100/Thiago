<template>
  <section id="experiencia" class="min-h-screen py-20 bg-gradient-to-br from-experience-from to-experience-to animate-gradient relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-40 right-20 w-96 h-96 bg-emerald-300 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 left-20 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-float" style="animation-delay: 1.5s;"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div 
        ref="headerRef"
        :class="['text-center mb-16 transition-all duration-700', headerVisible ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
      >
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Experiência Profissional
        </h2>
        <p class="text-xl text-sky-100 max-w-2xl mx-auto">
          <span class="text-3xl font-bold text-sky-300">{{ animatedCount }}</span> nomeações em órgãos públicos, construindo uma carreira sólida em TI
        </p>
        
        <!-- Progress line -->
        <div class="mt-8 max-w-md mx-auto">
          <div class="h-2 bg-emerald-900/30 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full transition-all duration-2000 ease-out glow-effect-green"
              :style="{ width: headerVisible ? '100%' : '0%' }"
            ></div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-8 items-center">
        <!-- Career Image -->
        <div 
          ref="imageRef"
          :class="['flex justify-center transition-all duration-700', imageVisible ? 'reveal-scale revealed' : 'reveal-scale']"
        >
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <img
              src="/images/it-career.png"
              alt="Carreira em TI"
              class="relative rounded-2xl shadow-2xl max-w-lg w-full transform group-hover:scale-105 transition-transform duration-300 glow-effect-green"
            />
          </div>
        </div>

        <!-- Experience Timeline -->
        <div class="space-y-6">
          <div
            v-for="(position, index) in positions"
            :key="index"
            ref="cardRefs"
            :class="['glass-effect-strong rounded-xl p-6 transition-all duration-700 cursor-pointer', 
                     cardsVisible[index] ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
            :style="{ 
              transitionDelay: `${index * 100}ms`,
              ...getCardStyle(index)
            }"
            @mouseenter="handleCardHover(index, $event)"
            @mousemove="handleCardMove(index, $event)"
            @mouseleave="handleCardLeave(index)"
          >
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-br from-sky-400 to-cyan-300 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg glow-effect-green transform hover:rotate-12 transition-transform duration-300">
                  {{ index + 1 }}
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {{ position.title }}
                </h3>
                <p class="text-sky-200 font-semibold mb-1 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
                  </svg>
                  {{ position.organization }}
                </p>
                <p class="text-sky-100 text-sm">{{ position.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const positions = [
  {
    title: 'Analista em TI',
    organization: 'Conselho Regional de Medicina',
    description: 'Gestão de infraestrutura e sistemas de TI'
  },
  {
    title: 'Analista em TI',
    organization: 'Prefeitura de Esteio/RS',
    description: 'Administração de sistemas e suporte técnico'
  },
  {
    title: 'Técnico em Tecnologia',
    organization: 'TJ/RS - Tribunal de Justiça',
    description: 'Suporte técnico e manutenção de sistemas'
  },
  {
    title: 'Técnico em Tecnologia',
    organization: 'DPE/RS - Defensoria Pública',
    description: 'Infraestrutura de TI e suporte aos usuários'
  },
  {
    title: 'Técnico em TI',
    organization: 'UFSM - Universidade Federal',
    description: 'Administração de redes e sistemas'
  },
  {
    title: 'Técnico em TI',
    organization: 'Câmara de Vereadores de Viamão',
    description: 'Gestão de infraestrutura tecnológica'
  },
  {
    title: 'Técnico em TI',
    organization: 'Prefeitura de Sapiranga',
    description: 'Suporte técnico e administração de sistemas'
  }
]

const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal(0.2)
const { elementRef: imageRef, isVisible: imageVisible } = useScrollReveal(0.2)

const cardRefs = ref([])
const cardsVisible = ref(positions.map(() => false))
const cardTransforms = ref(positions.map(() => ({ x: 0, y: 0, hover: false })))
const animatedCount = ref(0)

// 3D card effect
const getCardStyle = (index) => {
  const transform = cardTransforms.value[index]
  if (!transform.hover) {
    return {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    }
  }
  
  return {
    transform: `perspective(1000px) rotateX(${transform.x}deg) rotateY(${transform.y}deg) scale(1.02)`,
  }
}

const handleCardHover = (index) => {
  cardTransforms.value[index].hover = true
}

const handleCardMove = (index, event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = ((y - centerY) / centerY) * -10
  const rotateY = ((x - centerX) / centerX) * 10
  
  cardTransforms.value[index] = {
    x: rotateX,
    y: rotateY,
    hover: true
  }
}

const handleCardLeave = (index) => {
  cardTransforms.value[index] = { x: 0, y: 0, hover: false }
}

// Animate counter
const animateCounter = () => {
  const target = positions.length
  const duration = 2000
  const increment = target / (duration / 16)
  let current = 0
  
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      animatedCount.value = target
      clearInterval(timer)
    } else {
      animatedCount.value = Math.floor(current)
    }
  }, 16)
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

  // Animate counter when header is visible
  const headerObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounter()
      }
    },
    { threshold: 0.2 }
  )

  if (headerRef.value) {
    headerObserver.observe(headerRef.value)
  }
})
</script>
