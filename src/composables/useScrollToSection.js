/**
 * Composable para scroll suave até uma seção pelo id.
 * Considera a altura da navbar fixa (offset).
 */
export function useScrollToSection(offset = 0) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return { scrollToSection }
}
