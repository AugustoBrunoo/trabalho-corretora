<template>
    <div>
        <div @click="$emit('fechar')" :class="['fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-300', isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']"></div>
        <aside :class="['fixed top-0 right-0 h-full w-full sm:w-[360px] bg-[#0F172A] border-l border-slate-700 shadow-2xl z-[60] transform transition-transform duration-300 flex flex-col', isOpen ? 'translate-x-0' : 'translate-x-full']">
            <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-[#151E2E]/30">
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-prime-500"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <span class="font-bold text-white">Avançar Relógio</span>
                </div>
                <button @click="$emit('fechar')" class="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
            </div>
            <div class="p-6 flex-1 overflow-y-auto">
                <p class="text-sm text-slate-400 mb-6">O mercado simulado encerra no minuto 59.</p>
                <div class="bg-[#151E2E] border border-slate-800 rounded-lg p-4 mb-6 flex justify-between items-center shadow-inner">
                    <span class="text-sm font-medium text-slate-400">Minuto Atual:</span>
                    <span class="text-2xl font-bold text-white font-mono">{{ minutoAtual }}</span>
                </div>
                <div class="mb-8">
                    <label class="block text-xs font-medium text-slate-300 mb-2">Minutos a avançar</label>
                    <div class="relative input-fintech rounded-lg flex items-center shadow-sm">
                        <div class="pl-4 text-slate-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><polygon points="13 19 22 12 13 5 13 19" /><polygon points="2 19 11 12 2 5 2 19" /></svg></div>
                        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" type="number" min="1" max="59" class="w-full bg-transparent border-none text-white px-3 py-3.5 focus:outline-none text-sm" placeholder="Ex: 5">
                    </div>
                </div>
                <button @click="$emit('processar')" :disabled="isAvancando" class="w-full py-3.5 rounded-lg bg-prime-500 text-slate-900 font-bold hover:bg-prime-400 transition-colors shadow-lg disabled:opacity-50 flex justify-center items-center gap-2">
                    <svg v-if="isAvancando" class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Avançar Tempo</span>
                </button>
            </div>
        </aside>
    </div>
</template>

<script setup>
defineProps(['isOpen', 'minutoAtual', 'modelValue', 'isAvancando'])
defineEmits(['fechar', 'processar', 'update:modelValue'])
</script>

<style scoped>
.input-fintech { background: #0B0F19; border: 1px solid #1F2937; }
.input-fintech:focus-within { border-color: #EAB308; box-shadow: 0 0 0 1px #EAB308; }
</style>