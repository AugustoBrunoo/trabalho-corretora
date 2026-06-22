<template>
    <div>
        <div @click="$emit('close')"
            :class="['fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] transition-opacity duration-300', isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']">
        </div>
        <div
            :class="['fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0F172A] border-l border-slate-700 shadow-2xl z-[60] transform transition-transform duration-300 flex flex-col', isOpen ? 'translate-x-0' : 'translate-x-full']">
            <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-[#151E2E]">
                <h3 class="text-lg font-bold text-white flex items-center gap-2">
                    <i data-lucide="history" class="w-5 h-5 text-prime-500"></i> Ordens
                </h3>
                <button @click="$emit('close')"
                    class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
            <div class="flex border-b border-slate-800">
                <button @click="abaInterna = 'pendentes'"
                    :class="['flex-1 py-3 text-sm font-bold transition-all', abaInterna === 'pendentes' ? 'text-prime-500 border-b-2 border-prime-500 bg-slate-800/30' : 'text-slate-400']">Pendentes</button>
                <button @click="abaInterna = 'historico'"
                    :class="['flex-1 py-3 text-sm font-bold transition-all', abaInterna === 'historico' ? 'text-prime-500 border-b-2 border-prime-500 bg-slate-800/30' : 'text-slate-400']">Histórico</button>
            </div>

            <div class="flex-grow overflow-y-auto p-4 space-y-3 no-scrollbar">
                <div v-if="ordensFiltradas.length === 0" class="text-center py-10">
                    <i data-lucide="inbox" class="w-8 h-8 text-slate-600 mx-auto mb-2"></i>
                    <p class="text-sm text-slate-500">Nenhuma ordem encontrada aqui.</p>
                </div>

                <div v-for="ordem in ordensFiltradas" :key="ordem._id" class="bg-[#151E2E] border border-slate-700/60 rounded-lg p-3 shadow-sm">
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="flex items-center gap-2 mb-1">
                                <span class="font-bold text-white text-sm">{{ ordem.ticker }}</span>
                                <span :class="['text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase', ordem.tipoOrdem === 'compra' ? 'text-blue-400 border-blue-500/20' : 'text-purple-400 border-purple-500/20']">
                                    {{ ordem.tipoOrdem }}
                                </span>
                            </div>
                            <p class="text-[10px] text-slate-400">Min. Registro: {{ ordem.minutoRegistro }}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-white text-sm">{{ ordem.quantidade }} UN</p>
                            <p class="text-[10px] text-slate-400">
                                {{ ordem.tipoExecucao === 'mercado' ? 'A Mercado' : `R$ ${parseFloat(ordem.precoReferencia || 0).toFixed(2)}` }}
                            </p>
                        </div>
                    </div>

                    <div v-if="abaInterna === 'pendentes' || ordem.status === 'pendente'" class="mt-3 pt-3 border-t border-slate-700/60 flex justify-between items-center">
                        <span class="text-[10px] uppercase text-amber-500 font-bold">Aguardando Gatilho</span>
                        <button @click="$emit('cancelar-ordem', ordem._id)" class="text-xs text-red-400 hover:text-red-300 font-medium">Cancelar</button>
                    </div>
                    <div v-else class="mt-3 pt-3 border-t border-slate-700/60">
                        <span :class="['text-[10px] uppercase font-bold', ordem.status === 'executada' ? 'text-emerald-500' : 'text-slate-500']">
                            {{ ordem.status === 'executada' ? `Executada no min ${ordem.minutoExecucao}` : 'Cancelada' }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onUpdated, nextTick } from 'vue'

const props = defineProps({
    isOpen: Boolean,
    ordensPendentes: Array,
    ordensHistorico: Array
})
defineEmits(['close', 'cancelar-ordem'])

const abaInterna = ref('pendentes')

const ordensFiltradas = computed(() => {
    const listaAtual = abaInterna.value === 'pendentes' ? props.ordensPendentes : props.ordensHistorico
    return listaAtual.filter(ordem => ordem && typeof ordem === 'object' && ordem.ticker)
})

// Força remontagem de ícones locais quando o painel ou as abas mudam
onUpdated(() => {
    nextTick(() => window.lucide?.createIcons())
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>