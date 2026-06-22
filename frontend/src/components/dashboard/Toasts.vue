<template>
    <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <transition-group name="toast-anim">
            <div v-for="toast in toasts" :key="toast.id" :class="['flex items-center gap-3 bg-[#0F172A] border p-4 rounded-xl shadow-xl pointer-events-auto', toast.tipo === 'erro' ? 'border-red-500/30' : toast.tipo === 'info' ? 'border-blue-500/30' : 'border-emerald-500/30']">
                <p class="text-sm font-medium text-white pr-4">{{ toast.mensagem }}</p>
            </div>
        </transition-group>
    </div>
</template>

<script setup>
defineProps({ toasts: Array })
</script>