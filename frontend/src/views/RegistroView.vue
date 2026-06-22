<template>
    <div
        class="bg-slate-950 text-slate-300 font-sans antialiased selection:bg-prime-500 selection:text-slate-900 min-h-screen flex flex-col relative overflow-x-hidden">

        <div
            class="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-prime-500/5 blur-[120px] rounded-full pointer-events-none">
        </div>
        <div
            class="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none">
        </div>

        <nav class="absolute w-full z-50 transition-all duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-24">
                    <router-link to="/" class="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
                        <div
                            class="w-9 h-9 rounded-lg bg-prime-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-prime-500/20 group-hover:scale-105 transition-transform">
                            P
                        </div>
                        <span class="font-bold text-2xl tracking-tight text-white">Prime<span
                                class="text-prime-500 font-medium">Invest</span></span>
                    </router-link>

                    <router-link to="/login"
                        class="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                        <i data-lucide="arrow-left" class="w-4 h-4"></i>
                        Voltar ao login
                    </router-link>
                </div>
            </div>
        </nav>

        <main class="flex-grow flex justify-center px-4 relative z-10 pt-32 pb-16">
            <div class="w-full max-w-5xl my-auto relative">
                
                <RegistroForm />

            </div>
        </main>

        <footer class="py-6 text-center text-xs text-slate-600 relative z-10 w-full mt-auto">
            <p>&copy; 2026 PrimeInvest. Ambiente acadêmico seguro e criptografado.</p>
        </footer>
    </div>
</template>

<script setup>
// Ajuste este caminho consoante a pasta onde guardou o ficheiro acima
import RegistroForm from '../components/registro/RegistroForm.vue'
import { onMounted, nextTick } from 'vue'

onMounted(() => {
    nextTick(() => {
        if (window.lucide) window.lucide.createIcons()
    })
})
</script>