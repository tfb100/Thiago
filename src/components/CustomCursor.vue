<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorX = ref(0)
const cursorY = ref(0)
const trailX = ref(0)
const trailY = ref(0)
const isHovering = ref(false)
const isVisible = ref(false)

const updateCursor = (e) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
  isVisible.value = true
}

const hideCursor = () => {
  isVisible.value = false
}

const showCursor = () => {
  isVisible.value = true
}

const checkHover = (e) => {
  const target = e.target
  if (
    target.tagName.toLowerCase() === 'a' ||
    target.tagName.toLowerCase() === 'button' ||
    target.closest('a') ||
    target.closest('button') ||
    target.classList.contains('clickable')
  ) {
    isHovering.value = true
  } else {
    isHovering.value = false
  }
}

let animationFrameId
const animateTrail = () => {
  // LERP logic: move trail 20% of the way to the cursor position each frame
  const dx = cursorX.value - trailX.value
  const dy = cursorY.value - trailY.value
  
  trailX.value += dx * 0.2
  trailY.value += dy * 0.2
  
  animationFrameId = requestAnimationFrame(animateTrail)
}

onMounted(() => {
  // Initial position
  trailX.value = window.innerWidth / 2
  trailY.value = window.innerHeight / 2

  window.addEventListener('mousemove', (e) => {
    updateCursor(e)
    checkHover(e)
  })
  window.addEventListener('mouseenter', showCursor)
  window.addEventListener('mouseleave', hideCursor)
  
  animateTrail()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursor)
  window.removeEventListener('mouseenter', showCursor)
  window.removeEventListener('mouseleave', hideCursor)
  cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div class="custom-cursor-container">
    <!-- Main Dot -->
    <div 
      class="cursor-dot"
      :class="{ 'opacity-0': !isVisible }"
      :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"
    ></div>
    
    <!-- Trail Ring -->
    <div 
      class="cursor-trail"
      :class="{ 'hover-active': isHovering, 'opacity-0': !isVisible }"
      :style="{ left: `${trailX}px`, top: `${trailY}px` }"
    ></div>
  </div>
</template>

<style scoped>
.custom-cursor-container {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}

.cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background-color: #64ffda; /* Cyan accent color matching the theme likely */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
}

.cursor-trail {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(100, 255, 218, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
  pointer-events: none;
}

.cursor-trail.hover-active {
  width: 60px;
  height: 60px;
  background-color: rgba(100, 255, 218, 0.1);
  border-color: transparent;
  backdrop-filter: blur(2px);
}
</style>
