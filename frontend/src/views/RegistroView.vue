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

                    <router-link to="/"
                        class="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                        <i data-lucide="arrow-left" class="w-4 h-4"></i>
                        Voltar
                    </router-link>
                </div>
            </div>
        </nav>

        <main class="flex-grow flex justify-center px-4 relative z-10 pt-32 pb-16">

            <div class="w-full max-w-5xl my-auto relative">

                <transition name="fade-slide" mode="out-in">

                    <div v-if="!isSuccess" key="form">
                        <div
                            class="bg-[#0F172A]/90 backdrop-blur-md border border-slate-800 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">

                            <div class="p-8 sm:p-10 lg:w-3/5 relative">
                                <div class="mb-8 text-center lg:text-left">
                                    <h1 class="text-3xl font-bold text-white mb-2 tracking-tight">Crie sua conta</h1>
                                    <p class="text-slate-400 text-sm">
                                        Dê o primeiro passo no simulador de mercado com a chancela <strong
                                            class="text-purple-400 font-semibold">PrimeBank</strong>.
                                    </p>
                                </div>

                                <div v-if="errorMessage"
                                    class="mb-5 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
                                    <i data-lucide="alert-circle" class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"></i>
                                    <p class="text-sm text-red-200">{{ errorMessage }}</p>
                                </div>

                                <form @submit.prevent="handleRegister" class="space-y-4">

                                    <div>
                                        <label for="nome" class="block text-sm font-medium text-slate-300 mb-1.5">Nome
                                            Completo</label>
                                        <div class="relative input-fintech rounded-lg flex items-center">
                                            <div class="pl-4 text-slate-500">
                                                <i data-lucide="user" class="w-5 h-5"></i>
                                            </div>
                                            <input v-model="registerData.nome" type="text" id="nome"
                                                class="w-full bg-transparent border-none text-white px-3 py-3 focus:outline-none placeholder-slate-600 text-sm"
                                                placeholder="Ex: Carlos Henrique" required>
                                        </div>
                                    </div>

                                    <div>
                                        <label for="email"
                                            class="block text-sm font-medium text-slate-300 mb-1.5">E-mail</label>
                                        <div class="relative input-fintech rounded-lg flex items-center">
                                            <div class="pl-4 text-slate-500">
                                                <i data-lucide="mail" class="w-5 h-5"></i>
                                            </div>
                                            <input v-model="registerData.email" type="email" id="email"
                                                class="w-full bg-transparent border-none text-white px-3 py-3 focus:outline-none placeholder-slate-600 text-sm"
                                                placeholder="seu.email@exemplo.com" required>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label for="password"
                                                class="block text-sm font-medium text-slate-300 mb-1.5">Senha</label>
                                            <div class="relative input-fintech rounded-lg flex items-center">
                                                <div class="pl-4 text-slate-500">
                                                    <i data-lucide="lock" class="w-5 h-5"></i>
                                                </div>
                                                <input v-model="registerData.senha"
                                                    :type="showPassword ? 'text' : 'password'" id="password"
                                                    class="w-full bg-transparent border-none text-white px-3 py-3 focus:outline-none placeholder-slate-600 text-sm"
                                                    placeholder="••••••••" required>

                                                <button type="button" @click="showPassword = !showPassword"
                                                    class="pr-4 text-slate-500 hover:text-slate-300 focus:outline-none flex items-center">
                                                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg"
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
                                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20"
                                                        height="20" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <path
                                                            d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label for="password-confirm"
                                                class="block text-sm font-medium text-slate-300 mb-1.5">Confirmar
                                                Senha</label>
                                            <div class="relative input-fintech rounded-lg flex items-center">
                                                <div class="pl-4 text-slate-500">
                                                    <i data-lucide="lock-keyhole" class="w-5 h-5"></i>
                                                </div>
                                                <input v-model="registerData.senhaRepetida"
                                                    :type="showPasswordConfirm ? 'text' : 'password'"
                                                    id="password-confirm"
                                                    class="w-full bg-transparent border-none text-white px-3 py-3 focus:outline-none placeholder-slate-600 text-sm"
                                                    placeholder="••••••••" required>

                                                <button type="button"
                                                    @click="showPasswordConfirm = !showPasswordConfirm"
                                                    class="pr-4 text-slate-500 hover:text-slate-300 focus:outline-none flex items-center">
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
                                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20"
                                                        height="20" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <path
                                                            d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-2 mb-4">
                                        <div class="flex justify-between items-center mb-1.5">
                                            <span class="text-xs text-slate-400 font-medium">Nível da senha:</span>
                                            <span :class="['text-xs font-bold', passwordStrength.textColorClass]">{{
                                                passwordStrength.text }}</span>
                                        </div>
                                        <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div :class="['h-full transition-all duration-500 ease-out', passwordStrength.bgColorClass]"
                                                :style="{ width: passwordStrength.width }"></div>
                                        </div>
                                    </div>

                                    <div
                                        class="bg-[#0B0F19] rounded-lg p-3 border border-slate-800 flex flex-wrap gap-x-4 gap-y-2">
                                        <ul class="w-full flex flex-wrap text-[11px] font-medium justify-between">

                                            <li
                                                :class="['flex items-center gap-1.5 w-[48%] transition-colors', isLengthValid ? 'text-emerald-500' : 'text-slate-500']">
                                                <svg v-if="isLengthValid" xmlns="http://www.w3.org/2000/svg" width="12"
                                                    height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18" />
                                                    <line x1="6" y1="6" x2="18" y2="18" />
                                                </svg>
                                                8+ caracteres
                                            </li>

                                            <li
                                                :class="['flex items-center gap-1.5 w-[48%] transition-colors', isLetterValid ? 'text-emerald-500' : 'text-slate-500']">
                                                <svg v-if="isLetterValid" xmlns="http://www.w3.org/2000/svg" width="12"
                                                    height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18" />
                                                    <line x1="6" y1="6" x2="18" y2="18" />
                                                </svg>
                                                Uma letra
                                            </li>

                                            <li
                                                :class="['flex items-center gap-1.5 w-[48%] transition-colors', isNumberValid ? 'text-emerald-500' : 'text-slate-500']">
                                                <svg v-if="isNumberValid" xmlns="http://www.w3.org/2000/svg" width="12"
                                                    height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18" />
                                                    <line x1="6" y1="6" x2="18" y2="18" />
                                                </svg>
                                                Um número
                                            </li>

                                            <li
                                                :class="['flex items-center gap-1.5 w-[48%] transition-colors', isMatchValid ? 'text-emerald-500' : 'text-slate-500']">
                                                <svg v-if="isMatchValid" xmlns="http://www.w3.org/2000/svg" width="12"
                                                    height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18" />
                                                    <line x1="6" y1="6" x2="18" y2="18" />
                                                </svg>
                                                Senhas iguais
                                            </li>

                                        </ul>
                                    </div>

                                    <div class="flex items-start mt-4">
                                        <div class="flex items-center h-5">
                                            <input v-model="registerData.termos" id="termos" type="checkbox" required
                                                class="w-4 h-4 border border-slate-600 rounded bg-[#0B0F19] checked:bg-prime-500 checked:border-prime-500 focus:ring-prime-500/50 cursor-pointer accent-prime-500">
                                        </div>
                                        <label for="termos" class="ml-2 text-xs text-slate-400 leading-tight">
                                            Concordo com os <a href="#" class="text-prime-500 hover:underline">Termos de
                                                Uso</a>
                                            e entendo que este é um <strong class="text-white">Simulador
                                                Acadêmico</strong>.
                                        </label>
                                    </div>

                                    <button type="submit" :disabled="!isFormValid || isLoading"
                                        :class="['w-full font-semibold py-3.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2',
                                            isFormValid && !isLoading ? 'bg-prime-500 hover:bg-prime-400 text-slate-900 shadow-lg shadow-prime-500/20' : 'bg-slate-700 text-slate-400 cursor-not-allowed']">
                                        <template v-if="isLoading">
                                            <i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i>
                                            <span>Criando conta...</span>
                                        </template>
                                        <template v-else>
                                            <span>Concluir Cadastro</span>
                                            <i data-lucide="user-plus" class="w-4 h-4"></i>
                                        </template>
                                    </button>
                                </form>
                            </div>

                            <div
                                class="bg-gradient-to-br from-[#0B0F19] to-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 p-8 sm:p-10 lg:w-2/5 flex flex-col relative overflow-hidden">
                                <div
                                    class="absolute top-0 right-0 w-64 h-64 bg-prime-500/5 blur-[80px] rounded-full pointer-events-none">
                                </div>

                                <h3 class="text-lg font-semibold text-white mb-8">A Experiência PrimeInvest</h3>

                                <div class="space-y-6 flex-grow">
                                    <div class="flex gap-4">
                                        <div
                                            class="w-10 h-10 rounded-lg bg-prime-500/10 border border-prime-500/20 flex items-center justify-center flex-shrink-0">
                                            <i data-lucide="line-chart" class="w-5 h-5 text-prime-500"></i>
                                        </div>
                                        <div>
                                            <h4 class="text-sm font-semibold text-white mb-1">Mercado em Tempo Real</h4>
                                            <p class="text-xs text-slate-400 leading-relaxed">Cotações dinâmicas e
                                                execução de ordens com o nosso
                                                motor de processamento realista.</p>
                                        </div>
                                    </div>

                                    <div class="flex gap-4">
                                        <div
                                            class="w-10 h-10 rounded-lg bg-prime-500/10 border border-prime-500/20 flex items-center justify-center flex-shrink-0">
                                            <i data-lucide="gift" class="w-5 h-5 text-prime-500"></i>
                                        </div>
                                        <div>
                                            <h4 class="text-sm font-semibold text-white mb-1">10 Ativos Iniciais Grátis
                                            </h4>
                                            <p class="text-xs text-slate-400 leading-relaxed">Comece já com uma
                                                carteira. Nossa IA sorteia 10 ativos
                                                aleatórios assim que abrir a conta.</p>
                                        </div>
                                    </div>

                                    <div class="flex gap-4">
                                        <div
                                            class="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                                            <div
                                                class="w-5 h-5 rounded bg-purple-600 flex items-center justify-center text-white font-bold text-[8px]">
                                                P</div>
                                        </div>
                                        <div>
                                            <h4 class="text-sm font-semibold text-white mb-1">Ecossistema PrimeBank</h4>
                                            <p class="text-xs text-slate-400 leading-relaxed">Integração nativa com o
                                                banco. Seus saldos
                                                sincronizados e seguros numa única conta.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-12 pt-8 border-t border-slate-800/80 relative z-10">
                                    <p class="text-xs text-slate-400 mb-3 text-center lg:text-left">Já faz parte da
                                        nossa plataforma?</p>
                                    <router-link to="/login"
                                        class="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-prime-500/50 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                                        <span>Acessar minha conta</span>
                                        <i data-lucide="log-in"
                                            class="w-4 h-4 text-slate-400 group-hover:text-prime-500 transition-colors"></i>
                                    </router-link>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div v-else key="success" class="text-center max-w-lg mx-auto w-full">
                        <div
                            class="bg-[#0F172A]/90 backdrop-blur-md border border-prime-500/30 rounded-2xl shadow-[0_0_50px_-10px_rgba(234,179,8,0.25)] p-8 sm:p-10 relative overflow-hidden">
                            <div
                                class="absolute -top-20 -right-20 w-40 h-40 bg-prime-500/20 blur-[50px] rounded-full pointer-events-none">
                            </div>

                            <div
                                class="w-20 h-20 bg-prime-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-prime-500/20">
                                <i data-lucide="party-popper" class="w-10 h-10 text-prime-500"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-white mb-3">Conta Criada!</h2>

                            <div class="bg-[#0B0F19] border border-slate-800 rounded-xl p-4 mb-8 text-left">
                                <p class="text-sm text-slate-300 leading-relaxed mb-3">
                                    Bem-vindo(a), <strong class="text-white">{{ primeiroNome }}</strong>! Seu cadastro
                                    foi concluído com
                                    sucesso.
                                </p>
                                <div
                                    class="flex items-start gap-3 p-3 bg-prime-500/5 border border-prime-500/20 rounded-lg">
                                    <i data-lucide="gift" class="w-5 h-5 text-prime-500 flex-shrink-0 mt-0.5"></i>
                                    <p class="text-xs text-slate-400">
                                        <strong class="text-prime-400">Bônus de Início:</strong> Nosso sistema acabou de
                                        sortear e adicionar
                                        <strong class="text-white">10 ativos aleatórios</strong> à sua carteira de
                                        simulação para começar a
                                        operar!
                                    </p>
                                </div>
                            </div>

                            <router-link to="/login"
                                class="inline-flex w-full justify-center bg-prime-500 hover:bg-prime-400 text-slate-900 font-semibold py-3.5 px-4 rounded-lg transition-colors shadow-lg shadow-prime-500/20 items-center gap-2">
                                <span>Acessar Plataforma</span>
                                <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </router-link>
                        </div>
                    </div>
                </transition>

            </div>
        </main>

        <footer class="py-6 text-center text-xs text-slate-600 relative z-10">
            <p>&copy; 2026 PrimeInvest. Ambiente acadêmico seguro e criptografado.</p>
        </footer>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, onUpdated } from 'vue'
import axios from 'axios'

const registerData = reactive({
    nome: '',
    email: '',
    senha: '',
    senhaRepetida: '',
    termos: false
})

const isLoading = ref(false)
const errorMessage = ref('')
const isSuccess = ref(false)

const showPassword = ref(false)
const showPasswordConfirm = ref(false)

// 🔗 Conexão com Endpoint Oficial configurado no authRoutes.js do seu backend
const API_URL = 'http://localhost:3000/api/auth/registro'

// Expressões Regulares fornecidas para validações
const regexLetra = /.*[a-zA-Z].*/
const regexNumero = /.*[0-9].*/
const regexEmail = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/

// --- LÓGICA DE VALIDAÇÃO REATIVA (COMPUTED) ---

const isNomeValid = computed(() => registerData.nome.trim().length > 0)
const isEmailValid = computed(() => regexEmail.test(registerData.email.trim()))

const isLengthValid = computed(() => registerData.senha.length >= 8)
const isLetterValid = computed(() => regexLetra.test(registerData.senha))
const isNumberValid = computed(() => regexNumero.test(registerData.senha))
const isMatchValid = computed(() => registerData.senha === registerData.senhaRepetida && registerData.senha !== '')

// Desbloqueia o botão de submit apenas se todas as regras de negócio forem atendidas
const isFormValid = computed(() => {
    return isNomeValid.value &&
        isEmailValid.value &&
        isLengthValid.value &&
        isLetterValid.value &&
        isNumberValid.value &&
        isMatchValid.value &&
        registerData.termos
})

// Processa dinamicamente a força da senha baseado em critérios de pontuação
const passwordStrength = computed(() => {
    const pwd = registerData.senha
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

// Divide a string do nome para exibir apenas o primeiro na tela de sucesso
const primeiroNome = computed(() => {
    return registerData.nome.trim().split(' ')[0]
})

const renderIcons = () => {
    if (window.lucide) {
        window.lucide.createIcons()
    }
}

// --- DISPARO DE REGISTRO PARA O BACKEND NODE.JS ---
const handleRegister = async () => {
    errorMessage.value = ''
    isLoading.value = true

    try {
        // Envia o payload estruturado exatamente como o seu authController.js espera receber via req.body
        await axios.post(API_URL, {
            nome: registerData.nome.trim(),
            email: registerData.email.trim(),
            senha: registerData.senha,
            senhaRepetida: registerData.senhaRepetida
        })

        // Se o banco responder 21, significa que a conta e os 10 ativos de interesse foram salvos.
        // Ativa a tela de sucesso
        isSuccess.value = true

    } catch (error) {
        console.error("Erro ao processar registro:", error)

        // Captura as mensagens de tratamento de erro do seu backend (ex: "Já existe um usuário registrado com este e-mail.")
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message
        } else {
            errorMessage.value = "Erro interno no servidor ao tentar cadastrar. Tente novamente."
        }
        
    } finally {
        isLoading.value = false
        // Força o Lucide a renderizar novos ícones de alerta ou sucesso após a alteração do DOM
        nextTick(() => {
            renderIcons()
        })
    }
}

onMounted(() => {
    nextTick(() => {
        renderIcons()
    })
})

onUpdated(() => {
    nextTick(() => {
        renderIcons()
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

/* Classes utilitárias para a animação da tag transition do Vue */
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