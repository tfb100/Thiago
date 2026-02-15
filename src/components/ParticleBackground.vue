<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full pointer-events-none"
    :class="className"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

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
  },
  shape: {
    type: String,
    default: 'circle', // 'circle', 'square', 'triangle'
    validator: (value) => ['circle', 'square', 'triangle'].includes(value)
  },
  speed: {
    type: Number,
    default: 1
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
    // Apply speed multiplier
    this.vx = (Math.random() - 0.5) * 0.5 * props.speed
    this.vy = (Math.random() - 0.5) * 0.5 * props.speed
    this.radius = Math.random() * 2 + 1
    // Random rotation for shapes
    this.angle = Math.random() * Math.PI * 2
    this.vAngle = (Math.random() - 0.5) * 0.02
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.angle += this.vAngle

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.fillStyle = props.particleColor
    ctx.beginPath()

    if (props.shape === 'square') {
      ctx.rect(-this.radius, -this.radius, this.radius * 2, this.radius * 2)
    } else if (props.shape === 'triangle') {
      ctx.moveTo(0, -this.radius * 1.5)
      ctx.lineTo(this.radius, this.radius)
      ctx.lineTo(-this.radius, this.radius)
      ctx.closePath()
    } else {
      // Circle default
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
    }

    ctx.fill()
    ctx.restore()
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
  const maxDistanceSquared = 120 * 120 // Squared distance threshold
  
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distanceSquared = dx * dx + dy * dy

      if (distanceSquared < maxDistanceSquared) {
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

// Re-init on prop changes
watch(() => [props.particleCount, props.shape, props.speed], () => {
  if (canvasRef.value) initParticles(canvasRef.value)
})

let canvasObserver = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  initParticles(canvas)
  
  // Pause animation when off-screen
  canvasObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationId) animate()
      } else {
        if (animationId) {
          cancelAnimationFrame(animationId)
          animationId = null
        }
      }
    })
  }, { threshold: 0 })
  canvasObserver.observe(canvas)

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (canvasObserver) {
    canvasObserver.disconnect()
  }
  window.removeEventListener('resize', handleResize)
})
</script>
