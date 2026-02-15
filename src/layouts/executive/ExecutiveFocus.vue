<template>
  <section
    id="focus"
    class="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-exec-border"
    ref="sectionRef"
  >
    <div class="max-w-5xl mx-auto">
      <h2
        class="font-exec font-bold text-2xl md:text-3xl text-white mb-3 exec-reveal"
        :class="{ revealed: visible }"
      >
        Foco
      </h2>
      <p
        class="text-exec-muted mb-12 max-w-xl exec-reveal"
        :class="{ revealed: visible }"
        style="transition-delay: 0.1s"
      >
        IA, automação e software livre no centro da transformação digital.
      </p>

      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="(card, i) in focusCards"
          :key="i"
          class="exec-card-hover rounded-xl p-6 md:p-8 bg-exec-card border border-exec-border exec-reveal relative overflow-hidden"
          :class="{ revealed: visible }"
          :style="{ transitionDelay: `${(i + 2) * 80}ms` }"
        >
          <div class="absolute top-0 right-0 w-40 h-40 bg-exec-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div class="relative">
            <span class="text-4xl md:text-5xl mb-4 block">{{ card.icon }}</span>
            <h3 class="font-exec font-bold text-2xl text-white mb-2">
              {{ card.title }}
            </h3>
            <p class="text-exec-muted leading-relaxed">
              {{ card.description }}
            </p>
            <div class="mt-6 h-1.5 bg-exec-border rounded-full overflow-hidden">
              <div
                class="h-full bg-exec-accent rounded-full transition-all duration-1000"
                :style="{ width: visible ? card.level + '%' : '0%', transitionDelay: `${(i + 2) * 80 + 200}ms` }"
              />
            </div>
            <p class="text-exec-accent text-sm font-medium mt-2">{{ card.level }}% interesse</p>
          </div>
        </div>
      </div>

      <div
        class="mt-12 exec-reveal rounded-xl p-6 bg-exec-card border border-exec-border"
        :class="{ revealed: visible }"
        style="transition-delay: 0.4s"
      >
        <h3 class="font-exec font-bold text-xl text-white mb-4">Ferramentas open-source</h3>
        <p class="text-exec-muted mb-6">
          Experiência com as principais ferramentas para monitoramento, gestão e segurança de TI.
        </p>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="tag in tools"
            :key="tag"
            class="px-4 py-2 rounded-lg bg-exec-border/50 text-exec-muted text-sm font-medium hover:bg-exec-accent/20 hover:text-exec-accent transition-colors"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const visible = ref(false)

const focusCards = [
  {
    icon: '🤖',
    title: 'IA & Automação',
    description: 'Explorando inteligência artificial e automação para o dia a dia de TI e processos.',
    level: 95,
  },
  {
    icon: '🔧',
    title: 'Software Livre',
    description: 'Especialista em ferramentas open-source para infraestrutura, monitoramento e segurança.',
    level: 90,
  },
]

const tools = ['Monitoramento', 'Gestão de serviços', 'Segurança', 'Redes', 'Cloud', 'DevOps']

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) visible.value = true
    },
    { threshold: 0.15 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
onUnmounted(() => {
  if (observer && sectionRef.value) observer.unobserve(sectionRef.value)
})
</script>
