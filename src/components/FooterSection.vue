<template>
  <footer class="py-12 bg-[#020617] border-t border-slate-800 relative overflow-hidden">
    <!-- Subtle Background Detail -->
    <div class="absolute inset-0 opacity-5 pointer-events-none">
      <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <!-- Logo & Brand -->
        <div class="text-center md:text-left">
          <h2 class="text-2xl font-bold text-white mb-2">Thiago Barcelos</h2>
          <p class="text-slate-400 max-w-xs">
            Transformando o futuro através da IA, automação e software livre.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="flex flex-wrap justify-center gap-6">
          <a v-for="link in footerLinks" :key="link.name" :href="link.href" class="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium">
            {{ link.name }}
          </a>
        </div>

        <!-- Social Icons -->
        <div class="flex gap-4">
          <a href="#" class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-lg">
            <Linkedin class="w-5 h-5" />
          </a>
          <a href="#" class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-lg">
            <Github class="w-5 h-5" />
          </a>
          <a href="#" class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-lg">
            <Mail class="w-5 h-5" />
          </a>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8"></div>

      <!-- Copyright & Credits -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-slate-500 text-sm">
          © {{ currentYear }} Thiago Freitas Barcelos. Todos os direitos reservados.
        </div>
        
        <div class="flex items-center gap-3 text-slate-500 text-sm">
          <span>Desenvolvido com</span>
          <Heart class="w-4 h-4 text-red-500 animate-pulse" />
          <span>usando</span>
          <div class="flex gap-2">
            <span class="px-2 py-0.5 bg-slate-800/80 rounded border border-slate-700 text-emerald-400 text-xs font-mono">Vue.js</span>
            <span class="px-2 py-0.5 bg-slate-800/80 rounded border border-slate-700 text-cyan-400 text-xs font-mono">Tailwind</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Linkedin, Github, Mail, Heart } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())

const footerLinks = [
  { name: 'Início', href: '#inicio' },
  { name: 'Concursos', href: '#concursos' },
  { name: 'Experiência', href: '#experiencia' },
  { name: 'Dev', href: '#dev' },
  { name: 'Open Source', href: '#opensource' },
  { name: 'Contato', href: '#contato' }
]
</script>
