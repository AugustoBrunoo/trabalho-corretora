<template>
    <div>
        <div v-if="acoes.length === 0" class="bg-[#0F172A] border border-slate-800 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center mt-6">
            <div class="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700">
                <i data-lucide="box-select" class="w-8 h-8 text-slate-500"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Sua carteira está vazia</h3>
            <p class="text-slate-400 text-sm max-w-md mb-6">Acesse o Home Broker e faça sua primeira operação.</p>
            <router-link to="/mercado" class="bg-prime-500 hover:bg-prime-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                <i data-lucide="line-chart" class="w-5 h-5"></i> Explorar o Mercado
            </router-link>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="acao in acoes" :key="acao.ticker" class="bg-[#0F172A] border border-slate-800 hover:border-slate-600 rounded-xl p-5 transition-colors">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-sm text-slate-300 font-bold">
                            {{ acao.ticker.substring(0, 2) }}
                        </div>
                        <div>
                            <h4 class="font-bold text-white text-lg leading-none mb-1">{{ acao.ticker }}</h4>
                            <p class="text-xs text-slate-400 leading-none">{{ acao.quantidade }} ações</p>
                        </div>
                    </div>
                    <span :class="parseFloat(acao.resultado) >= 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'" class="text-xs font-bold px-2 py-1 rounded border flex items-center gap-1">
                        {{ formatarMoeda(parseFloat(acao.resultado)) }}
                    </span>
                </div>
                <div class="pt-4 border-t border-slate-800/80 flex justify-between items-end">
                    <div>
                        <p class="text-xs text-slate-500 mb-0.5">Valor Total</p>
                        <p class="font-bold text-white">{{ formatarMoeda(parseFloat(acao.valorTotalAtual)) }}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-slate-500 mb-0.5">Preço Médio</p>
                        <p class="font-medium text-slate-300">{{ formatarMoeda(parseFloat(acao.precoMedio)) }}</p>
                    </div>
                </div>
            </div>
            <router-link to="/mercado" class="bg-[#0F172A] border border-slate-800 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center group hover:border-prime-500/50 transition-colors">
                <div class="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-3 group-hover:bg-prime-500/10">
                    <i data-lucide="plus" class="w-6 h-6 text-slate-500 group-hover:text-prime-500"></i>
                </div>
                <h4 class="font-medium text-slate-300 mb-1">Diversifique</h4>
            </router-link>
        </div>
    </div>
</template>

<script setup>
defineProps({ acoes: Array, formatarMoeda: Function })
</script>