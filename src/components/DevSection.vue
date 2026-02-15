<template>
  <section id="dev" class="min-h-screen py-20 bg-gradient-to-br from-dev-from to-dev-to animate-gradient relative overflow-hidden">
    <!-- Particle Background -->
    <ParticleBackground 
      :particle-count="30"
      shape="square"
      particle-color="#5eead4"
      line-color="rgba(94, 234, 212, 0.15)"
      :speed="0.6"
    />

    <!-- Elementos decorativos de fundo -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-40 left-60 w-96 h-96 bg-teal-300 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-40 w-80 h-80 bg-emerald-400 rounded-full blur-3xl animate-float" style="animation-delay: 1.5s;"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Cabeçalho da Seção -->
      <div 
        ref="headerRef"
        :class="['text-center mb-16 transition-all duration-700', headerVisible ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 rounded-full text-teal-300 text-sm font-medium mb-4">
          <Rocket class="w-4 h-4" />
          Jornada em andamento
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Desenvolvimento Web & Mobile
        </h2>
        <p class="text-xl text-teal-100 max-w-2xl mx-auto">
          Explorando novas habilidades para criar aplicações modernas, responsivas e escaláveis
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
        <!-- Imagem / Visual -->
        <div 
          ref="imageRef"
          :class="['flex justify-center transition-all duration-700', imageVisible ? 'reveal-scale revealed' : 'reveal-scale']"
        >
          <div class="relative group w-full max-w-lg">
            <div class="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-2xl blur-2xl opacity-50 animate-pulse group-hover:opacity-75 transition-opacity duration-300"></div>
            <img
              src="/images/Dev.png"
              alt="Desenvolvimento Web e Mobile"
              loading="lazy"
              decoding="async"
              width="512"
              height="384"
              class="relative rounded-2xl shadow-2xl w-full transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500 glow-effect-green"
            />
          </div>
        </div>

        <!-- Descrição -->
        <div 
          ref="descRef"
          :class="['space-y-6 transition-all duration-700', descVisible ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
        >
          <div class="glass-effect-strong rounded-xl p-6">
            <h3 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <BookOpen class="w-8 h-8 text-teal-300" />
              Em constante evolução
            </h3>
            <p class="text-teal-100 leading-relaxed mb-4">
              Ampliando meu stack de desenvolvimento com tecnologias modernas para web e mobile. 
              Cada projeto é uma oportunidade de aprender e aplicar novas ferramentas na prática.
            </p>
            
            <!-- Progresso geral -->
            <div class="grid grid-cols-3 gap-4 mt-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-teal-300">{{ animatedFrameworks }}</div>
                <div class="text-xs text-teal-200">Frameworks</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-teal-300">{{ animatedTools }}</div>
                <div class="text-xs text-teal-200">Ferramentas</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-teal-300">{{ animatedDBs }}</div>
                <div class="text-xs text-teal-200">Bancos de Dados</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cards de Tecnologias - 3 Categorias -->
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Frameworks -->
        <div
          v-for="(category, catIndex) in categories"
          :key="catIndex"
          ref="categoryRefs"
          :class="['glass-effect-strong rounded-xl p-8 transition-all duration-700 cursor-pointer group',
                   categoriesVisible[catIndex] ? 'reveal-scale revealed' : 'reveal-scale']"
          :style="{ 
            transitionDelay: `${catIndex * 150}ms`,
            ...getCategoryStyle(catIndex)
          }"
          @mouseenter="handleCategoryHover(catIndex)"
          @mousemove="handleCategoryMove(catIndex, $event)"
          @mouseleave="handleCategoryLeave(catIndex)"
        >
          <!-- Ícone da categoria -->
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg">
              <component :is="category.icon" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
              {{ category.title }}
            </h3>
          </div>

          <!-- Itens da categoria -->
          <div class="space-y-4">
            <div
              v-for="(item, itemIndex) in category.items"
              :key="itemIndex"
              class="flex items-center gap-3"
            >
              <component :is="item.icon" class="w-5 h-5 text-teal-400 flex-shrink-0" />
              <div class="flex-1">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-white font-medium text-sm">{{ item.name }}</span>
                  <span class="text-teal-300 text-xs font-bold">{{ item.level }}%</span>
                </div>
                <div class="h-1.5 bg-teal-900/30 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-teal-400 to-emerald-300 rounded-full transition-all duration-1000 ease-out"
                    :style="{ 
                      width: categoriesVisible[catIndex] ? `${item.level}%` : '0%',
                      transitionDelay: `${catIndex * 150 + itemIndex * 200 + 400}ms`
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tag de status -->
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="(tag, tagIdx) in category.tags"
              :key="tagIdx"
              class="px-3 py-1 bg-teal-500/20 text-teal-200 rounded-full text-xs font-medium"
            >
              {{ tag }}
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
import ParticleBackground from './ParticleBackground.vue'
import { 
  Rocket, BookOpen, Code, Wrench, Database,
  Atom, Server, Layers, Zap, Smartphone, 
  Table, CloudCog
} from 'lucide-vue-next'

const categories = [
  {
    icon: Code,
    title: 'Frameworks',
    items: [
      { name: 'React', icon: Atom, level: 40 },
      { name: 'Vue.js', icon: Layers, level: 55 },
      { name: 'Node.js', icon: Server, level: 45 },
    ],
    tags: ['Frontend', 'Backend', 'Full-Stack']
  },
  {
    icon: Wrench,
    title: 'Ferramentas',
    items: [
      { name: 'Vite', icon: Zap, level: 50 },
      { name: 'Capacitor', icon: Smartphone, level: 35 },
    ],
    tags: ['Build Tool', 'Mobile Hybrid']
  },
  {
    icon: Database,
    title: 'Bancos de Dados',
    items: [
      { name: 'MySQL', icon: Table, level: 60 },
      { name: 'PostgreSQL', icon: Database, level: 45 },
      { name: 'Supabase', icon: CloudCog, level: 30 },
    ],
    tags: ['SQL', 'NoSQL', 'BaaS']
  }
]

const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal(0.2)
const { elementRef: imageRef, isVisible: imageVisible } = useScrollReveal(0.2)
const { elementRef: descRef, isVisible: descVisible } = useScrollReveal(0.2)

const categoryRefs = ref([])
const categoriesVisible = ref(categories.map(() => false))
const categoryTransforms = ref(categories.map(() => ({ x: 0, y: 0, hover: false })))

// Contadores animados
const animatedFrameworks = ref(0)
const animatedTools = ref(0)
const animatedDBs = ref(0)

// Efeito 3D nos cards
const getCategoryStyle = (index) => {
  const transform = categoryTransforms.value[index]
  if (!transform.hover) {
    return {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    }
  }
  
  return {
    transform: `perspective(1000px) rotateX(${transform.x}deg) rotateY(${transform.y}deg) scale(1.05)`,
  }
}

const handleCategoryHover = (index) => {
  categoryTransforms.value[index].hover = true
}

const handleCategoryMove = (index, event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = ((y - centerY) / centerY) * -15
  const rotateY = ((x - centerX) / centerX) * 15
  
  categoryTransforms.value[index] = {
    x: rotateX,
    y: rotateY,
    hover: true
  }
}

const handleCategoryLeave = (index) => {
  categoryTransforms.value[index] = { x: 0, y: 0, hover: false }
}

// Animação de contadores
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
  // Observer para os cards de categoria
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = categoryRefs.value.indexOf(entry.target)
          if (index !== -1) {
            categoriesVisible.value[index] = true
          }
        }
      })
    },
    { threshold: 0.2 }
  )

  categoryRefs.value.forEach((cat) => {
    if (cat) observer.observe(cat)
  })

  // Animar contadores quando a descrição ficar visível
  const descObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          animateCounter((val) => animatedFrameworks.value = val, 3, 1500)
          animateCounter((val) => animatedTools.value = val, 2, 1000)
          animateCounter((val) => animatedDBs.value = val, 3, 1500)
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
