<template>
    <div
        class="bg-[#0B0F19] text-slate-300 font-sans antialiased selection:bg-prime-500 selection:text-slate-900 min-h-screen flex flex-col overflow-x-hidden">

        <nav class="glass-panel z-40 flex-shrink-0 sticky top-0">
            <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-8 h-8 rounded bg-prime-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-prime-500/20">
                            P</div>
                        <span class="font-bold text-xl tracking-tight text-white">Prime<span
                                class="text-prime-500 font-medium">Invest</span></span>
                    </div>
                    <button @click="isSidebarOpen = true"
                        class="flex items-center gap-2 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors focus:outline-none">
                        <span class="text-sm font-medium hidden sm:block">Menu</span>
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                </div>
            </div>
        </nav>

        <div @click="isSidebarOpen = false"
            :class="['fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-300', isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']">
        </div>
        <aside
            :class="['fixed top-0 right-0 h-full w-full sm:w-[360px] bg-[#0F172A] border-l border-slate-700 shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out flex flex-col', isSidebarOpen ? 'translate-x-0' : 'translate-x-full']">
            <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-[#151E2E]/30">
                <span class="font-bold text-white tracking-tight">Menu Principal</span>
                <button @click="isSidebarOpen = false"
                    class="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            <div class="p-6 border-b border-slate-800">
                <div class="flex items-center gap-4 mb-5">
                    <div
                        class="w-12 h-12 rounded-full bg-[#0B0F19] border-2 border-prime-500/50 flex items-center justify-center">
                        <i data-lucide="user" class="w-6 h-6"></i></div>
                    <div>
                        <h3 class="text-sm font-bold text-white">{{ nomeUsuario }}</h3>
                        <p class="text-[10px] text-prime-400 font-medium uppercase">Conta Prime</p>
                    </div>
                </div>
                <button @click="efetuarLogout"
                    class="w-full py-2 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20 shadow-sm flex items-center justify-center gap-2">
                    <i data-lucide="log-out" class="w-4 h-4"></i> Sair da Conta
                </button>
            </div>
            <nav class="flex-1 p-5 space-y-2">
                <router-link to="/dashboard"
                    class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50"><i
                        data-lucide="layout-dashboard" class="w-5 h-5"></i> Início</router-link>
                <router-link to="/mercado"
                    class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50"><i
                        data-lucide="line-chart" class="w-5 h-5"></i> Mercado</router-link>
                <router-link to="/carteira"
                    class="flex items-center justify-between px-4 py-3 rounded-xl bg-prime-500/10 text-prime-400 border border-prime-500/20 font-semibold">
                    <div class="flex items-center gap-3"><i data-lucide="briefcase" class="w-5 h-5"></i> Minha Carteira
                    </div>
                    <div class="w-1.5 h-1.5 rounded-full bg-prime-500"></div>
                </router-link>
                <router-link to="/conta-corrente"
                    class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50"><i
                        data-lucide="file-text" class="w-5 h-5"></i> Conta Corrente</router-link>
            </nav>
        </aside>

        <main class="flex-grow flex flex-col max-w-[1400px] w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10">

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                <div
                    class="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-700 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-center">
                    <div
                        class="absolute -right-10 -top-10 w-32 h-32 bg-prime-500/5 rounded-full blur-2xl pointer-events-none">
                    </div>
                    <p
                        class="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5 relative z-10">
                        <i data-lucide="landmark" class="w-4 h-4 text-prime-500"></i> Patrimônio Total
                    </p>
                    <h3 class="text-2xl font-bold text-white tracking-tight relative z-10">{{
                        formatarMoeda(patrimonioTotal) }}</h3>
                    <p class="text-[10px] text-slate-500 mt-1 relative z-10 flex items-center gap-1">
                        <i data-lucide="clock" class="w-3 h-3 text-prime-500"></i> Relógio: Min {{ minutoAtual }}
                    </p>
                </div>

                <div class="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-center">
                    <p
                        class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <i data-lucide="layers" class="w-4 h-4 text-slate-500"></i> Investido (Custo)
                    </p>
                    <h3 class="text-xl font-bold text-white tracking-tight">{{ formatarMoeda(totalInvestidoCusto) }}
                    </h3>
                    <p class="text-[10px] text-slate-500 mt-1">Soma das ações em carteira</p>
                </div>

                <div
                    :class="['border rounded-xl p-5 shadow-lg flex flex-col justify-center', lucroGlobal >= 0 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20']">
                    <p
                        class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <i data-lucide="trending-up" class="w-4 h-4 text-slate-500"></i> Lucro Aberto
                    </p>
                    <h3
                        :class="['text-xl font-bold tracking-tight', lucroGlobal >= 0 ? 'text-emerald-400' : 'text-red-400']">
                        {{ lucroGlobal >= 0 ? '+' : '' }} {{ formatarMoeda(lucroGlobal) }}
                    </h3>
                    <p class="text-[10px] opacity-70 mt-1"
                        :class="lucroGlobal >= 0 ? 'text-emerald-400' : 'text-red-400'">
                        Variação exclusiva dos ativos atuais
                    </p>
                </div>

                <div
                    :class="['border rounded-xl p-5 shadow-lg flex flex-col justify-center relative overflow-hidden', resultadoHistorico >= 0 ? 'bg-emerald-900/20 border-emerald-500/40 shadow-emerald-500/10' : 'bg-red-900/20 border-red-500/40 shadow-red-500/10']">
                    <p
                        class="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5 relative z-10">
                        <i data-lucide="bar-chart-2" class="w-4 h-4"
                            :class="resultadoHistorico >= 0 ? 'text-emerald-400' : 'text-red-400'"></i> Desempenho
                        Global
                    </p>
                    <h3
                        :class="['text-2xl font-bold tracking-tight relative z-10', resultadoHistorico >= 0 ? 'text-emerald-400' : 'text-red-400']">
                        {{ resultadoHistorico >= 0 ? '+' : '' }} {{ formatarMoeda(resultadoHistorico) }}
                    </h3>
                    <p class="text-[10px] mt-1 font-medium relative z-10"
                        :class="resultadoHistorico >= 0 ? 'text-emerald-500' : 'text-red-400'">
                        Patrimônio Total vs. Aportes
                    </p>
                </div>

            </div>

            <div
                class="flex-grow flex flex-col bg-[#0F172A] border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                <div
                    class="p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#151E2E]">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-6 bg-prime-500 rounded-full"></div>
                        <h2 class="text-lg font-bold text-white">Posição da Carteira</h2>
                    </div>
                    <div class="flex gap-3 w-full sm:w-auto">
                        <button @click="abrirOrdens"
                            class="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                            <i data-lucide="history" class="w-4 h-4"></i> Ordens
                        </button>
                        <router-link to="/mercado"
                            class="flex-1 sm:flex-none bg-prime-500 hover:bg-prime-400 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-prime-500/20 text-sm">
                            <i data-lucide="shopping-cart" class="w-4 h-4"></i> Comprar Mais
                        </router-link>
                    </div>
                </div>

                <div class="overflow-x-auto flex-grow relative">
                    <div v-if="isLoading" class="p-20 text-center">
                        <i data-lucide="loader-2" class="w-10 h-10 animate-spin text-prime-500 mx-auto mb-4"></i>
                        <p>Carregando sua carteira...</p>
                    </div>

                    <table v-else-if="ativos.length > 0" class="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr
                                class="bg-[#0B0F19] text-xs uppercase tracking-wider text-slate-500 border-b border-slate-800">
                                <th class="p-4 font-semibold">Ativo</th>
                                <th class="p-4 font-semibold text-center">Quantidade</th>
                                <th class="p-4 font-semibold text-right">Preço Médio</th>
                                <th class="p-4 font-semibold text-right">Preço Atual</th>
                                <th class="p-4 font-semibold text-right">Valor Total</th>
                                <th class="p-4 font-semibold text-right">Resultado</th>
                                <th class="p-4 font-semibold text-center w-24">Ações</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-slate-800/50">
                            <tr v-for="ativo in ativos" :key="ativo.ticker"
                                class="hover:bg-slate-800/30 transition-colors group">
                                <td class="p-4 font-bold text-white flex items-center gap-3">
                                    <div
                                        class="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400 font-bold">
                                        {{ ativo.ticker.substring(0, 2) }}</div>
                                    {{ ativo.ticker }}
                                </td>
                                <td class="p-4 text-center font-medium text-white">{{ ativo.quantidade }}</td>
                                <td class="p-4 text-right text-slate-400">{{ formatarMoeda(ativo.precoMedio) }}</td>
                                <td class="p-4 text-right font-medium text-white">{{ formatarMoeda(ativo.precoAtual) }}
                                </td>
                                <td class="p-4 text-right font-medium text-white">{{
                                    formatarMoeda(ativo.valorTotalAtual) }}</td>
                                <td
                                    :class="['p-4 text-right font-bold', parseFloat(ativo.resultado) >= 0 ? 'text-emerald-400' : 'text-red-400']">
                                    <i :data-lucide="parseFloat(ativo.resultado) >= 0 ? 'arrow-up-right' : 'arrow-down-right'"
                                        class="w-3 h-3 inline mr-1"></i>
                                    {{ formatarMoeda(Math.abs(ativo.resultado)) }}
                                </td>
                                <td class="p-4 text-center">
                                    <button @click="prepararVenda(ativo)"
                                        class="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded shadow transition-colors w-full">VENDER</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-else class="flex flex-col items-center justify-center py-20 px-4 text-center">
                        <div
                            class="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-4">
                            <i data-lucide="briefcase" class="w-8 h-8 text-slate-500"></i></div>
                        <h3 class="text-lg font-bold text-white mb-2">Sua carteira está vazia</h3>
                        <p class="text-slate-400 text-sm max-w-sm">Você ainda não possui ativos investidos.</p>
                    </div>
                </div>
            </div>
        </main>

        <div @click="isOrdensOpen = false"
            :class="['fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] transition-opacity duration-300', isOrdensOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']">
        </div>
        <div
            :class="['fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0F172A] border-l border-slate-700 shadow-2xl z-[60] transform transition-transform duration-300 flex flex-col', isOrdensOpen ? 'translate-x-0' : 'translate-x-full']">
            <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-[#151E2E]">
                <h3 class="text-lg font-bold text-white flex items-center gap-2"><i data-lucide="history"
                        class="w-5 h-5 text-prime-500"></i> Ordens</h3>
                <button @click="isOrdensOpen = false"
                    class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"><i
                        data-lucide="x" class="w-4 h-4"></i></button>
            </div>
            <div class="flex border-b border-slate-800">
                <button @click="abaOrdens = 'pendentes'"
                    :class="['flex-1 py-3 text-sm font-bold transition-all', abaOrdens === 'pendentes' ? 'text-prime-500 border-b-2 border-prime-500 bg-slate-800/30' : 'text-slate-400']">Pendentes</button>
                <button @click="abaOrdens = 'historico'"
                    :class="['flex-1 py-3 text-sm font-bold transition-all', abaOrdens === 'historico' ? 'text-prime-500 border-b-2 border-prime-500 bg-slate-800/30' : 'text-slate-400']">Histórico</button>
            </div>

            <div class="flex-grow overflow-y-auto p-4 space-y-3 no-scrollbar">

                <div v-if="ordensFiltradas.length === 0" class="text-center py-10">
                    <i data-lucide="inbox" class="w-8 h-8 text-slate-600 mx-auto mb-2"></i>
                    <p class="text-sm text-slate-500">Nenhuma ordem encontrada aqui.</p>
                </div>

                <div v-for="ordem in ordensFiltradas" :key="ordem._id"
                    class="bg-[#151E2E] border border-slate-700/60 rounded-lg p-3 shadow-sm">
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="flex items-center gap-2 mb-1">
                                <span class="font-bold text-white text-sm">{{ ordem.ticker }}</span>
                                <span
                                    :class="['text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase', ordem.tipoOrdem === 'compra' ? 'text-blue-400 border-blue-500/20' : 'text-purple-400 border-purple-500/20']">{{
                                    ordem.tipoOrdem }}</span>
                            </div>
                            <p class="text-[10px] text-slate-400">Min. Registro: {{ ordem.minutoRegistro }}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-white text-sm">{{ ordem.quantidade }} UN</p>
                            <p class="text-[10px] text-slate-400">{{ ordem.tipoExecucao === 'mercado' ? 'A Mercado' :
                                `R$ ${parseFloat(ordem.precoReferencia || 0).toFixed(2)}` }}</p>
                        </div>
                    </div>

                    <div v-if="abaOrdens === 'pendentes' || ordem.status === 'pendente'"
                        class="mt-3 pt-3 border-t border-slate-700/60 flex justify-between items-center">
                        <span class="text-[10px] uppercase text-amber-500 font-bold">Aguardando Gatilho</span>
                        <button @click="cancelarOrdem(ordem._id)"
                            class="text-xs text-red-400 hover:text-red-300 font-medium">Cancelar</button>
                    </div>
                    <div v-else class="mt-3 pt-3 border-t border-slate-700/60">
                        <span
                            :class="['text-[10px] uppercase font-bold', ordem.status === 'executada' ? 'text-emerald-500' : 'text-slate-500']">
                            {{ ordem.status === 'executada' ? `Executada no min ${ordem.minutoExecucao}` : 'Cancelada'
                            }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isVendaModalOpen"
            class="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div
                class="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
                <div
                    class="p-5 border-b border-slate-800 flex justify-between items-center bg-purple-900/20 border-l-4 border-l-purple-500">
                    <div>
                        <h3 class="text-lg font-bold text-white flex items-center gap-2"><i data-lucide="tag"
                                class="w-5 h-5 text-purple-400"></i> Vender {{ vendaForm.ticker }}</h3>
                        <p class="text-xs text-slate-400 mt-1">Preço Atual: <strong class="text-white">{{
                                formatarMoeda(vendaForm.precoAtual) }}</strong></p>
                    </div>
                    <button @click="isVendaModalOpen = false"
                        class="text-slate-400 hover:text-white transition-colors"><i data-lucide="x"
                            class="w-5 h-5"></i></button>
                </div>
                <div class="p-6 space-y-4">
                    <div class="bg-[#151E2E] border border-slate-800 rounded-lg p-3 flex justify-between items-center">
                        <span class="text-xs text-slate-400">Em Carteira:</span>
                        <span class="text-sm font-bold text-white">{{ vendaForm.qtdMaxima }} ações</span>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Tipo de
                            Execução</label>
                        <select v-model="vendaForm.tipoExecucao"
                            class="w-full input-fintech text-white px-4 py-3 rounded-lg focus:outline-none text-sm appearance-none cursor-pointer">
                            <option value="mercado">A Mercado (Preço Atual)</option>
                            <option value="condicional">Condicional (Agendada)</option>
                        </select>
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-1.5">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase">Quantidade</label>
                            <button @click="vendaForm.quantidade = vendaForm.qtdMaxima"
                                class="text-[10px] font-bold text-purple-400 hover:text-purple-300 uppercase">Vender
                                Tudo</button>
                        </div>
                        <input v-model="vendaForm.quantidade" type="number"
                            class="w-full input-fintech text-white px-4 py-3 rounded-lg focus:outline-none text-sm">
                    </div>
                    <div v-if="vendaForm.tipoExecucao === 'condicional'">
                        <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Preço Gatilho (Vender
                            se atingir)</label>
                        <div class="relative input-fintech rounded-lg flex items-center">
                            <span class="pl-4 text-slate-500 text-sm">R$</span>
                            <input v-model="vendaForm.precoReferencia" type="number" step="0.01"
                                class="w-full bg-transparent border-none text-white px-2 py-3 focus:outline-none text-sm">
                        </div>
                    </div>
                    <div v-else class="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-slate-400">Retorno Estimado:</span>
                            <span class="text-emerald-400 font-bold">{{ formatarMoeda(vendaForm.quantidade *
                                vendaForm.precoAtual) }}</span>
                        </div>
                    </div>
                    <button @click="confirmarVenda" :disabled="isEnviandoVenda"
                        class="w-full py-3.5 rounded-xl font-bold transition-colors shadow-lg bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2">
                        <i v-if="isEnviandoVenda" data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
                        Confirmar Venda
                    </button>
                </div>
            </div>
        </div>

        <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
            <div v-for="toast in toasts" :key="toast.id"
                :class="['p-4 rounded-xl border shadow-2xl flex items-center gap-3 transition-all duration-300 animate-slide-in', toast.tipo === 'sucesso' ? 'bg-[#0F172A] border-emerald-500/30 text-emerald-400' : 'bg-[#0F172A] border-red-500/30 text-red-400']">
                <i :data-lucide="toast.tipo === 'sucesso' ? 'check-circle' : 'alert-circle'" class="w-5 h-5"></i>
                <p class="text-sm font-medium">{{ toast.mensagem }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// --- ESTADOS DE INTERFACE ---
const isSidebarOpen = ref(false)
const isOrdensOpen = ref(false)
const isVendaModalOpen = ref(false)
const isEnviandoVenda = ref(false)
const isLoading = ref(true)
const abaOrdens = ref('pendentes')
const toasts = ref([])

// --- DADOS DO USUÁRIO ---
const nomeUsuario = ref(localStorage.getItem('usuario_nome') || 'Usuário')
const saldoDisponivel = ref(0)
const minutoAtual = ref(0)
const ativos = ref([])

// Variáveis reativas mapeadas do resumo do Backend
const patrimonioTotal = ref(0)
const totalInvestidoCusto = ref(0)
const lucroGlobal = ref(0)

// NOVO: Cálculo Global de Desempenho
const totalAportado = ref(0)
const resultadoHistorico = ref(0)

const ordensPendentes = ref([])
const ordensHistorico = ref([])

// --- FORMULÁRIO DE VENDA ---
const vendaForm = reactive({
    ticker: '',
    quantidade: 0,
    qtdMaxima: 0,
    precoAtual: 0,
    tipoExecucao: 'mercado',
    precoReferencia: ''
})

// --- PROPRIEDADES COMPUTADAS SEGURAS ---
const ordensFiltradas = computed(() => {
    const listaAtual = abaOrdens.value === 'pendentes' ? ordensPendentes.value : ordensHistorico.value;
    return listaAtual.filter(ordem => ordem && typeof ordem === 'object' && ordem.ticker);
})

// --- FUNÇÕES DE API ---
const getConfig = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

const extrairArraySeguro = (dadosBack) => {
    if (Array.isArray(dadosBack)) return dadosBack;
    if (dadosBack && Array.isArray(dadosBack.ordens)) return dadosBack.ordens;
    if (dadosBack && Array.isArray(dadosBack.transacoes)) return dadosBack.transacoes;
    return [];
}

const carregarDados = async () => {
    isLoading.value = true
    try {
        // ADICIONADO: 4ª Chamada para pegar o extrato da conta corrente e saber o total aportado
        const [resCarteira, resPendentes, resHistorico, resConta] = await Promise.all([
            axios.get('http://localhost:3000/api/carteira', getConfig()),
            axios.get('http://localhost:3000/api/ordens/pendentes', getConfig()),
            axios.get('http://localhost:3000/api/ordens/transacoes', getConfig()),
            axios.get('http://localhost:3000/api/conta/transacoes', getConfig())
        ])

        // Povoa os dados base
        saldoDisponivel.value = parseFloat(resCarteira.data.saldoDisponivel || 0)
        minutoAtual.value = resCarteira.data.minutoAtual || resCarteira.data.minutoReferencia || 0
        ativos.value = resCarteira.data.ativos || []

        const resumo = resCarteira.data.resumo || {}
        patrimonioTotal.value = parseFloat(resumo.patrimonioTotal || 0)
        totalInvestidoCusto.value = parseFloat(resumo.totalInvestido || 0)
        lucroGlobal.value = parseFloat(resumo.lucroPrejuizoTotal || 0)

        // CÁLCULO DO RESULTADO GLOBAL DA CONTA (Histórico)
        const transacoesConta = extrairArraySeguro(resConta.data);
        let totalDepositos = 0;
        let totalRetiradas = 0;

        transacoesConta.forEach(t => {
            if (t.tipo === 'deposito') totalDepositos += parseFloat(t.valor);
            else if (t.tipo === 'retirada') totalRetiradas += parseFloat(t.valor);
        });

        totalAportado.value = totalDepositos - totalRetiradas;
        resultadoHistorico.value = patrimonioTotal.value - totalAportado.value;

        // Povoa as Ordens
        ordensPendentes.value = extrairArraySeguro(resPendentes.data)
        ordensHistorico.value = extrairArraySeguro(resHistorico.data)

    } catch (error) {
        if (error.response?.status === 401) router.push('/login')
        adicionarToast("Erro ao carregar dados da carteira.", "erro")
    } finally {
        isLoading.value = false
        renderIcons()
    }
}

const prepararVenda = (ativo) => {
    vendaForm.ticker = ativo.ticker
    vendaForm.quantidade = ativo.quantidade
    vendaForm.qtdMaxima = ativo.quantidade
    vendaForm.precoAtual = ativo.precoAtual
    vendaForm.tipoExecucao = 'mercado'
    vendaForm.precoReferencia = ''
    isVendaModalOpen.value = true
    renderIcons()
}

const confirmarVenda = async () => {
    if (vendaForm.quantidade <= 0 || vendaForm.quantidade > vendaForm.qtdMaxima) {
        return adicionarToast("Quantidade de venda inválida.", "erro")
    }
    isEnviandoVenda.value = true
    try {
        await axios.post('http://localhost:3000/api/ordens', {
            ticker: vendaForm.ticker,
            tipoOrdem: 'venda',
            tipoExecucao: vendaForm.tipoExecucao,
            quantidade: parseInt(vendaForm.quantidade),
            precoReferencia: vendaForm.tipoExecucao === 'condicional' ? parseFloat(vendaForm.precoReferencia) : null
        }, getConfig())

        adicionarToast("Ordem de venda enviada com sucesso!", "sucesso")
        isVendaModalOpen.value = false
        await carregarDados()

    } catch (error) {
        adicionarToast(error.response?.data?.message || "Erro ao efetuar venda.", "erro")
    } finally {
        isEnviandoVenda.value = false
    }
}

const cancelarOrdem = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/api/ordens/${id}`, getConfig())
        adicionarToast("A ordem foi cancelada com sucesso.", "sucesso")
        await carregarDados()
    } catch (error) {
        adicionarToast(error.response?.data?.message || "Não foi possível cancelar a ordem.", "erro")
    }
}

// --- UTILS ---
const formatarMoeda = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)
const renderIcons = () => nextTick(() => window.lucide?.createIcons())

const adicionarToast = (mensagem, tipo) => {
    const id = Date.now()
    toasts.value.push({ id, mensagem, tipo })
    renderIcons()
    setTimeout(() => toasts.value = toasts.value.filter(t => t.id !== id), 4000)
}

const efetuarLogout = () => {
    localStorage.clear()
    router.push('/login')
}

const abrirOrdens = () => {
    isOrdensOpen.value = true
    renderIcons()
}

onMounted(carregarDados)
onUpdated(renderIcons)
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

.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>