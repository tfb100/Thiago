import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AppExecutive from './AppExecutive.vue'

const useExecutiveLayout = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('v') === 'exec'
}

const app = createApp(useExecutiveLayout() ? AppExecutive : App)
app.mount('#app')
