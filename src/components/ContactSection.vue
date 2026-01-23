<template>
  <section id="contato" class="py-20 bg-gradient-to-br from-contact-from to-contact-to relative overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div 
        ref="headerRef"
        :class="['text-center mb-12 transition-all duration-700', headerVisible ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
      >
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Entre em Contato
        </h2>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto">
          Vamos conversar sobre tecnologia, IA, automação ou oportunidades de colaboração
        </p>
      </div>

      <!-- Contact Options -->
      <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
        <a
          v-for="(contact, index) in contactMethods"
          :key="index"
          ref="cardRefs"
          :href="contact.link"
          target="_blank"
          rel="noopener noreferrer"
          :class="['glass-effect-strong rounded-xl p-6 text-center transition-all duration-700 group cursor-pointer',
                   cardsVisible[index] ? 'reveal-scale revealed' : 'reveal-scale']"
          :style="{ 
            transitionDelay: `${index * 100}ms`,
            ...getCardStyle(index)
          }"
          @mouseenter="handleCardHover(index)"
          @mousemove="handleCardMove(index, $event)"
          @mouseleave="handleCardLeave(index)"
        >
          <div class="text-5xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 inline-block">
            {{ contact.icon }}
          </div>
          <h3 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {{ contact.title }}
          </h3>
          <p class="text-slate-300 group-hover:text-white transition-colors">
            {{ contact.description }}
          </p>
          
          <!-- Hover indicator -->
          <div class="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="text-cyan-400 text-sm font-semibold flex items-center justify-center gap-2">
              Clique para acessar
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </div>
        </a>
      </div>

      <!-- Footer -->
      <div 
        ref="footerRef"
        :class="['text-center pt-12 border-t border-slate-600 transition-all duration-700',
                 footerVisible ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
      >
        <p class="text-slate-400 mb-4 flex items-center justify-center gap-2">
          <span>© {{ currentYear }} Thiago Freitas Barcelos.</span>
          <span class="hidden sm:inline">Todos os direitos reservados.</span>
        </p>
        <p class="text-slate-500 text-sm flex items-center justify-center gap-2 flex-wrap">
          <span>Desenvolvido com</span>
          <span class="inline-flex items-center gap-1">
            <svg class="w-4 h-4 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
            </svg>
            usando
          </span>
          <span class="px-2 py-1 bg-slate-700 rounded text-emerald-400 text-xs font-mono">Vue.js</span>
          <span class="text-slate-600">&</span>
          <span class="px-2 py-1 bg-slate-700 rounded text-cyan-400 text-xs font-mono">Tailwind CSS</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const currentYear = computed(() => new Date().getFullYear())

const contactMethods = [
  {
    icon: '📧',
    title: 'Email',
    description: 'Entre em contato por email',
    link: 'mailto:contato@thiagobarcelos.com'
  },
  {
    icon: '💼',
    title: 'LinkedIn',
    description: 'Conecte-se profissionalmente',
    link: 'https://linkedin.com'
  },
  {
    icon: '💻',
    title: 'GitHub',
    description: 'Veja meus projetos',
    link: 'https://github.com'
  }
]

const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal(0.2)
const { elementRef: footerRef, isVisible: footerVisible } = useScrollReveal(0.2)

const cardRefs = ref([])
const cardsVisible = ref(contactMethods.map(() => false))
const cardTransforms = ref(contactMethods.map(() => ({ x: 0, y: 0, hover: false })))

// 3D card effect
const getCardStyle = (index) => {
  const transform = cardTransforms.value[index]
  if (!transform.hover) {
    return {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    }
  }
  
  return {
    transform: `perspective(1000px) rotateX(${transform.x}deg) rotateY(${transform.y}deg) translateZ(30px)`,
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

onMounted(() => {
  // Observe cards
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
