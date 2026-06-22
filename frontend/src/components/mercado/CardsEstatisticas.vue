<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex items-center justify-between shadow-lg">
            <div>
                <p class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Saldo Conta Corrente</p>
                <h3 class="text-2xl font-bold text-white tracking-tight">{{ formatarMoeda(saldo) }}</h3>
            </div>
            <div class="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-emerald-500"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            </div>
        </div>
        <div class="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex items-center justify-between shadow-lg">
            <div>
                <p class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Patrimônio em Ações</p>
                <h3 class="text-2xl font-bold text-white tracking-tight">{{ formatarMoeda(patrimonio) }}</h3>
            </div>
            <div class="w-12 h-12 rounded-full bg-prime-500/10 border border-prime-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-prime-500"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
            </div>
        </div>
        <div class="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-700 rounded-xl p-5 flex items-center justify-between shadow-lg relative overflow-hidden">
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div class="relative z-10">
                <p class="text-xs font-medium text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> Horário Mercado
                </p>
                <h3 class="text-2xl font-bold text-white tracking-tight font-mono">{{ relogio }}</h3>
            </div>
            <div class="flex gap-2 relative z-10">
                <button @click="$emit('avancar-minuto')" :disabled="isAguardando" class="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-white transition-colors shadow-sm disabled:opacity-50">
                    +1 min
                </button>
                <button @click="$emit('abrir-ajuste')" class="px-3 py-1.5 rounded bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-xs font-bold text-blue-400 transition-colors shadow-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></svg> Ajustar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['saldo', 'patrimonio', 'relogio', 'isAguardando', 'formatarMoeda'])
defineEmits(['avancar-minuto', 'abrir-ajuste'])
</script>