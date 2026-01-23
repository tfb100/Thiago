<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full pointer-events-none"
    :class="className"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  particleCount: {
    type: Number,
    default: 80
  },
  particleColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.5)'
  },
  lineColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.1)'
  },
  className: {
    type: String,
    default: ''
  }
})

const canvasRef = ref(null)
let animationId = null
let particles = []

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.radius = Math.random() * 2 + 1
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = props.particleColor
    ctx.fill()
  }
}

const initParticles = (canvas) => {
  particles = []
  const count = window.innerWidth < 768 ? props.particleCount / 2 : props.particleCount
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(canvas))
  }
}

const drawLines = (ctx) => {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 120) {
        ctx.beginPath()
        ctx.strokeStyle = props.lineColor
        ctx.lineWidth = 1
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}

const animate = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach(particle => {
    particle.update()
    particle.draw(ctx)
  })

  drawLines(ctx)

  animationId = requestAnimationFrame(animate)
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  initParticles(canvas)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  initParticles(canvas)
  animate()

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>
