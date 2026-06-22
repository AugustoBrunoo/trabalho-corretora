<template>
    <div class="flex-grow flex flex-col bg-[#0F172A] border border-slate-800 rounded-xl shadow-xl overflow-hidden">
        <div class="p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#151E2E]">
            <div class="flex items-center gap-2">
                <div class="w-2 h-6 bg-prime-500 rounded-full"></div>
                <h2 class="text-lg font-bold text-white">Posição da Carteira</h2>
            </div>
            <div class="flex gap-3 w-full sm:w-auto">
                <button @click="$emit('abrir-ordens')"
                    class="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                    <i data-lucide="history" class="w-4 h-4"></i> Ordens
                </button>
                <router-link to="/mercado"
                    class="flex-1 sm:flex-none bg-prime-500 hover:bg-prime-400 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-prime-500/20 text-sm">
                    <i data-lucide="shopping-cart" class="w-4 h-4"></i> Comprar Mais
                </router-link>
            </div>
        </div>

        <div class="overflow-x-auto flex-grow relative">
            <div v-if="isLoading" class="p-20 text-center">
                <i data-lucide="loader-2" class="w-10 h-10 animate-spin text-prime-500 mx-auto mb-4"></i>
                <p>Carregando sua carteira...</p>
            </div>

            <table v-else-if="ativos.length > 0" class="w-full text-left border-collapse min-w-[900px]">
                <thead>
                    <tr class="bg-[#0B0F19] text-xs uppercase tracking-wider text-slate-500 border-b border-slate-800">
                        <th class="p-4 font-semibold">Ativo</th>
                        <th class="p-4 font-semibold text-center">Quantidade</th>
                        <th class="p-4 font-semibold text-right">Preço Médio</th>
                        <th class="p-4 font-semibold text-right">Preço Atual</th>
                        <th class="p-4 font-semibold text-right">Valor Total</th>
                        <th class="p-4 font-semibold text-right">Resultado</th>
                        <th class="p-4 font-semibold text-center w-24">Ações</th>
                    </tr>
                </thead>
                <tbody class="text-sm divide-y divide-slate-800/50">
                    <tr v-for="ativo in ativos" :key="ativo.ticker" class="hover:bg-slate-800/30 transition-colors group">
                        <td class="p-4 font-bold text-white flex items-center gap-3">
                            <div class="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400 font-bold">
                                {{ ativo.ticker.substring(0, 2) }}
                            </div>
                            {{ ativo.ticker }}
                        </td>
                        <td class="p-4 text-center font-medium text-white">{{ ativo.quantidade }}</td>
                        <td class="p-4 text-right text-slate-400">{{ formatarMoeda(ativo.precoMedio) }}</td>
                        <td class="p-4 text-right font-medium text-white">{{ formatarMoeda(ativo.precoAtual) }}</td>
                        <td class="p-4 text-right font-medium text-white">{{ formatarMoeda(ativo.valorTotalAtual) }}</td>
                        <td :class="['p-4 text-right font-bold', parseFloat(ativo.resultado) >= 0 ? 'text-emerald-400' : 'text-red-400']">
                            <i :data-lucide="parseFloat(ativo.resultado) >= 0 ? 'arrow-up-right' : 'arrow-down-right'" class="w-3 h-3 inline mr-1"></i>
                            {{ formatarMoeda(Math.abs(ativo.resultado)) }}
                        </td>
                        <td class="p-4 text-center">
                            <button @click="$emit('vender-ativo', ativo)"
                                class="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded shadow transition-colors w-full">VENDER</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-else class="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div class="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-4">
                    <i data-lucide="briefcase" class="w-8 h-8 text-slate-500"></i>
                </div>
                <h3 class="text-lg font-bold text-white mb-2">Sua carteira está vazia</h3>
                <p class="text-slate-400 text-sm max-w-sm">Você ainda não possui ativos investidos.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    ativos: Array,
    isLoading: Boolean
})
defineEmits(['abrir-ordens', 'vender-ativo'])

const formatarMoeda = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)
</script>