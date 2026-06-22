<template>
    <div
        class="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
        <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <div class="flex items-center gap-2 mb-2">
                    <div
                        class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <i data-lucide="wallet" class="w-4 h-4 text-emerald-500"></i>
                    </div>
                    <p class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Saldo da Conta</p>
                </div>
                <h2 class="text-4xl font-bold text-white tracking-tight mb-2">{{ formatarMoeda(saldo) }}</h2>
                <p class="text-xs text-slate-500">Disponível para novos investimentos</p>
            </div>
            <div class="md:border-l border-slate-700/60 md:pl-8">
                <div class="flex items-center gap-2 mb-2">
                    <div
                        class="w-8 h-8 rounded-lg bg-prime-500/10 border border-prime-500/20 flex items-center justify-center">
                        <i data-lucide="pie-chart" class="w-4 h-4 text-prime-500"></i>
                    </div>
                    <p class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Patrimônio Investido</p>
                </div>
                <h2 class="text-3xl font-bold text-white tracking-tight mb-2">{{ formatarMoeda(patrimonio) }}</h2>
                <div v-if="patrimonio > 0"
                    class="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 w-fit px-2 py-1 rounded border border-emerald-500/20">
                    <i data-lucide="trending-up" class="w-3 h-3"></i> Ativo no mercado
                </div>
                <div v-else
                    class="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-800 w-fit px-2 py-1 rounded border border-slate-700">
                    Nenhum valor investido ainda
                </div>
            </div>
        </div>
        <div class="relative z-10 mt-8 pt-6 border-t border-slate-700/60 flex flex-wrap gap-3">
            <button @click="abrirModalTransacao('deposito')"
                class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold text-white transition-colors shadow-lg shadow-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                    <path d="M12 17V3" />
                    <path d="m6 11 6 6 6-6" />
                    <path d="M19 21H5" />
                </svg>
                Depositar
            </button>
            <button @click="abrirModalTransacao('retirada')"
                class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-sm font-bold text-white transition-colors shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-slate-300">
                    <path d="m18 9-6-6-6 6" />
                    <path d="M12 3v14" />
                    <path d="M5 21h14" />
                </svg>
                Retirar
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({ saldo: Number, patrimonio: Number, formatarMoeda: Function })
defineEmits(['transacao'])
</script>