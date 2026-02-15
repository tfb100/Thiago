<template>
  <section
    id="experiencia"
    class="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    ref="sectionRef"
  >
    <div class="max-w-5xl mx-auto">
      <h2
        class="font-exec font-bold text-2xl md:text-3xl text-white mb-3 exec-reveal"
        :class="{ revealed: visible }"
      >
        Trajetória
      </h2>
      <p
        class="text-exec-muted mb-12 max-w-xl exec-reveal"
        :class="{ revealed: visible }"
        style="transition-delay: 0.1s"
      >
        {{ positions.length }} nomeações em órgãos públicos, construindo carreira sólida em TI.
      </p>

      <div class="space-y-4">
        <div
          v-for="(position, i) in positions"
          :key="i"
          class="exec-card-hover rounded-xl p-6 md:p-8 bg-exec-card border border-exec-border exec-reveal"
          :class="{ revealed: cardsVisible[i] }"
          :style="{ transitionDelay: `${i * 80}ms` }"
          @mouseenter="hoverIndex = i"
          @mouseleave="hoverIndex = null"
        >
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-exec font-bold text-sm text-white bg-exec-border"
                :class="hoverIndex === i ? 'bg-exec-accent' : ''"
              >
                {{ i + 1 }}
              </div>
              <div>
                <h3 class="font-exec font-bold text-xl text-white">
                  {{ position.title }}
                </h3>
                <p class="text-exec-accent font-medium mt-0.5">
                  {{ position.organization }}
                </p>
                <p class="text-exec-muted text-sm mt-2">
                  {{ position.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const visible = ref(false)
const cardsVisible = ref([false, false, false, false, false])
const hoverIndex = ref(null)

const positions = [
  { title: 'Analista em TI', organization: 'Conselho Regional de Medicina', description: 'Gestão de infraestrutura e sistemas de TI' },
  { title: 'Técnico em Tecnologia', organization: 'DPE/RS - Defensoria Pública', description: 'Infraestrutura de TI e suporte aos usuários' },
  { title: 'Técnico em TI', organization: 'UFSM - Universidade Federal', description: 'Administração de redes e sistemas' },
  { title: 'Técnico em TI', organization: 'Câmara de Vereadores de Viamão', description: 'Gestão de infraestrutura tecnológica' },
  { title: 'Técnico em TI', organization: 'Prefeitura de Sapiranga', description: 'Suporte técnico e administração de sistemas' },
]

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        cardsVisible.value = positions.map(() => true)
      }
    },
    { threshold: 0.1 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
onUnmounted(() => {
  if (observer && sectionRef.value) observer.unobserve(sectionRef.value)
})
</script>
