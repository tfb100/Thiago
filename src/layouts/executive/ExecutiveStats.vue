<template>
  <section
    id="stats"
    class="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-y border-exec-border"
    ref="sectionRef"
  >
    <div class="max-w-5xl mx-auto">
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 exec-stagger"
        :class="{ revealed: visible }"
      >
        <div
          v-for="(stat, i) in stats"
          :key="i"
          class="text-center exec-card-hover rounded-xl p-6 md:p-8 bg-exec-card border border-exec-border"
        >
          <div class="font-exec font-bold text-3xl md:text-4xl text-white tabular-nums">
            {{ stat.animated }}{{ stat.suffix || '' }}
          </div>
          <div class="mt-1.5 text-exec-muted text-sm">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const sectionRef = ref(null)
const visible = ref(false)
const stats = ref([
  { label: 'Anos de experiência', target: 10, animated: 0 },
  { label: 'Nomeações', target: 8, animated: 0 },
  { label: 'Ferramentas', target: 3, animated: 0 },
  { label: 'Foco em IA', target: 100, suffix: '%', animated: 0 },
])
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !visible.value) {
        visible.value = true
        stats.value.forEach((s, i) => {
          const target = s.target
          const duration = 2200
          const startTime = performance.now()
          function step(now) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(target * easeOut)
            stats.value[i].animated = current
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        })
      }
    },
    { threshold: 0.3 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
onUnmounted(() => {
  if (observer && sectionRef.value) observer.unobserve(sectionRef.value)
})
</script>
