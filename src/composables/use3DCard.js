import { ref, onMounted, onUnmounted } from 'vue'

export function use3DCard() {
    const cardRef = ref(null)
    const rotation = ref({ x: 0, y: 0 })
    const isHovering = ref(false)

    const handleMouseMove = (e) => {
        if (!cardRef.value) return

        const card = cardRef.value
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * -15
        const rotateY = ((x - centerX) / centerX) * 15

        rotation.value = { x: rotateX, y: rotateY }
    }

    const handleMouseEnter = () => {
        isHovering.value = true
    }

    const handleMouseLeave = () => {
        isHovering.value = false
        rotation.value = { x: 0, y: 0 }
    }

    const cardStyle = () => {
        if (!isHovering.value) {
            return {
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
                transition: 'transform 0.5s ease-out'
            }
        }

        return {
            transform: `perspective(1000px) rotateX(${rotation.value.x}deg) rotateY(${rotation.value.y}deg) translateZ(20px)`,
            transition: 'transform 0.1s ease-out'
        }
    }

    return {
        cardRef,
        cardStyle,
        handleMouseMove,
        handleMouseEnter,
        handleMouseLeave
    }
}
