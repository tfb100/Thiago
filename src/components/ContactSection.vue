<template>
  <section id="contato" class="py-20 bg-gradient-to-br from-contact-from to-contact-to relative overflow-hidden">
    <!-- Particle Background -->
    <ParticleBackground 
      :particle-count="20"
      shape="circle"
      particle-color="#94a3b8"
      line-color="rgba(148, 163, 184, 0.1)"
      :speed="0.5"
    />
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

      <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
        <!-- Image -->
        <div 
          ref="imageRef"
          :class="['flex justify-center transition-all duration-700', imageVisible ? 'reveal-scale revealed' : 'reveal-scale']"
        >
          <div class="relative group w-full max-w-lg">
            <div class="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-200 rounded-2xl blur-2xl opacity-50 animate-pulse group-hover:opacity-75 transition-opacity duration-300"></div>
            <img
              src="/images/contato.png"
              alt="Contato"
              loading="lazy"
              decoding="async"
              width="512"
              height="384"
              class="relative rounded-2xl shadow-2xl w-full transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500 glow-effect-cyan"
            />
          </div>
        </div>

        <!-- Contact Options -->
        <div class="grid grid-cols-1 gap-6">
          <a
            v-for="(contact, index) in contactMethods"
            :key="index"
            ref="cardRefs"
            :href="contact.link"
            target="_blank"
            rel="noopener noreferrer"
            :class="['glass-effect-strong rounded-xl p-6 transition-all duration-700 group cursor-pointer',
                     cardsVisible[index] ? 'reveal-scale revealed' : 'reveal-scale']"
            :style="{ 
              transitionDelay: `${index * 100}ms`,
              ...getCardStyle(index)
            }"
            @mouseenter="handleCardHover(index)"
            @mousemove="handleCardMove(index, $event)"
            @mouseleave="handleCardLeave(index)"
          >
            <div class="flex items-center space-x-6">
              <div class="flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <div class="w-16 h-16 bg-gradient-to-br from-slate-500 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                  <component :is="contact.icon" class="w-8 h-8 text-white" stroke-width="1.5" />
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {{ contact.title }}
                </h3>
                <p class="text-slate-300 group-hover:text-white transition-colors text-sm">
                  {{ contact.description }}
                </p>
                <div class="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span class="text-cyan-400 text-xs font-semibold flex items-center gap-1">
                    Acessar perfil
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import ParticleBackground from './ParticleBackground.vue'
import { Mail, Briefcase, Github, Twitter } from 'lucide-vue-next'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Entre em contato por email',
    link: 'mailto:contato@thiagobarcelos.com.br'
  },
  {
    icon: Briefcase,
    title: 'LinkedIn',
    description: 'Conecte-se profissionalmente',
    link: 'https://www.linkedin.com/in/thiago-barcelos-42963741/'
  },
  {
    icon: Github,
    title: 'GitHub',
    description: 'Veja meus projetos',
    link: 'https://github.com/tfb100'
  },
  {
    icon: Twitter,
    title: 'X (Twitter)',
    description: 'Siga-me para novidades',
    link: 'https://x.com/_thiagobarcelos'
  }
]

const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal(0.2)
const { elementRef: imageRef, isVisible: imageVisible } = useScrollReveal(0.2)
const { elementRef: footerRef, isVisible: footerVisible } = useScrollReveal(0.2)

const cardRefs = ref([])
const cardsVisible = ref([]) // Será preenchido dinamicamente
const cardTransforms = ref([]) // Será preenchido dinamicamente

onMounted(() => {
  cardsVisible.value = contactMethods.map(() => false)
  cardTransforms.value = contactMethods.map(() => ({ x: 0, y: 0, hover: false }))

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

// 3D card effect
const getCardStyle = (index) => {
  const transform = cardTransforms.value[index]
  if (!transform || !transform.hover) {
    return {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    }
  }
  
  return {
    transform: `perspective(1000px) rotateX(${transform.x}deg) rotateY(${transform.y}deg) translateZ(30px)`,
  }
}

const handleCardHover = (index) => {
  if (cardTransforms.value[index]) {
    cardTransforms.value[index].hover = true
  }
}

const handleCardMove = (index, event) => {
  if (!cardTransforms.value[index]) return
  
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
  if (cardTransforms.value[index]) {
    cardTransforms.value[index] = { x: 0, y: 0, hover: false }
  }
}
</script>
