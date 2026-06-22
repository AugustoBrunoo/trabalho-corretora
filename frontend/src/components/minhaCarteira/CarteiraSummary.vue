<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-700 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-center">
            <div class="absolute -right-10 -top-10 w-32 h-32 bg-prime-500/5 rounded-full blur-2xl pointer-events-none"></div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5 relative z-10">
                <i data-lucide="landmark" class="w-4 h-4 text-prime-500"></i> Patrimônio Total
            </p>
            <h3 class="text-2xl font-bold text-white tracking-tight relative z-10">{{ formatarMoeda(patrimonioTotal) }}</h3>
            <p class="text-[10px] text-slate-500 mt-1 relative z-10 flex items-center gap-1">
                <i data-lucide="clock" class="w-3 h-3 text-prime-500"></i> Relógio: Min {{ minutoAtual }}
            </p>
        </div>

        <div class="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-center">
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <i data-lucide="layers" class="w-4 h-4 text-slate-500"></i> Investido (Custo)
            </p>
            <h3 class="text-xl font-bold text-white tracking-tight">{{ formatarMoeda(totalInvestidoCusto) }}</h3>
            <p class="text-[10px] text-slate-500 mt-1">Soma das ações em carteira</p>
        </div>

        <div :class="['border rounded-xl p-5 shadow-lg flex flex-col justify-center', lucroGlobal >= 0 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20']">
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <i data-lucide="trending-up" class="w-4 h-4 text-slate-500"></i> Lucro Aberto
            </p>
            <h3 :class="['text-xl font-bold tracking-tight', lucroGlobal >= 0 ? 'text-emerald-400' : 'text-red-400']">
                {{ lucroGlobal >= 0 ? '+' : '' }} {{ formatarMoeda(lucroGlobal) }}
            </h3>
            <p class="text-[10px] opacity-70 mt-1" :class="lucroGlobal >= 0 ? 'text-emerald-400' : 'text-red-400'">
                Variação exclusiva dos ativos atuais
            </p>
        </div>

        <div :class="['border rounded-xl p-5 shadow-lg flex flex-col justify-center relative overflow-hidden', resultadoHistorico >= 0 ? 'bg-emerald-900/20 border-emerald-500/40 shadow-emerald-500/10' : 'bg-red-900/20 border-red-500/40 shadow-red-500/10']">
            <p class="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5 relative z-10">
                <i data-lucide="bar-chart-2" class="w-4 h-4" :class="resultadoHistorico >= 0 ? 'text-emerald-400' : 'text-red-400'"></i> Desempenho Global
            </p>
            <h3 :class="['text-2xl font-bold tracking-tight relative z-10', resultadoHistorico >= 0 ? 'text-emerald-400' : 'text-red-400']">
                {{ resultadoHistorico >= 0 ? '+' : '' }} {{ formatarMoeda(resultadoHistorico) }}
            </h3>
            <p class="text-[10px] mt-1 font-medium relative z-10" :class="resultadoHistorico >= 0 ? 'text-emerald-500' : 'text-red-400'">
                Patrimônio Total vs. Aportes
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    patrimonioTotal: Number,
    minutoAtual: [Number, String],
    totalInvestidoCusto: Number,
    lucroGlobal: Number,
    resultadoHistorico: Number
})

const formatarMoeda = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)
</script>