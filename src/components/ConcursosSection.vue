<template>
  <section id="concursos" class="min-h-screen py-20 bg-gradient-to-br from-concursos-from to-concursos-to animate-gradient relative overflow-hidden">
    <!-- Particle Background -->
    <ParticleBackground 
      :particle-count="25"
      shape="circle"
      particle-color="#fbbf24"
      line-color="rgba(251, 191, 36, 0.15)"
      :speed="0.5"
    />

    <!-- Elementos decorativos de fundo -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-40 right-60 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 left-40 w-80 h-80 bg-yellow-400 rounded-full blur-3xl animate-float" style="animation-delay: 1.2s;"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Cabeçalho da Seção -->
      <div 
        ref="headerRef"
        :class="['text-center mb-16 transition-all duration-700', headerVisible ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full text-amber-300 text-sm font-medium mb-4">
          <Award class="w-4 h-4" />
          Trajetória de Conquistas
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Concursos Públicos
        </h2>
        <p class="text-xl text-amber-100 max-w-2xl mx-auto">
          Experiência comprovada em processos seletivos públicos com múltiplas aprovações e nomeações
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
        <!-- Imagem -->
        <div 
          ref="imageRef"
          :class="['flex justify-center transition-all duration-700', imageVisible ? 'reveal-scale revealed' : 'reveal-scale']"
        >
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl blur-2xl opacity-50 animate-pulse group-hover:opacity-75 transition-opacity duration-300"></div>
            <img
              src="/images/concursos.png"
              alt="Conquistas em Concursos Públicos"
              loading="lazy"
              decoding="async"
              width="512"
              height="384"
              class="relative rounded-2xl shadow-2xl w-full max-w-lg transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500 glow-effect-amber"
            />
          </div>
        </div>

        <!-- Estatísticas -->
        <div 
          ref="statsRef"
          :class="['space-y-6 transition-all duration-700', statsVisible ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
        >
          <div class="glass-effect-strong rounded-xl p-6">
            <h3 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Trophy class="w-8 h-8 text-amber-300" />
              Histórico de Aprovações
            </h3>
            <p class="text-amber-100 leading-relaxed mb-6">
              Trajetória sólida em concursos públicos, demonstrando consistência, dedicação e 
              competência técnica em processos seletivos de alta concorrência.
            </p>
            
            <!-- Estatísticas principais -->
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
                <div class="text-4xl font-bold text-amber-300 mb-1">{{ animatedAprovacoes }}+</div>
                <div class="text-sm text-amber-200">Aprovações</div>
              </div>
              <div class="text-center p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
                <div class="text-4xl font-bold text-amber-300 mb-1">{{ animatedNomeacoes }}</div>
                <div class="text-sm text-amber-200">Nomeações</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cards de Bancas -->
      <div 
        ref="bancasHeaderRef"
        :class="['text-center mb-8 transition-all duration-700', bancasHeaderVisible ? 'reveal-fade-up revealed' : 'reveal-fade-up']"
      >
        <h3 class="text-3xl font-bold text-white mb-2">Experiência com Bancas</h3>
        <p class="text-amber-100">Conhecimento prático das principais organizadoras de concursos</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(banca, index) in bancas"
          :key="index"
          ref="bancaRefs"
          :class="['glass-effect-strong rounded-xl p-6 transition-all duration-700 cursor-pointer group',
                   bancasVisible[index] ? 'reveal-scale revealed' : 'reveal-scale']"
          :style="{ 
            transitionDelay: `${index * 100}ms`,
            ...getBancaStyle(index)
          }"
          @mouseenter="handleBancaHover(index)"
          @mousemove="handleBancaMove(index, $event)"
          @mouseleave="handleBancaLeave(index)"
        >
          <!-- Ícone da banca -->
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <component :is="banca.icon" class="w-8 h-8 text-white" />
            </div>
          </div>

          <!-- Nome da banca -->
          <h4 class="text-xl font-bold text-white text-center mb-3 group-hover:text-amber-300 transition-colors">
            {{ banca.nome }}
          </h4>

          <!-- Descrição -->
          <p class="text-amber-100 text-sm text-center mb-4">
            {{ banca.descricao }}
          </p>

          <!-- Características -->
          <div class="space-y-2">
            <div 
              v-for="(caracteristica, idx) in banca.caracteristicas"
              :key="idx"
              class="flex items-center gap-2 text-xs text-amber-200"
            >
              <CheckCircle2 class="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{{ caracteristica }}</span>
            </div>
          </div>

          <!-- Badge de destaque -->
          <div class="mt-4 pt-4 border-t border-amber-500/30">
            <span class="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-medium">
              {{ banca.tipo }}
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
  Award, Trophy, CheckCircle2, 
  Building2, FileText, Users, Briefcase
} from 'lucide-vue-next'

const bancas = [
  {
    nome: 'FCC',
    icon: Building2,
    descricao: 'Fundação Carlos Chagas - Referência nacional em concursos de grande porte',
    caracteristicas: [
      'Provas objetivas e discursivas',
      'Foco em interpretação',
      'Questões contextualizadas'
    ],
    tipo: 'Nacional'
  },
  {
    nome: 'FUNDATEC',
    icon: FileText,
    descricao: 'Fundação de Apoio da UFRGS - Forte atuação no Rio Grande do Sul',
    caracteristicas: [
      'Provas regionais',
      'Questões práticas',
      'Foco em legislação local'
    ],
    tipo: 'Regional'
  },
  {
    nome: 'La Salle',
    icon: Users,
    descricao: 'Organização vinculada à rede La Salle de ensino',
    caracteristicas: [
      'Concursos municipais',
      'Provas objetivas',
      'Perfil educacional'
    ],
    tipo: 'Regional'
  },
  {
    nome: 'OBJETIVA',
    icon: Briefcase,
    descricao: 'Atuação consolidada em concursos do Sul do Brasil',
    caracteristicas: [
      'Diversos níveis',
      'Provas técnicas',
      'Ampla abrangência'
    ],
    tipo: 'Regional'
  }
]

const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal(0.2)
const { elementRef: imageRef, isVisible: imageVisible } = useScrollReveal(0.2)
const { elementRef: statsRef, isVisible: statsVisible } = useScrollReveal(0.2)
const { elementRef: bancasHeaderRef, isVisible: bancasHeaderVisible } = useScrollReveal(0.2)

const bancaRefs = ref([])
const bancasVisible = ref(bancas.map(() => false))
const bancaTransforms = ref(bancas.map(() => ({ x: 0, y: 0, hover: false })))

// Contadores animados
const animatedAprovacoes = ref(0)
const animatedNomeacoes = ref(0)

// Efeito 3D nos cards
const getBancaStyle = (index) => {
  const transform = bancaTransforms.value[index]
  if (!transform.hover) {
    return {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    }
  }
  
  return {
    transform: `perspective(1000px) rotateX(${transform.x}deg) rotateY(${transform.y}deg) scale(1.05)`,
  }
}

const handleBancaHover = (index) => {
  bancaTransforms.value[index].hover = true
}

const handleBancaMove = (index, event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = ((y - centerY) / centerY) * -10
  const rotateY = ((x - centerX) / centerX) * 10
  
  bancaTransforms.value[index] = {
    x: rotateX,
    y: rotateY,
    hover: true
  }
}

const handleBancaLeave = (index) => {
  bancaTransforms.value[index] = { x: 0, y: 0, hover: false }
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
  // Observer para os cards de bancas
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = bancaRefs.value.indexOf(entry.target)
          if (index !== -1) {
            bancasVisible.value[index] = true
          }
        }
      })
    },
    { threshold: 0.2 }
  )

  bancaRefs.value.forEach((banca) => {
    if (banca) observer.observe(banca)
  })

  // Animar contadores quando as estatísticas ficarem visíveis
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          animateCounter((val) => animatedAprovacoes.value = val, 15, 2000)
          animateCounter((val) => animatedNomeacoes.value = val, 8, 1500)
        }, 300)
      }
    },
    { threshold: 0.2 }
  )

  if (statsRef.value) {
    statsObserver.observe(statsRef.value)
  }
})
</script>
