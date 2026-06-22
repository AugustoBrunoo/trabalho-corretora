<template>
  <div class="bg-[#0F172A] border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col flex-grow">
    <div class="p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#151E2E]">
      <div class="flex items-center gap-2">
        <div class="w-2 h-6 bg-slate-600 rounded-full"></div>
        <h3 class="text-lg font-bold text-white">Extrato de Movimentações</h3>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button @click="$emit('export-pdf')" :disabled="transacoes.length === 0"
          class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
          <i data-lucide="file-down" class="w-3.5 h-3.5 text-prime-500"></i> <span class="hidden sm:inline">Exportar PDF</span>
        </button>

        <div class="bg-[#0B0F19] border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2 flex-1 sm:flex-none justify-center">
          <i data-lucide="clock" class="w-3.5 h-3.5 text-prime-500"></i>
          <span class="text-xs text-slate-400 font-medium">Relógio: Min <span class="text-white">{{ minutoAtual }}</span></span>
        </div>
      </div>
    </div>

    <div class="flex-grow overflow-y-auto max-h-[600px] no-scrollbar">
      <div v-if="isLoading" class="p-16 text-center text-slate-500">
        <i data-lucide="loader-2" class="w-8 h-8 animate-spin mx-auto mb-3"></i>
        <p class="text-sm">Buscando transações...</p>
      </div>

      <div v-else-if="transacoes.length === 0" class="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div class="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-4">
          <i data-lucide="receipt" class="w-8 h-8 text-slate-500"></i>
        </div>
        <h3 class="text-lg font-bold text-white mb-2">Nenhuma movimentação</h3>
        <p class="text-slate-400 text-sm max-w-sm">Sua conta corrente ainda não possui depósitos, retiradas ou ordens executadas.</p>
      </div>

      <div v-else class="divide-y divide-slate-800/50">
        <ContaCorrenteStatementItem 
          v-for="t in transacoes" 
          :key="t._id" 
          :transacao="t" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, nextTick } from 'vue'
import ContaCorrenteStatementItem from './ContaCorrenteStatementItem.vue'

defineProps({
  transacoes: { type: Array, required: true },
  isLoading: { type: Boolean, required: true },
  minutoAtual: { type: Number, required: true }
})

defineEmits(['export-pdf'])

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