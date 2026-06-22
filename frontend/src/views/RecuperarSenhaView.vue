<template>
    <div
        class="bg-slate-950 text-slate-300 font-sans antialiased selection:bg-prime-500 selection:text-slate-900 min-h-screen flex flex-col relative overflow-hidden">

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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                        Voltar para Login
                    </router-link>
                </div>
            </div>
        </nav>

        <main class="flex-grow flex items-center justify-center px-4 relative z-10 py-24">
            <div class="w-full max-w-md">

                <transition name="fade-slide" mode="out-in">

                    <div v-if="!isSuccess" key="form">
                        <div class="text-center mb-8">
                            <div
                                class="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-700/50">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="w-8 h-8 text-prime-500">
                                    <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                                </svg>
                            </div>
                            <h1 class="text-3xl font-bold text-white mb-2 tracking-tight">Recuperar Senha</h1>
                            <p class="text-slate-400 text-sm px-4">
                                Digite o e-mail associado à sua conta. Enviaremos as instruções para você criar uma nova
                                senha.
                            </p>
                        </div>

                        <div
                            class="bg-[#0F172A]/90 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">

                            <div v-if="errorMessage"
                                class="mb-5 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" x2="12" y1="8" y2="12" />
                                    <line x1="12" x2="12.01" y1="16" y2="16" />
                                </svg>
                                <p class="text-sm text-red-200">{{ errorMessage }}</p>
                            </div>

                            <form @submit.prevent="handleRecuperacao" class="space-y-5">
                                <div>
                                    <label for="email" class="block text-sm font-medium text-slate-300 mb-1.5">Endereço
                                        de E-mail</label>
                                    <div class="relative input-fintech rounded-lg flex items-center">
                                        <div class="pl-4 text-slate-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" class="w-5 h-5">
                                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                            </svg>
                                        </div>
                                        <input v-model="email" type="email" id="email"
                                            class="w-full bg-transparent border-none text-white px-3 py-3.5 focus:outline-none placeholder-slate-600 text-sm"
                                            placeholder="exemplo@email.com" required>
                                    </div>
                                </div>

                                <button type="submit" :disabled="isLoading || !email"
                                    class="w-full bg-prime-500 hover:bg-prime-400 disabled:opacity-70 disabled:cursor-not-allowed text-slate-900 font-semibold py-3.5 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-prime-500/20 flex items-center justify-center gap-2 mt-2">
                                    <template v-if="isLoading">
                                        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-slate-900"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                            </path>
                                        </svg>
                                        <span>Processando...</span>
                                    </template>
                                    <template v-else>
                                        <span>Enviar Instruções</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="w-4 h-4">
                                            <path d="m22 2-7 20-4-9-9-4Z" />
                                            <path d="M22 2 11 13" />
                                        </svg>
                                    </template>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div v-else key="success" class="text-center">
                        <div
                            class="bg-[#0F172A]/90 backdrop-blur-md border border-prime-500/30 rounded-2xl shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)] p-8 sm:p-10">
                            <div
                                class="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="w-10 h-10 text-emerald-500">
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    <path d="m16 19 2 2 4-4" />
                                </svg>
                            </div>
                            <h2 class="text-2xl font-bold text-white mb-3">E-mail Enviado!</h2>
                            <p class="text-slate-400 text-sm mb-8 leading-relaxed">
                                Acabamos de enviar um link de recuperação para <br>
                                <strong class="text-white font-medium">{{ email }}</strong><br>
                                Verifique sua caixa de entrada e a pasta de spam. O link expira em 1 hora.
                            </p>

                            <router-link to="/login"
                                class="inline-block w-full bg-transparent border border-slate-700 hover:bg-slate-800 text-white font-medium py-3.5 px-4 rounded-lg transition-colors">
                                Voltar para o Login
                            </router-link>
                        </div>
                    </div>

                </transition>

            </div>
        </main>

        <footer class="py-6 text-center text-xs text-slate-600 relative z-10">
            <p>&copy; 2026 PrimeInvest. Ambiente seguro e criptografado.</p>
        </footer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Estados Reativos do Componente
const email = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const isSuccess = ref(false)

// 🔗 URL de Integração configurada no authRoutes.js
const API_URL = 'http://localhost:3000/api/auth/esqueci'

const verificaEmailValido = (emailTest) => {
    if (!emailTest) return false
    return /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/.test(emailTest)
}

// ==========================================
// INTEGRAÇÃO COM O BACKEND NODE.JS
// ==========================================
const handleRecuperacao = async () => {
    errorMessage.value = ''

    if (!verificaEmailValido(email.value.trim())) {
        errorMessage.value = "O e-mail digitado não está em um formato adequado."
        return
    }

    isLoading.value = true

    try {
        await axios.post(API_URL, {
            email: email.value.trim()
        })

        // Apenas diz que foi sucesso. A URL não vem mais para cá, foi para o e-mail!
        isSuccess.value = true

    } catch (error) {
        console.error("Erro na requisição de recuperação:", error)

        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message
        } else {
            errorMessage.value = "Erro interno no servidor ao tentar recuperar a senha."
        }

    } finally {
        isLoading.value = false
    }
}
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

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.4s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: scale(0.95);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: scale(1.05);
}
</style>