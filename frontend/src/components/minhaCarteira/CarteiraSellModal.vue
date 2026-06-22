<template>
    <div v-if="isOpen" class="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
            <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-purple-900/20 border-l-4 border-l-purple-500">
                <div>
                    <h3 class="text-lg font-bold text-white flex items-center gap-2">
                        <i data-lucide="tag" class="w-5 h-5 text-purple-400"></i> Vender {{ ativo?.ticker }}
                    </h3>
                    <p class="text-xs text-slate-400 mt-1">Preço Atual: <strong class="text-white">{{ formatarMoeda(ativo?.precoAtual) }}</strong></p>
                </div>
                <button @click="$emit('close')" class="text-slate-400 hover:text-white transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            <div class="p-6 space-y-4">
                <div class="bg-[#151E2E] border border-slate-800 rounded-lg p-3 flex justify-between items-center">
                    <span class="text-xs text-slate-400">Em Carteira:</span>
                    <span class="text-sm font-bold text-white">{{ ativo?.quantidade }} ações</span>
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Tipo de Execução</label>
                    <select v-model="form.tipoExecucao"
                        class="w-full input-fintech text-white px-4 py-3 rounded-lg focus:outline-none text-sm appearance-none cursor-pointer">
                        <option value="mercado">A Mercado (Preço Atual)</option>
                        <option value="condicional">Condicional (Agendada)</option>
                    </select>
                </div>
                <div>
                    <div class="flex justify-between items-center mb-1.5">
                        <label class="block text-[10px] font-bold text-slate-500 uppercase">Quantidade</label>
                        <button @click="form.quantidade = ativo?.quantidade"
                            class="text-[10px] font-bold text-purple-400 hover:text-purple-300 uppercase">Vender Tudo</button>
                    </div>
                    <input v-model="form.quantidade" type="number" class="w-full input-fintech text-white px-4 py-3 rounded-lg focus:outline-none text-sm">
                </div>
                <div v-if="form.tipoExecucao === 'condicional'">
                    <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Preço Gatilho (Vender se atingir)</label>
                    <div class="relative input-fintech rounded-lg flex items-center">
                        <span class="pl-4 text-slate-500 text-sm">R$</span>
                        <input v-model="form.precoReferencia" type="number" step="0.01"
                            class="w-full bg-transparent border-none text-white px-2 py-3 focus:outline-none text-sm">
                    </div>
                </div>
                <div v-else class="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-slate-400">Retorno Estimado:</span>
                        <span class="text-emerald-400 font-bold">{{ formatarMoeda(form.quantidade * (ativo?.precoAtual || 0)) }}</span>
                    </div>
                </div>
                <button @click="submeter" :disabled="isEnviandoVenda"
                    class="w-full py-3.5 rounded-xl font-bold transition-colors shadow-lg bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2">
                    <i v-if="isEnviandoVenda" data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
                    Confirmar Venda
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch, onUpdated, nextTick } from 'vue'

const props = defineProps({
    isOpen: Boolean,
    ativo: Object,
    isEnviandoVenda: Boolean
})
const emit = defineEmits(['close', 'confirmar'])

const form = reactive({
    quantidade: 0,
    tipoExecucao: 'mercado',
    precoReferencia: ''
})

// Reinicia o formulário interno com as métricas do ativo selecionado
watch(() => props.ativo, (newAtivo) => {
    if (newAtivo) {
        form.quantidade = newAtivo.quantidade
        form.tipoExecucao = 'mercado'
        form.precoReferencia = ''
    }
}, { immediate: true })

const submeter = () => {
    emit('confirmar', { ...form })
}

const formatarMoeda = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)

onUpdated(() => {
    nextTick(() => window.lucide?.createIcons())
})
</script>

<style scoped>
.input-fintech {
    background: #0B0F19;
    border: 1px solid #1F2937;
    transition: all 0.2s ease;
}
.input-fintech:focus-within {
    border-color: #EAB308;
    box-shadow: 0 0 0 1px #EAB308;
}
.animate-fade-in-up {
    animation: fadeInUp 0.4s ease-out forwards;
}
@keyframes fadeInUp {
    0% { transform: translateY(10px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
}
</style>