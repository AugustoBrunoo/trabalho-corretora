<template>
    <div class="bg-[#0B0F19] text-slate-300 font-sans antialiased min-h-screen flex flex-col overflow-x-hidden">
        
        <!-- COMPONENTES DE INTERFACE GLOBAL -->
        <Navbar @abrir-sidebar="isSidebarOpen = true" />
        <Sidebar :isOpen="isSidebarOpen" :nomeUsuario="nomeUsuario" @fechar="isSidebarOpen = false" @abrir-sair="abrirModalSair" />

        <!-- CONTEÚDO PRINCIPAL -->
        <main class="flex-grow flex flex-col max-w-[1400px] w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10 animate-fade-in-up">
            <div class="mb-10">
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Olá, {{ primeiroNome }}!</h1>
                <p class="text-slate-400 text-sm-base">Bem-vindo de volta ao seu painel do PrimeInvest.</p>
            </div>

            <div v-if="isLoadingDados" class="flex flex-col items-center justify-center py-20">
                <i data-lucide="loader-2" class="w-10 h-10 text-prime-500 animate-spin mb-4"></i>
                <p class="text-slate-400 font-medium">Buscando seus dados financeiros...</p>
            </div>

            <div v-else>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    <!-- PAINEL FINANCEIRO -->
                    <CardPatrimonio :saldo="saldoConta" :patrimonio="patrimonioInvestido" :formatarMoeda="formatarMoeda" @transacao="abrirModalTransacao" class="lg:col-span-2" />

                    <!-- ATALHOS LATERAIS -->
                    <div class="flex flex-col gap-4">
                        <router-link to="/mercado" class="bg-[#151E2E] border border-slate-700 rounded-xl p-5 flex items-center gap-4 card-hover-effect group">
                            <div class="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"><i data-lucide="line-chart" class="w-6 h-6 text-blue-500"></i></div>
                            <div class="flex-grow"><h3 class="text-white font-bold text-base mb-0.5">Mercado (Home Broker)</h3><p class="text-xs text-slate-400">Acompanhe preços e opere ativos</p></div>
                        </router-link>
                        <router-link to="/carteira" class="bg-[#151E2E] border border-slate-700 rounded-xl p-5 flex items-center gap-4 card-hover-effect group">
                            <div class="w-12 h-12 rounded-full bg-prime-500/10 border border-prime-500/20 flex items-center justify-center"><i data-lucide="briefcase" class="w-6 h-6 text-prime-500"></i></div>
                            <div class="flex-grow"><h3 class="text-white font-bold text-base mb-0.5">Minha Carteira</h3><p class="text-xs text-slate-400">Gerencie suas posições</p></div>
                        </router-link>
                        <router-link to="/conta-corrente" class="bg-[#151E2E] border border-slate-700 rounded-xl p-5 flex items-center gap-4 card-hover-effect group">
                            <div class="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><i data-lucide="file-text" class="w-6 h-6 text-emerald-500"></i></div>
                            <div class="flex-grow"><h3 class="text-white font-bold text-base mb-0.5">Conta Corrente</h3><p class="text-xs text-slate-400">Ver extrato</p></div>
                        </router-link>
                    </div>
                </div>

                <!-- LISTAGEM DE ATIVOS -->
                <div class="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div><h2 class="text-xl font-bold text-white flex items-center gap-2"><i data-lucide="star" class="w-5 h-5 text-prime-500"></i> Suas Maiores Posições</h2></div>
                    <router-link v-if="acoes.length > 0" to="/carteira" class="text-sm font-medium text-prime-500 hover:text-prime-400">Ver carteira completa</router-link>
                </div>
                <ListaAcoes :acoes="acoes" :formatarMoeda="formatarMoeda" />
            </div>
        </main>

        <!-- MODALS E TOASTS CONTROLADOS PELO PAI -->
        <ModalTransacao :isOpen="isTransacaoModalOpen" :transacao="transacao" :isProcessando="isProcessandoTransacao" @fechar="isTransacaoModalOpen = false" @enviar="enviarTransacao" />

        <div v-if="isLogoutModalOpen" class="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div class="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
                <h3 class="text-xl font-bold text-white mb-2">Sair da Conta?</h3>
                <p class="text-sm text-slate-400 mb-8">Sua sessão será encerrada.</p>
                <div class="flex gap-3">
                    <button @click="isLogoutModalOpen = false" class="flex-1 py-3 rounded-lg border border-slate-700 text-slate-300">Cancelar</button>
                    <button @click="efetuarLogout" class="flex-1 py-3 rounded-lg bg-red-600 text-white font-bold">Sair</button>
                </div>
            </div>
        </div>

        <Toasts :toasts="toasts" />
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Navbar from '../components/dashboard/Navbar.vue'
import CardPatrimonio from '../components/dashboard/CardPatrimonio.vue'
import ListaAcoes from '../components/dashboard/ListaAcoes.vue'
import ModalTransacao from '../components/dashboard/ModalTransacao.vue'
import Toasts from '../components/dashboard/Toasts.vue'
import Sidebar from '../components/dashboard/Sidebar.vue'

// Importando os novos componentes locais


const router = useRouter()

// ESTADOS DE INTERFACE
const isSidebarOpen = ref(false)
const isLogoutModalOpen = ref(false)
const isLoadingDados = ref(true)
const isTransacaoModalOpen = ref(false)
const isProcessandoTransacao = ref(false)

const transacao = reactive({ tipo: 'deposito', valor: '', descricao: '' })
const toasts = ref([])
let toastIdCounter = 0

// DADOS DO USUÁRIO
const nomeUsuario = ref(localStorage.getItem('usuario_nome') || 'Usuário')
const primeiroNome = computed(() => nomeUsuario.value.trim().split(' ')[0])
const saldoConta = ref(0)
const patrimonioInvestido = ref(0)
const acoes = ref([])

// ENDPOINTS
const API_URL_RESUMO = 'http://localhost:3000/api/carteira'
const API_BASE_CONTA = 'http://localhost:3000/api/conta'

const formatarMoeda = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0)

const getConfig = () => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); throw new Error('Token ausente') }
    return { headers: { Authorization: `Bearer ${token}` } }
}

const mostrarToast = (mensagem, tipo = 'sucesso') => {
    const id = toastIdCounter++
    toasts.value.push({ id, mensagem, tipo })
    setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id) }, 4000)
}

const fetchDadosDashboard = async () => {
    try {
        const response = await axios.get(API_URL_RESUMO, getConfig())
        saldoConta.value = parseFloat(response.data.saldoDisponivel || 0)
        patrimonioInvestido.value = parseFloat(response.data.resumo.patrimonioAtivos || 0)
        acoes.value = response.data.ativos || []
    } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) efetuarLogout()
    } finally {
        isLoadingDados.value = false
        nextTick(() => { if (window.lucide) window.lucide.createIcons() })
    }
}

const abrirModalTransacao = (tipo) => {
    transacao.tipo = tipo; transacao.valor = ''; transacao.descricao = ''
    isTransacaoModalOpen.value = true
}

const enviarTransacao = async () => {
    if (transacao.valor <= 0) return mostrarToast("O valor deve ser maior que zero.", "erro")
    if (transacao.tipo === 'retirada' && transacao.valor > saldoConta.value) return mostrarToast("Saldo insuficiente.", "erro")

    isProcessandoTransacao.value = true
    try {
        const url = `${API_BASE_CONTA}/${transacao.tipo}`
        await axios.post(url, { valor: parseFloat(transacao.valor), descricao: transacao.descricao }, getConfig())
        isTransacaoModalOpen.value = false
        mostrarToast('Operação realizada com sucesso!', 'sucesso')
        await fetchDadosDashboard()
    } catch (error) {
        mostrarToast(error.response?.data?.message || "Erro ao processar.", "erro")
    } finally {
        isProcessandoTransacao.value = false
    }
}

const abrirModalSair = () => { isSidebarOpen.value = false; isLogoutModalOpen.value = true }
const efectuarLogout = () => { localStorage.clear(); router.push('/login') }

onMounted(() => fetchDadosDashboard())
onUpdated(() => { nextTick(() => { if (window.lucide) window.lucide.createIcons() }) })
</script>

<style scoped>
/* Mantido apenas os estilos estruturais de animação e efeitos visuais da página */
.glass-panel { background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
.card-hover-effect { transition: all 0.3s ease; }
.card-hover-effect:hover { transform: translateY(-4px); border-color: #EAB308; }
.input-fintech { background: #0B0F19; border: 1px solid #1F2937; }
</style>