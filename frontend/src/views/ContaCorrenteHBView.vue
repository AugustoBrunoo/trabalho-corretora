<template>
    <div
        class="bg-[#0B0F19] text-slate-300 font-sans antialiased selection:bg-prime-500 selection:text-slate-900 min-h-screen flex flex-col overflow-x-hidden">

        <nav class="glass-panel z-40 flex-shrink-0 sticky top-0">
            <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-8 h-8 rounded bg-prime-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-prime-500/20">
                            P
                        </div>
                        <span class="font-bold text-xl tracking-tight text-white">Prime<span
                                class="text-prime-500 font-medium">Invest</span></span>
                    </div>

                    <div class="flex items-center">
                        <button @click="isSidebarOpen = true"
                            class="flex items-center gap-2 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors focus:outline-none">
                            <span class="text-sm font-medium hidden sm:block">Menu</span>
                            <i data-lucide="menu" class="w-6 h-6"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <div @click="isSidebarOpen = false"
            :class="['fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-300', isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']">
        </div>

        <aside
            :class="['fixed top-0 right-0 h-full w-full sm:w-[360px] bg-[#0F172A] border-l border-slate-700 shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out flex flex-col', isSidebarOpen ? 'translate-x-0' : 'translate-x-full']">
            <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-[#151E2E]/30">
                <div class="flex items-center gap-2">
                    <div
                        class="w-6 h-6 rounded bg-prime-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm shadow-prime-500/20">
                        P</div>
                    <span class="font-bold text-white tracking-tight">Menu Principal</span>
                </div>
                <button @click="isSidebarOpen = false"
                    class="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <div
                class="p-6 border-b border-slate-800 bg-gradient-to-b from-[#151E2E]/50 to-transparent relative overflow-hidden">
                <div
                    class="absolute -right-10 -top-10 w-32 h-32 bg-prime-500/10 rounded-full blur-2xl pointer-events-none">
                </div>

                <div class="flex items-center gap-4 mb-5 relative z-10">
                    <div
                        class="w-14 h-14 rounded-full bg-[#0B0F19] border-2 border-prime-500/50 flex items-center justify-center text-slate-300 shadow-lg">
                        <i data-lucide="user" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-white leading-tight">{{ nomeUsuario }}</h3>
                        <p class="text-xs text-prime-400 font-medium mt-0.5">Conta Prime</p>
                    </div>
                </div>

                <div class="flex gap-3 relative z-10">
                    <button
                        class="flex-1 py-2.5 px-3 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 shadow-sm flex items-center justify-center gap-2">
                        <i data-lucide="settings" class="w-4 h-4 text-slate-400"></i> Ajustes
                    </button>
                    <button @click="isLogoutModalOpen = true; isSidebarOpen = false"
                        class="flex-1 py-2.5 px-3 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20 shadow-sm flex items-center justify-center gap-2">
                        <i data-lucide="log-out" class="w-4 h-4"></i> Sair
                    </button>
                </div>
            </div>

            <nav class="flex-1 overflow-y-auto p-5 space-y-2 no-scrollbar">
                <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Plataforma</p>

                <router-link to="/dashboard" @click="isSidebarOpen = false"
                    class="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium transition-colors group border border-transparent hover:border-slate-700/50">
                    <div class="flex items-center gap-3">
                        <i data-lucide="layout-dashboard"
                            class="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors"></i> Início
                    </div>
                    <i data-lucide="chevron-right"
                        class="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors"></i>
                </router-link>

                <router-link to="/mercado" @click="isSidebarOpen = false"
                    class="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium transition-colors group border border-transparent hover:border-slate-700/50">
                    <div class="flex items-center gap-3">
                        <i data-lucide="line-chart"
                            class="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors"></i> Mercado
                    </div>
                    <i data-lucide="chevron-right"
                        class="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors"></i>
                </router-link>

                <router-link to="/carteira" @click="isSidebarOpen = false"
                    class="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium transition-colors group border border-transparent hover:border-slate-700/50">
                    <div class="flex items-center gap-3">
                        <i data-lucide="briefcase"
                            class="w-5 h-5 text-slate-400 group-hover:text-prime-400 transition-colors"></i> Minha
                        Carteira
                    </div>
                    <i data-lucide="chevron-right"
                        class="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors"></i>
                </router-link>

                <router-link to="/conta-corrente" @click="isSidebarOpen = false"
                    class="flex items-center justify-between px-4 py-3.5 rounded-xl bg-prime-500/10 text-prime-400 border border-prime-500/20 font-semibold transition-colors group">
                    <div class="flex items-center gap-3">
                        <i data-lucide="file-text" class="w-5 h-5"></i> Conta Corrente
                    </div>
                    <div class="w-1.5 h-1.5 rounded-full bg-prime-500"></div>
                </router-link>
            </nav>
        </aside>

        <main
            class="flex-grow flex flex-col max-w-[900px] w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10 animate-fade-in-up">

            <div class="mb-8">
                <router-link to="/dashboard"
                    class="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-prime-500 transition-colors mb-3 group">
                    <i data-lucide="arrow-left"
                        class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"></i> Voltar ao
                    Dashboard
                </router-link>

                <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <i data-lucide="file-text" class="w-7 h-7 text-prime-500"></i> Conta Corrente
                </h1>
                <p class="text-slate-400 text-sm mt-1">Acompanhe seus depósitos, retiradas e transações de ordens.</p>
            </div>

            <div
                class="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div
                    class="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none">
                </div>

                <div class="relative z-10">
                    <p
                        class="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <i data-lucide="wallet" class="w-4 h-4 text-emerald-500"></i> Saldo Disponível
                    </p>
                    <div class="flex items-baseline gap-3">
                        <h2 class="text-4xl sm:text-5xl font-bold text-white tracking-tight">{{
                            formatarMoeda(saldoAtual) }}</h2>
                    </div>
                </div>

                <div class="relative z-10 flex flex-row gap-3">
                    <button @click="abrirModalTransacao('deposito')"
                        class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold text-white transition-colors shadow-lg shadow-emerald-500/20">
                        <i data-lucide="arrow-down-to-line" class="w-4 h-4"></i> Depositar
                    </button>
                    <button @click="abrirModalTransacao('retirada')"
                        class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-sm font-bold text-white transition-colors shadow-lg">
                        <i data-lucide="arrow-up-from-line" class="w-4 h-4 text-slate-300"></i> Retirar
                    </button>
                </div>
            </div>

            <div
                class="bg-[#0F172A] border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col flex-grow">
                <div
                    class="p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#151E2E]">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-6 bg-slate-600 rounded-full"></div>
                        <h3 class="text-lg font-bold text-white">Extrato de Movimentações</h3>
                    </div>

                    <div class="flex items-center gap-3 w-full sm:w-auto">
                        <button @click="gerarPDFExtrato" :disabled="transacoes.length === 0"
                            class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            <i data-lucide="file-down" class="w-3.5 h-3.5 text-prime-500"></i> <span
                                class="hidden sm:inline">Exportar PDF</span>
                        </button>

                        <div
                            class="bg-[#0B0F19] border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2 flex-1 sm:flex-none justify-center">
                            <i data-lucide="clock" class="w-3.5 h-3.5 text-prime-500"></i>
                            <span class="text-xs text-slate-400 font-medium">Relógio: Min <span class="text-white">{{
                                    minutoAtual }}</span></span>
                        </div>
                    </div>
                </div>

                <div class="flex-grow overflow-y-auto max-h-[600px] no-scrollbar">

                    <div v-if="isLoading" class="p-16 text-center text-slate-500">
                        <i data-lucide="loader-2" class="w-8 h-8 animate-spin mx-auto mb-3"></i>
                        <p class="text-sm">Buscando transações...</p>
                    </div>

                    <div v-else-if="transacoes.length === 0"
                        class="flex flex-col items-center justify-center py-16 px-4 text-center">
                        <div
                            class="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-4">
                            <i data-lucide="receipt" class="w-8 h-8 text-slate-500"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Nenhuma movimentação</h3>
                        <p class="text-slate-400 text-sm max-w-sm">Sua conta corrente ainda não possui depósitos,
                            retiradas ou ordens executadas.</p>
                    </div>

                    <div v-else class="divide-y divide-slate-800/50">
                        <div v-for="t in transacoes" :key="t._id"
                            class="extrato-item p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div class="flex items-start sm:items-center gap-4">
                                <div
                                    :class="['w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0',
                                        t.tipo === 'deposito' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20']">
                                    <i :data-lucide="t.tipo === 'deposito' ? 'arrow-down-left' : 'arrow-up-right'"
                                        class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <p class="font-semibold text-white text-sm sm:text-base leading-tight mb-1">{{
                                        t.descricao }}</p>
                                    <div class="flex items-center gap-3 text-xs font-medium text-slate-500">
                                        <span class="bg-[#0B0F19] px-2 py-0.5 rounded border border-slate-800">Minuto
                                            Simulado: {{ t.minutoSimulacao }}</span>
                                        <span>{{ formatarData(t.createdAt) }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-left sm:text-right mt-2 sm:mt-0 ml-14 sm:ml-0">
                                <p
                                    :class="['font-bold text-lg mb-0.5', t.tipo === 'deposito' ? 'text-emerald-400' : 'text-red-400']">
                                    {{ t.tipo === 'deposito' ? '+' : '-' }} {{ formatarMoeda(t.valor) }}
                                </p>
                                <p class="text-xs font-medium text-slate-500">Saldo final: <span
                                        class="text-slate-400">{{ formatarMoeda(t.saldoResultante) }}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>

        <div id="pdf-container-oculto" style="display: none;"></div>

        <div class="fixed bottom-6 right-6 z-[70] flex flex-col gap-3 pointer-events-none">
            <transition-group name="toast-anim">
                <div v-for="toast in toasts" :key="toast.id" :class="['flex items-center gap-3 bg-[#0F172A] border p-4 rounded-xl shadow-xl pointer-events-auto',
                    toast.tipo === 'erro' ? 'border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]' :
                        toast.tipo === 'info' ? 'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]' :
                            'border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]']">

                    <i v-if="toast.tipo === 'erro'" data-lucide="x-circle" class="w-5 h-5 text-red-500"></i>
                    <i v-else-if="toast.tipo === 'info'" data-lucide="info" class="w-5 h-5 text-blue-500"></i>
                    <i v-else data-lucide="check-circle" class="w-5 h-5 text-emerald-500"></i>

                    <p class="text-sm font-medium text-white pr-4">{{ toast.mensagem }}</p>
                </div>
            </transition-group>
        </div>

        <div v-if="isTransacaoModalOpen"
            class="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div
                class="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">

                <div
                    :class="['p-5 border-b border-slate-800 flex justify-between items-center', transacao.tipo === 'deposito' ? 'bg-emerald-900/20 border-l-4 border-l-emerald-500' : 'bg-slate-800/50 border-l-4 border-l-slate-400']">
                    <h3 class="text-lg font-bold text-white flex items-center gap-2">
                        <i :data-lucide="transacao.tipo === 'deposito' ? 'arrow-down-to-line' : 'arrow-up-from-line'"
                            :class="transacao.tipo === 'deposito' ? 'text-emerald-400' : 'text-slate-300'"
                            class="w-5 h-5"></i>
                        {{ transacao.tipo === 'deposito' ? 'Fazer Depósito' : 'Fazer Retirada' }}
                    </h3>
                    <button @click="isTransacaoModalOpen = false"
                        class="text-slate-400 hover:text-white transition-colors">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <div class="p-6">
                    <form @submit.prevent="enviarTransacao" class="space-y-4">
                        <div>
                            <label class="block text-xs font-medium text-slate-300 mb-1.5">Valor (R$)</label>
                            <div class="relative input-fintech rounded-lg flex items-center">
                                <span class="pl-4 text-slate-500 text-sm">R$</span>
                                <input v-model="transacao.valor" type="number" min="0.01" step="0.01" required
                                    class="w-full bg-transparent border-none text-white px-3 py-3.5 focus:outline-none text-sm font-medium"
                                    placeholder="0.00">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-medium text-slate-300 mb-1.5">Descrição da
                                Movimentação</label>
                            <input v-model="transacao.descricao" type="text" required
                                class="w-full input-fintech text-white px-4 py-3.5 rounded-lg focus:outline-none text-sm"
                                placeholder="Ex: Aporte inicial / Pagamento..." maxlength="100">
                        </div>

                        <div class="mt-6">
                            <button type="submit" :disabled="isProcessandoTransacao"
                                :class="['w-full py-3.5 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
                                    transacao.tipo === 'deposito' ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white']">
                                <i v-if="isProcessandoTransacao" data-lucide="loader-2"
                                    class="w-4 h-4 animate-spin"></i>
                                <i v-else data-lucide="check" class="w-4 h-4"></i>
                                {{ isProcessandoTransacao ? 'Processando...' : (transacao.tipo === 'deposito' ?
                                'Confirmar Depósito' : 'Confirmar Retirada') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div v-if="isLogoutModalOpen"
            class="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div
                class="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center animate-fade-in-up">
                <div
                    class="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                    <i data-lucide="alert-triangle" class="w-7 h-7 text-red-500"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">Sair da Conta?</h3>
                <p class="text-sm text-slate-400 mb-8 leading-relaxed">Sua sessão será encerrada e você precisará fazer
                    login novamente.</p>
                <div class="flex gap-3">
                    <button @click="isLogoutModalOpen = false"
                        class="flex-1 py-3 rounded-lg border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors">Cancelar</button>
                    <button @click="efetuarLogout"
                        class="flex-1 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-500/20">Sair</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// ==========================================
// ESTADOS DA INTERFACE
// ==========================================
const isSidebarOpen = ref(false)
const isLogoutModalOpen = ref(false)
const isLoading = ref(true)
const isTransacaoModalOpen = ref(false)
const isProcessandoTransacao = ref(false)

const nomeUsuario = ref(localStorage.getItem('usuario_nome') || 'Usuário')

// ==========================================
// ESTADOS DE DADOS (Baseado no Thunder Client)
// ==========================================
const saldoAtual = ref(0)
const minutoAtual = ref(0)
const transacoes = ref([])

// Form do Modal de Transação
const transacao = reactive({
    tipo: 'deposito', // ou 'retirada'
    valor: '',
    descricao: ''
})

// Sistema de Toasts (Notificações)
const toasts = ref([])
let toastIdCounter = 0

// 🔗 URIs DO BACKEND (Baseado na barra lateral do seu Thunder Client)
const API_BASE = 'http://localhost:3000/api/conta'
const API_TRANSACOES = `${API_BASE}/transacoes`
const API_DEPOSITO = `${API_BASE}/deposito`
const API_RETIRADA = `${API_BASE}/retirada`

// ==========================================
// FUNÇÕES UTILITÁRIAS
// ==========================================
const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0)
}

const formatarData = (dataIsoString) => {
    const data = new Date(dataIsoString)
    return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')} ${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}`
}

const mostrarToast = (mensagem, tipo = 'sucesso') => {
    const id = toastIdCounter++
    toasts.value.push({ id, mensagem, tipo })

    nextTick(() => { if (window.lucide) window.lucide.createIcons() })

    // Auto-remove o toast após 4 segundos
    setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }, 4000)
}

// ==========================================
// REQUISIÇÕES AO BACKEND NODE.JS
// ==========================================
const getConfig = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        router.push('/login')
        throw new Error('Token ausente')
    }
    return { headers: { Authorization: `Bearer ${token}` } }
}

const fetchTransacoes = async () => {
    isLoading.value = true
    try {
        const { data } = await axios.get(API_TRANSACOES, getConfig())

        // Mapeando exatamente as chaves que o seu backend retornou no Thunder Client
        saldoAtual.value = parseFloat(data.saldoAtual || 0)
        minutoAtual.value = data.minutoAtual || 0

        // Se a API não ordenar decrescente, podemos forçar um .reverse() aqui para a mais nova ficar no topo
        transacoes.value = data.transacoes.reverse() || []

    } catch (error) {
        console.error("Erro ao buscar transações:", error)
        if (error.response?.status === 401) efetuarLogout()
        mostrarToast("Erro ao carregar o extrato.", "erro")
    } finally {
        isLoading.value = false
        nextTick(() => { if (window.lucide) window.lucide.createIcons() })
    }
}

const abrirModalTransacao = (tipo) => {
    transacao.tipo = tipo
    transacao.valor = ''
    transacao.descricao = ''
    isTransacaoModalOpen.value = true
    nextTick(() => { if (window.lucide) window.lucide.createIcons() })
}

const enviarTransacao = async () => {
    if (transacao.valor <= 0) {
        mostrarToast("O valor deve ser maior que zero.", "erro")
        return
    }

    if (transacao.tipo === 'retirada' && transacao.valor > saldoAtual.value) {
        mostrarToast("Saldo insuficiente para esta retirada.", "erro")
        return
    }

    isProcessandoTransacao.value = true

    try {
        const payload = {
            valor: parseFloat(transacao.valor),
            descricao: transacao.descricao
        }

        // Define a URL dinamicamente com base no botão clicado (Depósito ou Retirada)
        const url = transacao.tipo === 'deposito' ? API_DEPOSITO : API_RETIRADA

        await axios.post(url, payload, getConfig())

        // Sucesso: Fecha o modal, mostra a mensagem e recarrega os dados do banco para atualizar a tela
        isTransacaoModalOpen.value = false
        mostrarToast(`${transacao.tipo === 'deposito' ? 'Depósito' : 'Retirada'} realizado com sucesso!`, 'sucesso')

        await fetchTransacoes()

    } catch (error) {
        console.error(`Erro ao efetuar ${transacao.tipo}:`, error)
        const msg = error.response?.data?.message || `Erro ao processar a ${transacao.tipo}.`
        mostrarToast(msg, "erro")
    } finally {
        isProcessandoTransacao.value = false
    }
}

// ==========================================
// EXPORTAÇÃO PARA PDF (Mantendo o html2pdf)
// ==========================================
const gerarPDFExtrato = () => {
    if (transacoes.value.length === 0) return

    mostrarToast("Gerando PDF, aguarde...", "info")

    const agora = new Date()
    const dataFormatadaStr = `${agora.getFullYear()}${String(agora.getMonth() + 1).padStart(2, '0')}${String(agora.getDate()).padStart(2, '0')}`

    const elementoDocumento = document.createElement('div')
    elementoDocumento.style.padding = '40px'
    elementoDocumento.style.backgroundColor = '#ffffff'
    elementoDocumento.style.color = '#000000'
    elementoDocumento.style.fontFamily = 'Helvetica, Arial, sans-serif'

    let html = `
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px; border-bottom: 2px solid #EAB308; padding-bottom: 20px;">
            <div style="width: 45px; height: 45px; background-color: #EAB308; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #0B0F19; font-weight: 900; font-size: 24px;">P</div>
            <div>
                <h1 style="margin: 0; font-size: 24px; color: #0F172A; font-weight: bold;">Prime<span style="color: #EAB308;">Invest</span></h1>
                <p style="margin: 0; font-size: 14px; color: #64748B;">Extrato Oficial de Conta Corrente</p>
            </div>
        </div>
        <div style="margin-bottom: 30px; line-height: 1.6; font-size: 14px; color: #334155;">
            <p style="margin: 0;"><strong>Cliente Titular:</strong> ${nomeUsuario.value}</p>
            <p style="margin: 0;"><strong>Saldo Atual Disponível:</strong> ${formatarMoeda(saldoAtual.value)}</p>
            <p style="margin: 0;"><strong>Data de Emissão:</strong> ${agora.toLocaleDateString('pt-BR')} às ${agora.toLocaleTimeString('pt-BR')}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
                <tr style="background-color: #F1F5F9; border-bottom: 2px solid #94A3B8; text-align: left;">
                    <th style="padding: 12px 10px; font-size: 12px; color: #334155; text-transform: uppercase;">Data / Min</th>
                    <th style="padding: 12px 10px; font-size: 12px; color: #334155; text-transform: uppercase;">Descrição</th>
                    <th style="padding: 12px 10px; font-size: 12px; color: #334155; text-transform: uppercase; text-align: right;">Valor</th>
                    <th style="padding: 12px 10px; font-size: 12px; color: #334155; text-transform: uppercase; text-align: right;">Saldo Final</th>
                </tr>
            </thead>
            <tbody>
    `

    transacoes.value.forEach(t => {
        const isDeposito = t.tipo === 'deposito'
        const corValor = isDeposito ? '#059669' : '#DC2626'
        const sinal = isDeposito ? '+' : '-'
        html += `
            <tr style="border-bottom: 1px solid #E2E8F0;">
                <td style="padding: 12px 10px; font-size: 12px; color: #475569;">
                    <strong>${new Date(t.createdAt).toLocaleDateString('pt-BR')}</strong><br>
                    <span style="color: #94A3B8; font-size: 10px;">Simulador: ${t.minutoSimulacao}m</span>
                </td>
                <td style="padding: 12px 10px; font-size: 12px; color: #0F172A;">${t.descricao}</td>
                <td style="padding: 12px 10px; font-size: 13px; color: ${corValor}; text-align: right; font-weight: bold;">${sinal} ${formatarMoeda(t.valor)}</td>
                <td style="padding: 12px 10px; font-size: 13px; color: #334155; text-align: right; font-weight: bold;">${formatarMoeda(t.saldoResultante)}</td>
            </tr>
        `
    })

    html += `
            </tbody>
        </table>
        <div style="text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px dashed #CBD5E1; font-size: 11px; color: #94A3B8;">
            <p style="margin:0;">Este documento é um registro gerado automaticamente pelo Simulador Acadêmico PrimeInvest.</p>
            <p style="margin:4px 0 0 0;">Não possui valor fiscal ou legal. Para fins estritamente educacionais.</p>
        </div>
    `
    elementoDocumento.innerHTML = html

    // Assumindo que html2pdf foi importado globalmente via script tag no index.html
    if (window.html2pdf) {
        window.html2pdf().set({
            margin: 10,
            filename: `Extrato_PrimeInvest_${dataFormatadaStr}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }).from(elementoDocumento).save().then(() => {
            mostrarToast("PDF do extrato gerado com sucesso!", "sucesso")
        })
    } else {
        mostrarToast("Biblioteca de PDF não carregada.", "erro")
    }
}

const efetuarLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario_nome')
    router.push('/login')
}

// ==========================================
// CICLO DE VIDA DO COMPONENTE
// ==========================================
onMounted(() => {
    fetchTransacoes()
})

onUpdated(() => {
    nextTick(() => { if (window.lucide) window.lucide.createIcons() })
})
</script>

<style scoped>
.glass-panel {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.input-fintech {
    background: #0B0F19;
    border: 1px solid #1F2937;
    transition: all 0.2s ease;
}

.input-fintech:focus-within {
    border-color: #EAB308;
    box-shadow: 0 0 0 1px #EAB308;
}

.extrato-item {
    transition: all 0.2s ease;
}

.extrato-item:hover {
    background: rgba(30, 41, 59, 0.5);
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.animate-fade-in-up {
    animation: fadeInUp 0.4s ease-out forwards;
}

@keyframes fadeInUp {
    0% {
        transform: translateY(10px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Transição suave para os Toasts */
.toast-anim-enter-active,
.toast-anim-leave-active {
    transition: all 0.3s ease;
}

.toast-anim-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.toast-anim-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>