<template>
  <nav class="glass-panel z-40 flex-shrink-0 sticky top-0">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded bg-prime-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-prime-500/20">P</div>
          <span class="font-bold text-xl tracking-tight text-white">Prime<span class="text-prime-500 font-medium">Invest</span></span>
        </div>
        <div class="flex items-center">
          <button @click="$emit('toggle-sidebar')" class="flex items-center gap-2 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors focus:outline-none">
            <span class="text-sm font-medium hidden sm:block">Menu</span>
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'

defineEmits(['toggle-sidebar'])

onMounted(() => {
  nextTick(() => { if (window.lucide) window.lucide.createIcons() })
})
</script>

<style scoped>
.glass-panel {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
</style>