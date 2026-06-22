<template>
  <nav :class="['fixed w-full z-50 glass-header transition-all duration-300', { 'border-b border-slate-800': isScrolled }]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <router-link to="/" class="flex-shrink-0 flex items-center gap-3 cursor-pointer">
          <div class="w-9 h-9 rounded-lg bg-prime-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-prime-500/20">
            P
          </div>
          <span class="font-bold text-2xl tracking-tight text-white">Prime<span class="text-prime-500 font-medium">Invest</span></span>
        </router-link>

        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Voltar ao Início</router-link>
          <router-link to="/equipe" class="text-sm font-semibold text-prime-500 transition-colors border-b-2 border-prime-500 py-1">Equipe</router-link>

          <div class="flex items-center space-x-5 ml-4 border-l border-slate-800 pl-6">
            <router-link to="/login" class="text-sm font-medium text-slate-300 hover:text-white transition-colors">Acessar Conta</router-link>
            <router-link to="/registro" class="text-sm font-semibold bg-white hover:bg-slate-200 text-slate-900 px-5 py-2.5 rounded-md transition-all">Abrir Conta</router-link>
          </div>
        </div>

        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" class="text-slate-400 hover:text-white focus:outline-none">
            <MenuIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Mobile -->
    <div v-show="isMenuOpen" class="md:hidden bg-slate-900 border-b border-slate-800 absolute w-full z-40">
      <div class="px-4 pt-2 pb-6 space-y-2">
        <router-link to="/" @click="isMenuOpen = false" class="block py-3 text-base font-medium text-slate-300 border-b border-slate-800">Voltar ao Início</router-link>
        <router-link to="/equipe" @click="isMenuOpen = false" class="block py-3 text-base font-bold text-prime-500 border-b border-slate-800">Equipe</router-link>
        <router-link to="/login" @click="isMenuOpen = false" class="block py-3 text-base font-medium text-slate-300 border-b border-slate-800">Acessar Conta</router-link>
        <router-link to="/registro" @click="isMenuOpen = false" class="block py-3 mt-4 text-center rounded-md text-base font-bold bg-white text-slate-900">Abrir Conta</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu as MenuIcon } from '@lucide/vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.glass-header {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
</style>