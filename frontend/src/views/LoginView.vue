<template>
    <div class="bg-slate-950 text-slate-300 font-sans antialiased selection:bg-prime-500 selection:text-slate-900 min-h-screen flex flex-col relative overflow-hidden">

        <div class="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-prime-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <nav class="absolute w-full z-50 transition-all duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-24">
                    <router-link to="/" class="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
                        <div class="w-9 h-9 rounded-lg bg-prime-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-prime-500/20 group-hover:scale-105 transition-transform">
                            P
                        </div>
                        <span class="font-bold text-2xl tracking-tight text-white">Prime<span class="text-prime-500 font-medium">Invest</span></span>
                    </router-link>

                    <router-link to="/" class="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                        <i data-lucide="arrow-left" class="w-4 h-4"></i>
                        Voltar ao início
                    </router-link>
                </div>
            </div>
        </nav>

        <main class="flex-grow flex items-center justify-center px-4 relative z-10 py-24">
            <div class="w-full max-w-md">

                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold text-white mb-2 tracking-tight">Bem-vindo de volta</h1>
                    <p class="text-slate-400 text-sm">Acesse sua conta para continuar investindo.</p>
                </div>

                <LoginForm />

                <p class="mt-8 text-center text-sm text-slate-400">
                    Ainda não tem uma conta?
                    <router-link to="/registro" class="font-semibold text-prime-500 hover:text-prime-400 transition-colors">Abra sua conta grátis</router-link>
                </p>

            </div>
        </main>

        <footer class="py-6 text-center text-xs text-slate-600 relative z-10">
            <p>&copy; 2026 PrimeInvest. Ambiente seguro e criptografado.</p>
        </footer>

    </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
// Se o LoginForm não estiver na mesma pasta, ajuste este caminho:
import LoginForm from '../components/login/LoginForm.vue' 

const renderIcons = () => {
    if (window.lucide) {
        window.lucide.createIcons()
    }
}

onMounted(() => {
    nextTick(() => { renderIcons() })
})
</script>