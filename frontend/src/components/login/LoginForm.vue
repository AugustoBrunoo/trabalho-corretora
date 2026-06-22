<template>
    <div class="bg-[#0F172A]/90 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
        <form @submit.prevent="handleLogin" class="space-y-5">
            <div>
                <label for="document" class="block text-sm font-medium text-slate-300 mb-1.5">E-mail</label>
                <div class="relative input-fintech rounded-lg flex items-center">
                    <div class="pl-4 text-slate-500">
                        <i data-lucide="user" class="w-5 h-5"></i>
                    </div>
                    <input v-model="loginData.email" type="email" id="document"
                        class="w-full bg-transparent border-none text-white px-3 py-3.5 focus:outline-none placeholder-slate-600 text-sm"
                        placeholder="Digite seu e-mail" required>
                </div>
            </div>

            <div>
                <div class="flex justify-between items-center mb-1.5">
                    <label for="password" class="block text-sm font-medium text-slate-300">Senha</label>
                    <router-link to="/recuperar-senha"
                        class="text-xs font-medium text-prime-500 hover:text-prime-400 transition-colors">Esqueceu
                        a senha?</router-link>
                </div>
                <div class="relative input-fintech rounded-lg flex items-center">
                    <div class="pl-4 text-slate-500">
                        <i data-lucide="lock" class="w-5 h-5"></i>
                    </div>
                    <input v-model="loginData.senha" :type="showPassword ? 'text' : 'password'" id="password"
                        class="w-full bg-transparent border-none text-white px-3 py-3.5 focus:outline-none placeholder-slate-600 text-sm"
                        placeholder="••••••••" required>

                    <button type="button" @click="togglePassword"
                        class="pr-4 text-slate-500 hover:text-slate-300 focus:outline-none transition-colors flex items-center justify-center">

                        <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                            <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                            <line x1="2" y1="2" x2="22" y2="22" />
                        </svg>

                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="w-5 h-5">
                            <path
                                d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="flex items-center">
                <div class="relative flex items-center">
                    <input v-model="lembrarMe" type="checkbox" id="remember"
                        class="custom-checkbox appearance-none w-4 h-4 border border-slate-600 rounded bg-[#0B0F19] cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-prime-500/50 focus:ring-offset-1 focus:ring-offset-[#0F172A]">
                    <svg class="w-3 h-3 text-slate-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden check-icon"
                        viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <label for="remember" class="ml-2 block text-sm text-slate-400 cursor-pointer select-none">Lembrar meus
                    dados</label>
            </div>

            <div v-if="errorMessage" class="text-red-500 text-sm text-center font-medium bg-red-500/10 py-2 rounded">
                {{ errorMessage }}
            </div>

            <button type="submit" :disabled="isLoading"
                class="w-full bg-prime-500 hover:bg-prime-400 disabled:opacity-70 disabled:cursor-not-allowed text-slate-900 font-semibold py-3.5 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-prime-500/20 flex items-center justify-center gap-2 mt-2">
                <template v-if="isLoading">
                    <i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i>
                    <span>Autenticando...</span>
                </template>
                <template v-else>
                    <span>Acessar Plataforma</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </template>
            </button>
        </form>

        <div class="mt-8 mb-6 relative">
            <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-slate-800"></div>
            </div>
            <div class="relative flex justify-center text-sm">
                <span class="px-3 bg-[#0F172A] text-slate-500 text-xs uppercase tracking-wider font-semibold">Ou acesse
                    com</span>
            </div>
        </div>

        <button type="button"
            class="w-full bg-[#151E2E] hover:bg-[#1E293B] border border-slate-700 hover:border-purple-500/50 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 group">
            <div
                class="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                P
            </div>
            <span>Conta Digital PrimeBank</span>
        </button>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const loginData = reactive({
    email: '',
    senha: ''
})

const isLoading = ref(false)
const errorMessage = ref('')
const lembrarMe = ref(false)
const showPassword = ref(false)

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const API_URL = 'http://localhost:3000/api/auth/login'

function verificaEmailValido(email) {
    if (!email) return false;
    return /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/.test(email);
}

const renderIcons = () => {
    if (window.lucide) {
        window.lucide.createIcons()
    }
}

const handleLogin = async () => {
    errorMessage.value = ''

    if (!loginData.email || !loginData.senha) {
        errorMessage.value = "Por favor, preencha todos os campos."
        return
    }
    if (!verificaEmailValido(loginData.email)) {
        errorMessage.value = "O e-mail informado não está em um formato adequado."
        return
    }

    isLoading.value = true

    try {
        const response = await axios.post(API_URL, {
            email: loginData.email,
            senha: loginData.senha
        })

        const { token, nome } = response.data.usuario

        localStorage.setItem('token', token)
        localStorage.setItem('usuario_nome', nome)

        console.log(`Login bem-sucedido! Bem-vindo(a), ${nome}.`)
        router.push('/dashboard')

    } catch (error) {
        console.error("Erro na tentativa de autenticação:", error)

        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message
        } else {
            errorMessage.value = "Não foi possível conectar ao servidor. Verifique se o backend está rodando."
        }
        
    } finally {
        isLoading.value = false
        nextTick(() => {
            renderIcons()
        })
    }
}

onMounted(() => {
    nextTick(() => { renderIcons() })
})

onUpdated(() => {
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

.custom-checkbox:checked {
    background-color: #EAB308;
    border-color: #EAB308;
}

.custom-checkbox:checked+.check-icon {
    display: block;
}
</style>