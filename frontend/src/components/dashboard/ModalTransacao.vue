<template>
    <div v-if="isOpen" class="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div :class="['p-5 border-b border-slate-800 flex justify-between items-center', transacao.tipo === 'deposito' ? 'bg-emerald-900/20 border-l-4 border-l-emerald-500' : 'bg-slate-800/50 border-l-4 border-l-slate-400']">
                <h3 class="text-lg font-bold text-white">
                    {{ transacao.tipo === 'deposito' ? 'Fazer Depósito' : 'Fazer Retirada' }}
                </h3>
                <button @click="$emit('fechar')" class="text-slate-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="p-6">
                <form @submit.prevent="$emit('enviar')" class="space-y-4">
                    <div>
                        <label class="block text-xs font-medium text-slate-300 mb-1.5">Valor (R$)</label>
                        <div class="relative input-fintech rounded-lg flex items-center">
                            <span class="pl-4 text-slate-500 text-sm">R$</span>
                            <input v-model="transacao.valor" type="number" min="0.01" step="0.01" required class="w-full bg-transparent text-white px-3 py-3.5 focus:outline-none text-sm font-medium">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-300 mb-1.5">Descrição</label>
                        <input v-model="transacao.descricao" type="text" required class="w-full input-fintech text-white px-4 py-3.5 rounded-lg focus:outline-none text-sm" placeholder="Ex: Aporte..." maxlength="100">
                    </div>
                    <button type="submit" :disabled="isProcessando" :class="['w-full py-3.5 rounded-xl font-bold text-white transition-colors', transacao.tipo === 'deposito' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-slate-700 hover:bg-slate-600']">
                        {{ isProcessando ? 'Processando...' : 'Confirmar' }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({ isOpen: Boolean, transacao: Object, isProcessando: Boolean })
defineEmits(['fechar', 'enviar'])
</script>