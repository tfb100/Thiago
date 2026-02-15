<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass-effect">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Name -->
        <div class="flex-shrink-0">
          <h1 class="text-2xl font-bold text-white">Thiago Barcelos</h1>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a
              v-for="item in navItems"
              :key="item.id"
              :href="`#${item.id}`"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              @click.prevent="scrollToSection(item.id)"
            >
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            type="button"
            :aria-expanded="mobileMenuOpen"
            :aria-label="mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <svg
              class="h-6 w-6"
              :class="{ hidden: mobileMenuOpen, block: !mobileMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ block: mobileMenuOpen, hidden: !mobileMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div :class="{ block: mobileMenuOpen, hidden: !mobileMenuOpen }" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-md">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          @click.prevent="scrollToSection(item.id); mobileMenuOpen = false"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollToSection } from '../composables/useScrollToSection'

const mobileMenuOpen = ref(false)
const { scrollToSection } = useScrollToSection()

const navItems = [
  { id: 'inicio', name: 'Início' },
  { id: 'concursos', name: 'Concursos' },
  { id: 'experiencia', name: 'Experiência' },
  { id: 'ia-automacao', name: 'IA & Automação' },
  { id: 'dev', name: 'Dev' },
  { id: 'opensource', name: 'Open Source' },
  { id: 'contato', name: 'Contato' },
]
</script>
