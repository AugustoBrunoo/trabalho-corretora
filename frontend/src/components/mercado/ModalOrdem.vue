<template>
    <div v-if="isOpen" class="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
            <div class="p-5 border-b border-slate-800 flex justify-between items-center border-l-4 bg-blue-900/20 border-l-blue-500">
                <div>
                    <h3 class="text-lg font-bold text-white flex items-center gap-2">Comprar {{ ordem.ticker }}</h3>
                    <p class="text-xs text-slate-400 mt-1">Preço Atual: <strong class="text-white">{{ formatarMoeda(ordem.precoAtual) }}</strong></p>
                </div>
                <button @click="$emit('fechar')" class="text-slate-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
            </div>
            <div class="p-6 space-y-4">
                <div>
                    <label class="block text-xs font-medium text-slate-300 mb-1.5">Tipo de Execução</label>
                    <select v-model="ordem.tipoExecucao" class="w-full input-fintech text-white px-4 py-3 rounded-lg focus:outline-none text-sm appearance-none cursor-pointer">
                        <option value="mercado">A Mercado (Preço Atual)</option>
                        <option value="condicional">Condicional (Agendada)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-medium text-slate-300 mb-1.5">Quantidade</label>
                    <input v-model="ordem.quantidade" type="number" min="1" class="w-full input-fintech text-white px-4 py-3 rounded-lg focus:outline-none text-sm">
                </div>
                <div v-if="ordem.tipoExecucao === 'condicional'">
                    <label class="block text-xs font-medium text-slate-300 mb-1.5">Preço Desejado (Gatilho)</label>
                    <div class="relative input-fintech rounded-lg flex items-center">
                        <span class="pl-4 text-slate-500 text-sm">R$</span>
                        <input v-model="ordem.precoReferencia" type="number" step="0.01" class="w-full bg-transparent border-none text-white px-2 py-3 focus:outline-none text-sm" placeholder="0.00">
                    </div>
                </div>
                <div v-else class="bg-[#151E2E] border border-slate-800 rounded-lg p-4 flex justify-between items-center text-sm">
                    <span class="text-slate-400">Total Estimado:</span>
                    <span class="text-white font-bold">{{ formatarMoeda(ordem.quantidade * ordem.precoAtual) }}</span>
                </div>
                <button @click="$emit('enviar')" :disabled="isEnviando" class="w-full py-3.5 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 bg-blue-600 hover:bg-blue-500 text-white">
                    <svg v-if="isEnviando" class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Confirmar Compra</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['isOpen', 'ordem', 'isEnviando', 'formatarMoeda'])
defineEmits(['fechar', 'enviar'])
</script>

<style scoped>
.input-fintech { background: #0B0F19; border: 1px solid #1F2937; }
.input-fintech:focus-within { border-color: #EAB308; box-shadow: 0 0 0 1px #EAB308; }
.animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
@keyframes fadeInUp { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
</style>