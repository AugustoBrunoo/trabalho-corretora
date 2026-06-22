<template>
  <div>
    <div @click="$emit('close')" 
      :class="['fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-300', isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']">
    </div>

    <aside :class="['fixed top-0 right-0 h-full w-full sm:w-[360px] bg-[#0F172A] border-l border-slate-700 shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out flex flex-col', isOpen ? 'translate-x-0' : 'translate-x-full']">
      <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-[#151E2E]/30">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded bg-prime-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm shadow-prime-500/20">P</div>
          <span class="font-bold text-white tracking-tight">Menu Principal</span>
        </div>
        <button @click="$emit('close')" class="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="p-6 border-b border-slate-800 bg-gradient-to-b from-[#151E2E]/50 to-transparent relative overflow-hidden">
        <div class="flex items-center gap-4 mb-5 relative z-10">
          <div class="w-14 h-14 rounded-full bg-[#0B0F19] border-2 border-prime-500/50 flex items-center justify-center text-slate-300 shadow-lg">
            <i data-lucide="user" class="w-6 h-6"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white leading-tight">{{ nomeUsuario }}</h3>
            <p class="text-xs text-prime-400 font-medium mt-0.5">Conta Prime</p>
          </div>
        </div>
        <div class="flex gap-3 relative z-10">
          <button class="flex-1 py-2.5 px-3 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 shadow-sm flex items-center justify-center gap-2">
            <i data-lucide="settings" class="w-4 h-4 text-slate-400"></i> Ajustes
          </button>
          <button @click="$emit('click-logout')" class="flex-1 py-2.5 px-3 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20 shadow-sm flex items-center justify-center gap-2">
            <i data-lucide="log-out" class="w-4 h-4"></i> Sair
          </button>
        </div>
      </div>

      <nav class="flex-1 overflow-y-auto p-5 space-y-2 no-scrollbar">
        <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Plataforma</p>
        <router-link to="/dashboard" @click="$emit('close')" class="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium transition-colors group border border-transparent hover:border-slate-700/50">
          <div class="flex items-center gap-3"><i data-lucide="layout-dashboard" class="w-5 h-5 text-slate-400"></i> Início</div>
          <i data-lucide="chevron-right" class="w-4 h-4 text-slate-600 group-hover:text-slate-400"></i>
        </router-link>
        <router-link to="/conta-corrente" @click="$emit('close')" class="flex items-center justify-between px-4 py-3.5 rounded-xl bg-prime-500/10 text-prime-400 border border-prime-500/20 font-semibold transition-colors group">
          <div class="flex items-center gap-3"><i data-lucide="file-text" class="w-5 h-5"></i> Conta Corrente</div>
          <div class="w-1.5 h-1.5 rounded-full bg-prime-500"></div>
        </router-link>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, nextTick } from 'vue'

defineProps({
  isOpen: { type: Boolean, required: true },
  nomeUsuario: { type: String, default: 'Usuário' }
})

defineEmits(['close', 'click-logout'])

const updateIcons = () => {
  nextTick(() => { if (window.lucide) window.lucide.createIcons() })
}

onMounted(updateIcons)
onUpdated(updateIcons)
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>