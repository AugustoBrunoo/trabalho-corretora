<template>
    <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        <div v-for="toast in toasts" :key="toast.id"
            :class="['p-4 rounded-xl border shadow-2xl flex items-center gap-3 transition-all duration-300 animate-slide-in', toast.tipo === 'sucesso' ? 'bg-[#0F172A] border-emerald-500/30 text-emerald-400' : 'bg-[#0F172A] border-red-500/30 text-red-400']">
            <i :data-lucide="toast.tipo === 'sucesso' ? 'check-circle' : 'alert-circle'" class="w-5 h-5"></i>
            <p class="text-sm font-medium">{{ toast.mensagem }}</p>
        </div>
    </div>
</template>

<script setup>
import { onUpdated, nextTick } from 'vue'
defineProps({ toasts: Array })

onUpdated(() => {
    nextTick(() => window.lucide?.createIcons())
})
</script>