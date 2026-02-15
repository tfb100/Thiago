import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HeroSection from '../HeroSection.vue'

const mountOptions = {
  global: {
    stubs: {
      ParticleBackground: true, // evita canvas/getContext no jsdom
    },
  },
}

describe('HeroSection', () => {
  it('renders correctly', () => {
    const wrapper = mount(HeroSection, mountOptions)
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the main greeting text', () => {
    const wrapper = mount(HeroSection, mountOptions)
    expect(wrapper.text()).toContain('Olá, eu sou')
    expect(wrapper.text()).toContain('Thiago Barcelos')
  })

  it('renders the "Ver Experiência" button', () => {
    const wrapper = mount(HeroSection, mountOptions)
    const button = wrapper.find('a[href="#experiencia"]')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Ver Experiência')
  })

  it('renders the "Entrar em Contato" button', () => {
    const wrapper = mount(HeroSection, mountOptions)
    const button = wrapper.find('a[href="#contato"]')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Entrar em Contato')
  })
})
