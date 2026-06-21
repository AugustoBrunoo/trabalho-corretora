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
                        <i data-lucide="arrow-left" class="w-4 h-4"></i>
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
                                <i data-lucide="key-round" class="w-8 h-8 text-prime-500"></i>
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
                                <i data-lucide="alert-circle" class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"></i>
                                <p class="text-sm text-red-200">{{ errorMessage }}</p>
                            </div>

                            <form @submit.prevent="handleRecuperacao" class="space-y-5">
                                <div>
                                    <label for="email" class="block text-sm font-medium text-slate-300 mb-1.5">Endereço
                                        de E-mail</label>
                                    <div class="relative input-fintech rounded-lg flex items-center">
                                        <div class="pl-4 text-slate-500">
                                            <i data-lucide="mail" class="w-5 h-5"></i>
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
                                        <i data-lucide="send" class="w-4 h-4"></i>
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
                                <i data-lucide="mail-check" class="w-10 h-10 text-emerald-500"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-white mb-3">E-mail Enviado!</h2>
                            <p class="text-slate-400 text-sm mb-8 leading-relaxed">
                                Acabamos de enviar um link de recuperação para <br>
                                <strong class="text-white font-medium">{{ email }}</strong><br>
                                Verifique sua caixa de entrada e a pasta de spam.
                            </p>

                            <div v-if="devUrl"
                                class="mb-8 p-4 bg-slate-900 rounded-lg border border-slate-700 text-left">
                                <p class="text-xs text-prime-500 font-bold mb-2 uppercase tracking-wider">Apenas para
                                    Teste Dev:</p>
                                <a :href="devUrl" target="_blank"
                                    class="text-sm text-blue-400 hover:text-blue-300 break-all underline">
                                    {{ devUrl }}
                                </a>
                            </div>

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
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

// Estados Reativos do Componente
const email = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const isSuccess = ref(false)
const devUrl = ref('') // Guarda a URL de recuperação que o Node.js envia

// 🔗 URL de Integração configurada no authRoutes.js
const API_URL = 'http://localhost:3000/api/auth/esqueci'

// Expressão Regular idêntica à do authController.js para evitar requisições nulas
const verificaEmailValido = (emailTest) => {
    if (!emailTest) return false
    return /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/.test(emailTest)
}

// ==========================================
// INTEGRAÇÃO COM O BACKEND NODE.JS
// ==========================================
const handleRecuperacao = async () => {
    // 1. Limpa erros antigos e verifica e-mail no frontend
    errorMessage.value = ''

    if (!verificaEmailValido(email.value.trim())) {
        errorMessage.value = "O e-mail digitado não está em um formato adequado."
        return
    }

    isLoading.value = true

    try {
        // 2. Faz o POST para o servidor enviando exatamente o objeto que o controller aguarda: { email: "..." }
        const response = await axios.post(API_URL, {
            email: email.value.trim()
        })

        // 3. Sucesso! O authController.js gera o token, salva no banco e retorna um objeto com 'urlAcessoFrontend'.
        // Capturamos essa URL para exibi-la na caixinha de testes de desenvolvedor.
        if (response.data && response.data.urlAcessoFrontend) {
            devUrl.value = response.data.urlAcessoFrontend
        }

        // 4. Troca o componente visual para a tela verde de sucesso
        isSuccess.value = true

        // Força a renderização dos novos ícones da tela de sucesso (ex: mail-check)
        nextTick(() => {
            if (window.lucide) window.lucide.createIcons()
        })

    } catch (error) {
        console.error("Erro na requisição de recuperação:", error)

        // 5. Tratamento de Erros. Se o usuário não existir, o backend manda o status 400
        // e a mensagem "Não foi encontrado um usuário com este e-mail."
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message
        } else {
            errorMessage.value = "Erro interno no servidor ao tentar recuperar a senha."
        }

        // Força a renderização do ícone de erro
        nextTick(() => {
            if (window.lucide) window.lucide.createIcons()
        })

    } finally {
        isLoading.value = false
    }
}

// Renderiza os ícones iniciais (envelope, seta de voltar) quando a tela carrega
onMounted(() => {
    nextTick(() => {
        if (window.lucide) window.lucide.createIcons()
    })
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

/* Transição suave entre o form e a tela de sucesso */
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