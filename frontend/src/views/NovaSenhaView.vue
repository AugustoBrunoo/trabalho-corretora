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
                </div>
            </div>
        </nav>

        <main class="flex-grow flex items-center justify-center px-4 relative z-10 py-24">
            <div class="w-full max-w-md">

                <div v-if="!isUrlValid"
                    class="text-center bg-[#0F172A]/90 backdrop-blur-md border border-red-500/30 rounded-2xl p-8 shadow-2xl">
                    <div
                        class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                        <i data-lucide="shield-alert" class="w-8 h-8 text-red-500"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-white mb-2">Link Inválido</h2>
                    <p class="text-slate-400 text-sm mb-6">Este link de recuperação está incompleto, incorreto ou faltam
                        parâmetros obrigatórios na URL.</p>
                    <router-link to="/recuperar-senha"
                        class="inline-block w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                        Solicitar novo link
                    </router-link>
                </div>

                <transition v-else name="fade-slide" mode="out-in">

                    <div v-if="!isSuccess" key="form">
                        <div class="text-center mb-8">
                            <h1 class="text-3xl font-bold text-white mb-2 tracking-tight">Criar Nova Senha</h1>
                            <p class="text-slate-400 text-sm px-4">
                                Acesso autorizado para: <br>
                                <strong class="text-prime-400">{{ urlEmail }}</strong>
                            </p>
                        </div>

                        <div
                            class="bg-[#0F172A]/90 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">

                            <div v-if="errorMessage"
                                class="mb-5 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
                                <i data-lucide="alert-circle" class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"></i>
                                <p class="text-sm text-red-200">{{ errorMessage }}</p>
                            </div>

                            <form @submit.prevent="handleReset" class="space-y-5">

                                <div>
                                    <label for="password" class="block text-sm font-medium text-slate-300 mb-1.5">Nova
                                        Senha</label>
                                    <div class="relative input-fintech rounded-lg flex items-center">
                                        <div class="pl-4 text-slate-500">
                                            <i data-lucide="lock" class="w-5 h-5"></i>
                                        </div>
                                        <input v-model="senha" :type="showPassword ? 'text' : 'password'" id="password"
                                            class="w-full bg-transparent border-none text-white px-3 py-3.5 focus:outline-none placeholder-slate-600 text-sm"
                                            placeholder="••••••••" required>

                                        <button type="button" @click="showPassword = !showPassword"
                                            class="pr-4 text-slate-500 hover:text-slate-300 focus:outline-none">
                                            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20"
                                                height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                                <path
                                                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                                <path
                                                    d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                                <line x1="2" y1="2" x2="22" y2="22" />
                                            </svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path
                                                    d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div class="mt-3">
                                        <div class="flex justify-between items-center mb-1.5">
                                            <span class="text-xs text-slate-400 font-medium">Nível de segurança:</span>
                                            <span :class="['text-xs font-bold', passwordStrength.textColorClass]">{{
                                                passwordStrength.text }}</span>
                                        </div>
                                        <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div :class="['h-full transition-all duration-500 ease-out', passwordStrength.bgColorClass]"
                                                :style="{ width: passwordStrength.width }"></div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label for="password-confirm"
                                        class="block text-sm font-medium text-slate-300 mb-1.5">Confirmar Nova
                                        Senha</label>
                                    <div class="relative input-fintech rounded-lg flex items-center">
                                        <div class="pl-4 text-slate-500">
                                            <i data-lucide="lock-keyhole" class="w-5 h-5"></i>
                                        </div>
                                        <input v-model="senhaRepetida" :type="showPasswordConfirm ? 'text' : 'password'"
                                            id="password-confirm"
                                            class="w-full bg-transparent border-none text-white px-3 py-3.5 focus:outline-none placeholder-slate-600 text-sm"
                                            placeholder="••••••••" required>

                                        <button type="button" @click="showPasswordConfirm = !showPasswordConfirm"
                                            class="pr-4 text-slate-500 hover:text-slate-300 focus:outline-none">
                                            <svg v-if="showPasswordConfirm" xmlns="http://www.w3.org/2000/svg"
                                                width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                                <path
                                                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                                <path
                                                    d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                                <line x1="2" y1="2" x2="22" y2="22" />
                                            </svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path
                                                    d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div class="bg-[#0B0F19] rounded-lg p-4 border border-slate-800">
                                    <p class="text-xs text-slate-400 mb-2 font-medium">A senha deve conter:</p>
                                    <ul class="space-y-1.5 text-xs">
                                        <li
                                            :class="['flex items-center gap-2 transition-colors', isLengthValid ? 'text-emerald-500' : 'text-slate-500']">
                                            <svg v-if="isLengthValid" xmlns="http://www.w3.org/2000/svg" width="14"
                                                height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                            Mínimo de 8 caracteres
                                        </li>
                                        <li
                                            :class="['flex items-center gap-2 transition-colors', isLetterValid ? 'text-emerald-500' : 'text-slate-500']">
                                            <svg v-if="isLetterValid" xmlns="http://www.w3.org/2000/svg" width="14"
                                                height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                            Pelo menos uma letra
                                        </li>
                                        <li
                                            :class="['flex items-center gap-2 transition-colors', isNumberValid ? 'text-emerald-500' : 'text-slate-500']">
                                            <svg v-if="isNumberValid" xmlns="http://www.w3.org/2000/svg" width="14"
                                                height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                            Pelo menos um número
                                        </li>
                                        <li
                                            :class="['flex items-center gap-2 transition-colors', isMatchValid ? 'text-emerald-500' : 'text-slate-500']">
                                            <svg v-if="isMatchValid" xmlns="http://www.w3.org/2000/svg" width="14"
                                                height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                            As senhas devem ser iguais
                                        </li>
                                    </ul>
                                </div>

                                <button type="submit" :disabled="!isFormValid || isLoading"
                                    :class="['w-full font-semibold py-3.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-4',
                                        isFormValid && !isLoading ? 'bg-prime-500 hover:bg-prime-400 text-slate-900 shadow-lg shadow-prime-500/20' : 'bg-slate-700 text-slate-400 cursor-not-allowed']">
                                    <template v-if="isLoading">
                                        <i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i>
                                        <span>Salvando...</span>
                                    </template>
                                    <template v-else>
                                        <span>Redefinir Senha</span>
                                        <i data-lucide="check-circle" class="w-4 h-4"></i>
                                    </template>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div v-else key="success" class="text-center">
                        <div
                            class="bg-[#0F172A]/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)] p-8 sm:p-10">
                            <div
                                class="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                                <i data-lucide="shield-check" class="w-10 h-10 text-emerald-500"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-white mb-3">Senha Atualizada!</h2>
                            <p class="text-slate-400 text-sm mb-8 leading-relaxed">
                                Sua senha foi redefinida com sucesso. O token de segurança já foi invalidado. Você já
                                pode acessar a
                                plataforma com suas novas credenciais.
                            </p>

                            <router-link to="/login"
                                class="inline-block w-full bg-prime-500 hover:bg-prime-400 text-slate-900 font-semibold py-3.5 px-4 rounded-lg transition-colors shadow-lg shadow-prime-500/20">
                                Ir para o Login
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
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// 1. Extração de Parâmetros Reativos usando o Vue Router
const route = useRoute()
// O Vue extrai magicamente os parâmetros após o "?" na URL (ex: ?token=abc&email=teste)
const urlToken = route.query.token
const urlEmail = route.query.email

// Se não houver token ou email na URL, isUrlValid será falso e travará o formulário.
const isUrlValid = computed(() => !!urlToken && !!urlEmail)

// Estados do Formulário
const senha = ref('')
const senhaRepetida = ref('')
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const isLoading = ref(false)
const errorMessage = ref('')
const isSuccess = ref(false)

// 🔗 Conexão Oficial com o Node.js (Rota: router.post('/reset', authController.resetarSenha))
const API_URL = 'http://localhost:3000/api/auth/reset'

// Expressões Regulares Oficiais (Idênticas ao Backend)
const regexLetra = /.*[a-zA-Z].*/
const regexNumero = /.*[0-9].*/

// --- LÓGICA DE VALIDAÇÃO REATIVA ---
const isLengthValid = computed(() => senha.value.length >= 8)
const isLetterValid = computed(() => regexLetra.test(senha.value))
const isNumberValid = computed(() => regexNumero.test(senha.value))
const isMatchValid = computed(() => senha.value === senhaRepetida.value && senha.value !== '')

// Habilita o botão apenas quando tudo estiver perfeitamente verde
const isFormValid = computed(() => {
    return isLengthValid.value && isLetterValid.value && isNumberValid.value && isMatchValid.value
})

// Calcula a força da barra de progresso da senha
const passwordStrength = computed(() => {
    const pwd = senha.value
    if (!pwd) return { width: '0%', bgColorClass: '', textColorClass: '', text: '' }

    let score = 0
    if (pwd.length > 0) score += 10
    if (pwd.length >= 8) score += 20
    if (pwd.length >= 12) score += 10
    if (/[a-z]/.test(pwd)) score += 15
    if (/[A-Z]/.test(pwd)) score += 15
    if (/[0-9]/.test(pwd)) score += 15
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15

    if (score < 30) return { width: '20%', bgColorClass: 'bg-red-500', textColorClass: 'text-red-500', text: 'Muito Fraca' }
    if (score < 50) return { width: '40%', bgColorClass: 'bg-orange-500', textColorClass: 'text-orange-500', text: 'Fraca' }
    if (score < 70) return { width: '60%', bgColorClass: 'bg-yellow-400', textColorClass: 'text-yellow-400', text: 'Boa' }
    if (score < 90) return { width: '80%', bgColorClass: 'bg-lime-400', textColorClass: 'text-lime-400', text: 'Muito Boa' }

    return { width: '100%', bgColorClass: 'bg-emerald-500', textColorClass: 'text-emerald-500', text: 'Excelente' }
})

const renderIcons = () => {
    if (window.lucide) window.lucide.createIcons()
}

// ==========================================
// INTEGRAÇÃO COM O BACKEND NODE.JS
// ==========================================
const handleReset = async () => {
    errorMessage.value = ''
    isLoading.value = true

    try {
        // Envia o POST exigido pelo `authController.resetarSenha`
        // O controller pede: { token, email, senha, senhaRepetida }
        await axios.post(API_URL, {
            token: urlToken,
            email: urlEmail,
            senha: senha.value,
            senhaRepetida: senhaRepetida.value
        })

        // Sucesso 200: O backend encriptou a nova senha, limpou o 'tokenSenha' e salvou no banco.
        // Muda o template visual para a tela de Sucesso.
        isSuccess.value = true

        nextTick(() => { renderIcons() })

    } catch (error) {
        console.error("Erro ao resetar senha:", error)

        // Intercepta todas as validações cruciais feitas no authController.js:
        // - "Token de recuperação inválido ou já utilizado."
        // - "O token de troca de senha do usuário está vencido." (Se > 72h)
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message
        } else {
            errorMessage.value = "Erro interno do servidor ao tentar redefinir a senha."
        }

        nextTick(() => { renderIcons() })

    } finally {
        isLoading.value = false
    }
}

// Carrega os ícones iniciais (cadeados e afins)
onMounted(() => {
    nextTick(() => { renderIcons() })
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

/* Transições elegantes entre o form e as mensagens */
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