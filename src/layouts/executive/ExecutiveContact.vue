<template>
  <section
    id="contato"
    class="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    ref="sectionRef"
  >
    <div class="max-w-3xl mx-auto text-center">
      <h2
        class="font-exec font-bold text-2xl md:text-3xl text-white mb-3 exec-reveal"
        :class="{ revealed: visible }"
      >
        Contato
      </h2>
      <p
        class="text-exec-muted mb-10 exec-reveal"
        :class="{ revealed: visible }"
        style="transition-delay: 0.1s"
      >
        Tecnologia, IA, automação ou colaboração — vamos conversar.
      </p>

      <div
        class="grid sm:grid-cols-3 gap-6 exec-stagger"
        :class="{ revealed: visible }"
      >
        <a
          v-for="(contact, i) in contacts"
          :key="i"
          :href="contact.href"
          target="_blank"
          rel="noopener noreferrer"
          class="exec-card-hover rounded-xl p-6 border border-exec-border bg-exec-card flex flex-col items-center gap-3 group"
        >
          <span class="text-4xl group-hover:scale-110 transition-transform">{{ contact.icon }}</span>
          <span class="font-exec font-bold text-white group-hover:text-exec-accent transition-colors">
            {{ contact.label }}
          </span>
        </a>
      </div>

      <div class="mt-20 pt-12 border-t border-exec-border exec-reveal" :class="{ revealed: visible }">
        <p class="text-exec-muted text-sm">
          © {{ new Date().getFullYear() }} Thiago Freitas Barcelos
        </p>
        <p class="text-exec-muted/80 text-xs mt-2">
          Vue.js · Tailwind CSS
        </p>
        <a
          href="?"
          class="inline-block mt-4 text-exec-muted/70 hover:text-exec-accent text-xs transition-colors"
        >
          Ver layout clássico →
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const visible = ref(false)

const contacts = [
  { icon: '📧', label: 'Email', href: 'mailto:contato@thiagobarcelos.com' },
  { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: '💻', label: 'GitHub', href: 'https://github.com' },
]

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) visible.value = true
    },
    { threshold: 0.2 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
onUnmounted(() => {
  if (observer && sectionRef.value) observer.unobserve(sectionRef.value)
})
</script>
