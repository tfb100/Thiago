<template>
  <section
    id="statement"
    class="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-exec-bg"
    ref="sectionRef"
  >
    <div class="max-w-3xl mx-auto text-center">
      <div
        class="exec-reveal"
        :class="{ revealed: visible }"
      >
        <p class="font-exec text-xl sm:text-2xl md:text-3xl text-white leading-relaxed">
          "Tecnologia não é sobre ferramentas. É sobre
          <span class="text-exec-accent font-medium">transformar</span>
          a forma como organizações e pessoas trabalham."
        </p>
        <p class="mt-8 text-exec-muted">
          IA, automação e software livre para resultados reais.
        </p>
      </div>
    </div>
    <div class="max-w-xl mx-auto mt-16 h-px bg-exec-border" />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const visible = ref(false)
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
