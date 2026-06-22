<template>
  <div class="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
      <div :class="['p-5 border-b border-slate-800 flex justify-between items-center', tipo === 'deposito' ? 'bg-emerald-900/20 border-l-4 border-l-emerald-500' : 'bg-slate-800/50 border-l-4 border-l-slate-400']">
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <i :data-lucide="tipo === 'deposito' ? 'arrow-down-to-line' : 'arrow-up-from-line'"
            :class="tipo === 'deposito' ? 'text-emerald-400' : 'text-slate-300'" class="w-5 h-5"></i>
          {{ tipo === 'deposito' ? 'Fazer Depósito' : 'Fazer Retirada' }}
        </h3>
        <button @click="$emit('close')" class="text-slate-400 hover:text-white transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1.5">Valor (R$)</label>
            <div class="relative input-fintech rounded-lg flex items-center">
              <span class="pl-4 text-slate-500 text-sm">R$</span>
              <input v-model="form.valor" type="number" min="0.01" step="0.01" required
                class="w-full bg-transparent border-none text-white px-3 py-3.5 focus:outline-none text-sm font-medium"
                placeholder="0.00">
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1.5">Descrição da Movimentação</label>
            <input v-model="form.descricao" type="text" required
              class="w-full input-fintech text-white px-4 py-3.5 rounded-lg focus:outline-none text-sm"
              placeholder="Ex: Aporte inicial / Pagamento..." maxlength="100">
          </div>

          <div class="mt-6">
            <button type="submit" :disabled="isProcessando"
              :class="['w-full py-3.5 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
                tipo === 'deposito' ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white']">
              <i v-if="isProcessando" data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
              <i v-else data-lucide="check" class="w-4 h-4"></i>
              {{ isProcessando ? 'Processando...' : (tipo === 'deposito' ? 'Confirmar Depósito' : 'Confirmar Retirada') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onUpdated, nextTick } from 'vue'

const props = defineProps({
  tipo: { type: String, required: true },
  isProcessando: { type: Boolean, required: true }
})

const emit = defineEmits(['close', 'submit'])

const form = reactive({
  valor: '',
  descricao: ''
})

const handleSubmit = () => {
  emit('submit', { valor: form.valor, descricao: form.descricao })
}

const updateIcons = () => {
  nextTick(() => { if (window.lucide) window.lucide.createIcons() })
}

onMounted(updateIcons)
onUpdated(updateIcons)
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