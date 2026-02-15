<template>
  <section
    id="inicio"
    class="relative min-h-screen flex flex-col items-center justify-center exec-hero-bg px-4 sm:px-6 lg:px-8"
  >
    <div class="relative z-10 text-center max-w-3xl mx-auto">
      <p
        class="text-exec-accent text-sm font-medium tracking-widest uppercase mb-8 exec-reveal"
        :class="{ revealed: heroRevealed }"
      >
        Tecnologia & Inovação
      </p>
      <h1
        class="font-exec font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-tight exec-reveal"
        :class="{ revealed: heroRevealed }"
        style="transition-delay: 50ms"
      >
        Thiago Barcelos
      </h1>
      <p
        class="mt-6 text-lg sm:text-xl text-exec-muted exec-reveal max-w-xl mx-auto"
        :class="{ revealed: heroRevealed }"
        style="transition-delay: 100ms"
      >
        Analista em TI · Especialista em IA e automação · Software livre
      </p>
      <div
        class="mt-12 flex flex-wrap items-center justify-center gap-4 exec-reveal"
        :class="{ revealed: heroRevealed }"
        style="transition-delay: 150ms"
      >
        <a
          href="#experiencia"
          @click.prevent="scrollTo('experiencia')"
          class="exec-btn exec-btn-primary"
        >
          Ver trajetória
        </a>
        <a
          href="#contato"
          @click.prevent="scrollTo('contato')"
          class="exec-btn exec-btn-outline"
        >
          Contato
        </a>
      </div>
    </div>

    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 exec-reveal"
      :class="{ revealed: heroRevealed }"
      style="transition-delay: 250ms"
    >
      <span class="text-exec-muted text-xs">Scroll</span>
      <svg class="w-5 h-5 text-exec-muted animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollToSection } from '../../composables/useScrollToSection'

const { scrollToSection } = useScrollToSection(80)
const scrollTo = (id) => scrollToSection(id)

const heroRevealed = ref(false)

onMounted(() => {
  heroRevealed.value = true
})
</script>

<style scoped>
.exec-btn {
  @apply inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-colors;
}
.exec-btn-primary {
  @apply bg-exec-accent text-white hover:bg-sky-500;
}
.exec-btn-outline {
  @apply border border-exec-border text-exec-muted hover:text-white hover:border-exec-muted;
}
</style>
