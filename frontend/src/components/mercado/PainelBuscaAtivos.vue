<template>
    <div>
        <div @click="$emit('fechar')" :class="['fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-300', isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']"></div>
        <aside :class="['fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0F172A] border-l border-slate-700 shadow-2xl z-[60] transform transition-transform duration-300 flex flex-col', isOpen ? 'translate-x-0' : 'translate-x-full']">
            <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-[#151E2E]/30">
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-prime-500">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span class="font-bold text-white">Explorar Ativos</span>
                </div>
                <button @click="$emit('fechar')" class="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
            </div>
            <div class="p-5 border-b border-slate-800">
                <div class="relative input-fintech rounded-lg flex items-center shadow-sm">
                    <div class="pl-4 text-slate-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg></div>
                    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" type="text" class="w-full bg-transparent border-none text-white px-3 py-3 focus:outline-none text-sm placeholder-slate-500 uppercase" placeholder="Buscar ação (Ex: PETR4)">
                </div>
            </div>
            <div class="flex-1 overflow-y-auto p-5 no-scrollbar">
                <div v-if="isLoading" class="text-center py-10">
                    <svg class="animate-spin w-6 h-6 text-prime-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p class="text-xs text-slate-500 mt-3">Buscando base de dados...</p>
                </div>
                <div v-else class="space-y-3">
                    <div v-for="acao in catalogo" :key="acao.ticker" class="bg-[#151E2E] border border-slate-700/60 rounded-lg p-3 flex justify-between items-center shadow-sm">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400 font-bold">{{ acao.ticker.substring(0, 2) }}</div>
                            <div>
                                <h4 class="font-bold text-white text-sm">{{ acao.ticker }}</h4>
                                <p class="text-[10px] text-slate-400">Ativo Disponível</p>
                            </div>
                        </div>
                        <button @click="$emit('salvar', acao.ticker)" class="px-3 py-1.5 bg-prime-500/10 hover:bg-prime-500/20 text-prime-400 border border-prime-500/30 rounded text-xs font-bold transition-colors">Adicionar</button>
                    </div>
                    <div v-if="catalogo.length === 0" class="text-center py-10 text-slate-500 text-sm">Nenhum ativo corresponde à busca.</div>
                </div>
            </div>
        </aside>
    </div>
</template>

<script setup>
defineProps(['isOpen', 'modelValue', 'isLoading', 'catalogo'])
defineEmits(['fechar', 'update:modelValue', 'salvar'])
</script>

<style scoped>
.input-fintech { background: #0B0F19; border: 1px solid #1F2937; }
.input-fintech:focus-within { border-color: #EAB308; box-shadow: 0 0 0 1px #EAB308; }
.no-scrollbar::-webkit-scrollbar { display: none; }
</style>