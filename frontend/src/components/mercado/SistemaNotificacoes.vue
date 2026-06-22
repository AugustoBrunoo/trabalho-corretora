<template>
    <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <div v-for="toast in toasts" :key="toast.id" :class="['p-4 rounded-xl border shadow-2xl flex items-center gap-3 transition-all duration-300 animate-slide-in pointer-events-auto', toast.tipo === 'sucesso' ? 'bg-[#0F172A] border-emerald-500/30 text-emerald-400' : 'bg-[#0F172A] border-red-500/30 text-red-400']">
            <p class="text-sm font-medium">{{ toast.mensagem }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps(['toasts'])
</script>

<style scoped>
.animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
@keyframes slideIn { 0% { transform: translateX(100%); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
</style>