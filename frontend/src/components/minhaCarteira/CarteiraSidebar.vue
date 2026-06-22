<template>
    <div>
        <div @click="$emit('close')"
            :class="['fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-300', isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']">
        </div>
        <aside
            :class="['fixed top-0 right-0 h-full w-full sm:w-[360px] bg-[#0F172A] border-l border-slate-700 shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out flex flex-col', isOpen ? 'translate-x-0' : 'translate-x-full']">
            <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-[#151E2E]/30">
                <span class="font-bold text-white tracking-tight">Menu Principal</span>
                <button @click="$emit('close')"
                    class="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            <div class="p-6 border-b border-slate-800">
                <div class="flex items-center gap-4 mb-5">
                    <div class="w-12 h-12 rounded-full bg-[#0B0F19] border-2 border-prime-500/50 flex items-center justify-center">
                        <i data-lucide="user" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h3 class="text-sm font-bold text-white">{{ nomeUsuario }}</h3>
                        <p class="text-[10px] text-prime-400 font-medium uppercase">Conta Prime</p>
                    </div>
                </div>
                <button @click="$emit('logout')"
                    class="w-full py-2 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20 shadow-sm flex items-center justify-center gap-2">
                    <i data-lucide="log-out" class="w-4 h-4"></i> Sair da Conta
                </button>
            </div>
            <nav class="flex-1 p-5 space-y-2">
                <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50"><i data-lucide="layout-dashboard" class="w-5 h-5"></i> Início</router-link>
                <router-link to="/mercado" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50"><i data-lucide="line-chart" class="w-5 h-5"></i> Mercado</router-link>
                <router-link to="/carteira" class="flex items-center justify-between px-4 py-3 rounded-xl bg-prime-500/10 text-prime-400 border border-prime-500/20 font-semibold">
                    <div class="flex items-center gap-3"><i data-lucide="briefcase" class="w-5 h-5"></i> Minha Carteira</div>
                    <div class="w-1.5 h-1.5 rounded-full bg-prime-500"></div>
                </router-link>
                <router-link to="/conta-corrente" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50"><i data-lucide="file-text" class="w-5 h-5"></i> Conta Corrente</router-link>
            </nav>
        </aside>
    </div>
</template>

<script setup>
defineProps({
    isOpen: Boolean,
    nomeUsuario: String
})
defineEmits(['close', 'logout'])
</script>