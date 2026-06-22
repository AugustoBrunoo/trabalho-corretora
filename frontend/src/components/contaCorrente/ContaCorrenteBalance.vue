<template>
  <div class="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
    <div class="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

    <div class="relative z-10">
      <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
        <i data-lucide="wallet" class="w-4 h-4 text-emerald-500"></i> Saldo Disponível
      </p>
      <div class="flex items-baseline gap-3">
        <h2 class="text-4xl sm:text-5xl font-bold text-white tracking-tight">{{ formatarMoeda(saldoAtual) }}</h2>
      </div>
    </div>

    <div class="relative z-10 flex flex-row gap-3">
      <button @click="$emit('action', 'deposito')"
        class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold text-white transition-colors shadow-lg shadow-emerald-500/20">
        <i data-lucide="arrow-down-to-line" class="w-4 h-4"></i> Depositar
      </button>
      <button @click="$emit('action', 'retirada')"
        class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-sm font-bold text-white transition-colors shadow-lg">
        <i data-lucide="arrow-up-from-line" class="w-4 h-4 text-slate-300"></i> Retirar
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, nextTick } from 'vue'

defineProps({
  saldoAtual: {
    type: Number,
    required: true
  }
})

defineEmits(['action'])

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0)
}

const updateIcons = () => {
  nextTick(() => { if (window.lucide) window.lucide.createIcons() })
}

onMounted(updateIcons)
onUpdated(updateIcons)
</script>