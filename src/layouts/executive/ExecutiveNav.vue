<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-exec-bg/90 backdrop-blur-xl border-b border-exec-border' : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <a
          href="#inicio"
          @click.prevent="scrollTo('inicio')"
          class="font-exec font-bold text-lg md:text-xl text-white hover:text-exec-accent transition-colors"
        >
          TB
        </a>
        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="item in items"
            :key="item.id"
            :href="`#${item.id}`"
            class="text-sm text-exec-muted hover:text-white transition-colors"
            @click.prevent="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
        </div>
        <button
          type="button"
          class="md:hidden p-2 text-exec-muted hover:text-white"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="menuOpen = !menuOpen"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    <div
      v-show="menuOpen"
      class="md:hidden border-t border-exec-border bg-exec-bg/95 backdrop-blur-xl px-4 py-4 space-y-2"
    >
      <a
        v-for="item in items"
        :key="item.id"
        :href="`#${item.id}`"
        class="block py-2 text-exec-muted hover:text-white"
        @click.prevent="scrollTo(item.id); menuOpen = false"
      >
        {{ item.label }}
      </a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollToSection } from '../../composables/useScrollToSection'

const { scrollToSection } = useScrollToSection(80)
const scrollTo = (id) => scrollToSection(id)

const scrolled = ref(false)
const menuOpen = ref(false)

const items = [
  { id: 'inicio', label: 'Início' },
  { id: 'statement', label: 'Visão' },
  { id: 'stats', label: 'Números' },
  { id: 'experiencia', label: 'Trajetória' },
  { id: 'focus', label: 'Foco' },
  { id: 'contato', label: 'Contato' },
]

const onScroll = () => {
  scrolled.value = window.scrollY > 60
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
