import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importa a configuração que criamos acima
import './style.css' // Seu Tailwind CSS

const app = createApp(App)

app.use(router) // Ativa o Vue Router no projeto

app.mount('#app')