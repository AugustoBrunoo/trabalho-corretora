<template>
  <div class="fixed bottom-6 right-6 z-[70] flex flex-col gap-3 pointer-events-none">
    <transition-group name="toast-anim">
      <div v-for="toast in toasts" :key="toast.id" :class="['flex items-center gap-3 bg-[#0F172A] border p-4 rounded-xl shadow-xl pointer-events-auto min-w-[250px]',
        toast.tipo === 'erro' ? 'border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]' :
        toast.tipo === 'info' ? 'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]' :
        'border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]']">
        
        <i v-if="toast.tipo === 'erro'" data-lucide="x-circle" class="w-5 h-5 text-red-500 flex-shrink-0"></i>
        <i v-else-if="toast.tipo === 'info'" data-lucide="info" class="w-5 h-5 text-blue-500 flex-shrink-0"></i>
        <i v-else data-lucide="check-circle" class="w-5 h-5 text-emerald-500 flex-shrink-0"></i>
        
        <p class="text-sm font-medium text-white pr-2 flex-grow">{{ toast.mensagem }}</p>
        
        <button 
          @click="emit('close-toast', toast.id)" 
          class="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 flex items-center justify-center focus:outline-none flex-shrink-0"
          title="Fechar"
        >
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, nextTick } from 'vue'

defineProps({
  toasts: { type: Array, required: true }
})

// Define o evento para comunicar a remoção ao componente pai
const emit = defineEmits(['close-toast'])

const updateIcons = () => {
  nextTick(() => { if (window.lucide) window.lucide.createIcons() })
}

onMounted(updateIcons)
onUpdated(updateIcons)
</script>

<style scoped>
.toast-anim-enter-active, .toast-anim-leave-active { transition: all 0.3s ease; }
.toast-anim-enter-from { opacity: 0; transform: translateX(100%); }
.toast-anim-leave-to { opacity: 0; transform: translateY(10px); }
</style>