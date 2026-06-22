<template>
  <div class="extrato-item p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div class="flex items-start sm:items-center gap-4">
      <div :class="['w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0',
        transacao.tipo === 'deposito' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20']">
        <i :data-lucide="transacao.tipo === 'deposito' ? 'arrow-down-left' : 'arrow-up-right'" class="w-5 h-5"></i>
      </div>
      <div>
        <p class="font-semibold text-white text-sm sm:text-base leading-tight mb-1">{{ transacao.descricao }}</p>
        <div class="flex items-center gap-3 text-xs font-medium text-slate-500">
          <span class="bg-[#0B0F19] px-2 py-0.5 rounded border border-slate-800">Minuto Simulado: {{ transacao.minutoSimulacao }}</span>
          <span>{{ formatarData(transacao.createdAt) }}</span>
        </div>
      </div>
    </div>
    <div class="text-left sm:text-right mt-2 sm:mt-0 ml-14 sm:ml-0">
      <p :class="['font-bold text-lg mb-0.5', transacao.tipo === 'deposito' ? 'text-emerald-400' : 'text-red-400']">
        {{ transacao.tipo === 'deposito' ? '+' : '-' }} {{ formatarMoeda(transacao.valor) }}
      </p>
      <p class="text-xs font-medium text-slate-500">Saldo final: <span class="text-slate-400">{{ formatarMoeda(transacao.saldoResultante) }}</span></p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, nextTick } from 'vue'

defineProps({
  transacao: {
    type: Object,
    required: true
  }
})

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0)
}

const formatarData = (dataIsoString) => {
  const data = new Date(dataIsoString)
  return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')} ${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}`
}

const updateIcons = () => {
  nextTick(() => { if (window.lucide) window.lucide.createIcons() })
}

onMounted(updateIcons)
onUpdated(updateIcons)
</script>

<style scoped>
.extrato-item {
  transition: all 0.2s ease;
}
.extrato-item:hover {
  background: rgba(30, 41, 59, 0.5);
}
</style>