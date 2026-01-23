import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollReveal(threshold = 0.1) {
    const elementRef = ref(null)
    const isVisible = ref(false)

    let observer = null

    onMounted(() => {
        if (!elementRef.value) return

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        isVisible.value = true
                    }
                })
            },
            {
                threshold,
                rootMargin: '0px 0px -100px 0px'
            }
        )

        observer.observe(elementRef.value)
    })

    onUnmounted(() => {
        if (observer && elementRef.value) {
            observer.unobserve(elementRef.value)
        }
    })

    return {
        elementRef,
        isVisible
    }
}
