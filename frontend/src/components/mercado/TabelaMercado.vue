<template>
    <div class="flex-grow flex flex-col bg-[#0F172A] border border-slate-800 rounded-xl shadow-xl overflow-hidden">
        <div class="p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#151E2E]">
            <div class="flex items-center gap-2">
                <div class="w-2 h-6 bg-prime-500 rounded-full"></div>
                <h2 class="text-lg font-bold text-white">Mercado de Ações</h2>
            </div>
           <button @click="$emit('abrir-pesquisa')" class="w-full sm:w-auto bg-prime-500 hover:bg-prime-400 text-slate-900 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-prime-500/20 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
             </svg> 
            Explorar Ativos
            </button>
        </div>
        <div class="overflow-x-auto flex-grow relative">
            <div v-if="isLoading" class="p-20 text-center text-slate-400">
                <svg class="animate-spin w-10 h-10 text-prime-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p>Sincronizando cotações...</p>
            </div>
            <table v-else-if="acoes.length > 0" class="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr class="bg-[#0B0F19] text-xs uppercase tracking-wider text-slate-500 border-b border-slate-800">
                        <th class="p-4 font-semibold">Ativo (Ticker)</th>
                        <th class="p-4 font-semibold text-right">Preço Atual</th>
                        <th class="p-4 font-semibold text-right">Variação (R$)</th>
                        <th class="p-4 font-semibold text-right">Variação (%)</th>
                        <th class="p-4 font-semibold text-center">Operar</th>
                        <th class="p-4 font-semibold text-center w-16">Ações</th>
                    </tr>
                </thead>
                <tbody class="text-sm divide-y divide-slate-800/50">
                    <tr v-for="acao in acoes" :key="acao.ticker" class="hover:bg-slate-800/30 transition-colors group">
                        <td class="p-4 font-bold text-white flex items-center gap-2">
                            <div :class="['w-2 h-2 rounded-full', parseFloat(acao.variacaoNominal) >= 0 ? 'bg-emerald-500' : 'bg-red-500']"></div>
                            {{ acao.ticker }}
                        </td>
                        <td :class="['p-4 text-right font-medium text-white', acao.animClass]">{{ formatarMoeda(acao.preco) }}</td>
                        <td :class="['p-4 text-right font-medium', parseFloat(acao.variacaoNominal) >= 0 ? 'text-emerald-400' : 'text-red-400', acao.animClass]">
                            <svg v-if="parseFloat(acao.variacaoNominal) >= 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 mr-1 inline"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 mr-1 inline"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></svg>
                            R$ {{ Math.abs(parseFloat(acao.variacaoNominal)).toFixed(2) }}
                        </td>
                        <td :class="['p-4 text-right font-bold', parseFloat(acao.variacaoPercentual) >= 0 ? 'text-emerald-400' : 'text-red-400', acao.animClass]">
                            {{ parseFloat(acao.variacaoPercentual) >= 0 ? '+' : '' }}{{ parseFloat(acao.variacaoPercentual).toFixed(2) }}%
                        </td>
                        <td class="p-4 text-center">
                            <div class="flex justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                <button @click="$emit('preparar-compra', acao)" class="px-5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded shadow transition-colors">COMPRAR</button>
                            </div>
                        </td>
                        <td class="p-4 text-center">
                            <button @click="$emit('remover-acao', acao.ticker)" class="text-slate-500 hover:text-red-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mx-auto"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div class="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-slate-500"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                </div>
                <h3 class="text-lg font-bold text-white mb-2">Painel Vazio</h3>
                <p class="text-slate-400 text-sm max-w-sm mb-4">Adicione ativos clicando no botão acima.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['isLoading', 'acoes', 'formatarMoeda'])
defineEmits(['abrir-pesquisa', 'preparar-compra', 'remover-acao'])
</script>

<style scoped>
.flash-up { animation: flashGreen 1s ease-out; }
.flash-down { animation: flashRed 1s ease-out; }
@keyframes flashGreen { 0% { background-color: rgba(16, 185, 129, 0.4); } 100% { background-color: transparent; } }
@keyframes flashRed { 0% { background-color: rgba(239, 68, 68, 0.4); } 100% { background-color: transparent; } }
</style>