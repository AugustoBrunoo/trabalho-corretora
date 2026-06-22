<template>
    <div class="bg-[#0B0F19] text-slate-300 font-sans antialiased selection:bg-prime-500 selection:text-slate-900 min-h-screen flex flex-col overflow-x-hidden">
        
        <carteira-navbar @toggle-sidebar="isSidebarOpen = true" />
        
        <carteira-sidebar 
            :is-open="isSidebarOpen" 
            :nome-usuario="nomeUsuario" 
            @close="isSidebarOpen = false" 
            @logout="efetuarLogout" 
        />

        <main class="flex-grow flex flex-col max-w-[1400px] w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
            
            <carteira-summary 
                :patrimonio-total="patrimonioTotal"
                :minuto-atual="minutoAtual"
                :total-investido-custo="totalInvestidoCusto"
                :lucro-global="lucroGlobal"
                :resultado-historico="resultadoHistorico"
            />

            <carteira-table
                :is-loading="isLoading"
                :ativos="ativos"
                @abrir-ordens="abrirOrdens"
                @vender-ativo="prepararVenda"
            />

        </main>

        <carteira-orders-drawer 
            :is-open="isOrdensOpen"
            :ordens-pendentes="ordensPendentes"
            :ordens-historico="ordensHistorico"
            @close="isOrdensOpen = false"
            @cancelar-ordem="cancelarOrdem"
        />

        <carteira-sell-modal 
            :is-open="isVendaModalOpen"
            :ativo="ativoSelecionado"
            :is-enviando-venda="isEnviandoVenda"
            @close="isVendaModalOpen = false"
            @confirmar="confirmarVenda"
        />

        <carteira-toasts :toasts="toasts" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import CarteiraNavbar from '../components/minhaCarteira/CarteiraNavbar.vue'
import CarteiraSidebar from '../components/minhaCarteira/CarteiraSidebar.vue'
import CarteiraSummary from '../components/minhaCarteira/CarteiraSummary.vue'
import CarteiraTable from '../components/minhaCarteira/CarteiraTable.vue'
import CarteiraOrdersDrawer from '../components/minhaCarteira/CarteiraOrdersDrawer.vue'
import CarteiraSellModal from '../components/minhaCarteira/CarteiraSellModal.vue'
import CarteiraToasts from '../components/minhaCarteira/CarteiraToasts.vue'

// Importações dos novos componentes locais e isolados


const router = useRouter()

// --- ESTADOS DE INTERFACE ---
const isSidebarOpen = ref(false)
const isOrdensOpen = ref(false)
const isVendaModalOpen = ref(false)
const isEnviandoVenda = ref(false)
const isLoading = ref(true)
const toasts = ref([])

// --- DADOS DO USUÁRIO ---
const nomeUsuario = ref(localStorage.getItem('usuario_nome') || 'Usuário')
const saldoDisponivel = ref(0)
const minutoAtual = ref(0)
const ativos = ref([])

const patrimonioTotal = ref(0)
const totalInvestidoCusto = ref(0)
const lucroGlobal = ref(0)
const totalAportado = ref(0)
const resultadoHistorico = ref(0)

const ordensPendentes = ref([])
const ordensHistorico = ref([])
const ativoSelecionado = ref(null)

// --- MÉTODOS DE CONTROLE DA API ---
const getConfig = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

const extrairArraySeguro = (dadosBack) => {
    if (Array.isArray(dadosBack)) return dadosBack
    if (dadosBack && Array.isArray(dadosBack.ordens)) return dadosBack.ordens
    if (dadosBack && Array.isArray(dadosBack.transacoes)) return dadosBack.transacoes
    return []
}

const carregarDados = async () => {
    isLoading.value = true
    try {
        const [resCarteira, resPendentes, resHistorico, resConta] = await Promise.all([
            axios.get('http://localhost:3000/api/carteira', getConfig()),
            axios.get('http://localhost:3000/api/ordens/pendentes', getConfig()),
            axios.get('http://localhost:3000/api/ordens/transacoes', getConfig()),
            axios.get('http://localhost:3000/api/conta/transacoes', getConfig())
        ])

        saldoDisponivel.value = parseFloat(resCarteira.data.saldoDisponivel || 0)
        minutoAtual.value = resCarteira.data.minutoAtual || resCarteira.data.minutoReferencia || 0
        ativos.value = resCarteira.data.ativos || []

        const resumo = resCarteira.data.resumo || {}
        patrimonioTotal.value = parseFloat(resumo.patrimonioTotal || 0)
        totalInvestidoCusto.value = parseFloat(resumo.totalInvestido || 0)
        lucroGlobal.value = parseFloat(resumo.lucroPrejuizoTotal || 0)

        const transacoesConta = extrairArraySeguro(resConta.data)
        let totalDepositos = 0
        let totalRetiradas = 0

        transacoesConta.forEach(t => {
            if (t.tipo === 'deposito') totalDepositos += parseFloat(t.valor)
            else if (t.tipo === 'retirada') totalRetiradas += parseFloat(t.valor)
        })

        totalAportado.value = totalDepositos - totalRetiradas
        resultadoHistorico.value = patrimonioTotal.value - totalAportado.value

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
    ativoSelecionado.value = ativo
    isVendaModalOpen.value = true
    renderIcons()
}

const confirmarVenda = async (formularioEnviado) => {
    if (formularioEnviado.quantidade <= 0 || formularioEnviado.quantidade > ativoSelecionado.value.quantidade) {
        return adicionarToast("Quantidade de venda inválida.", "erro")
    }
    isEnviandoVenda.value = true
    try {
        await axios.post('http://localhost:3000/api/ordens', {
            ticker: ativoSelecionado.value.ticker,
            tipoOrdem: 'venda',
            tipoExecucao: formularioEnviado.tipoExecucao,
            quantidade: parseInt(formularioEnviado.quantidade),
            precoReferencia: formularioEnviado.tipoExecucao === 'condicional' ? parseFloat(formularioEnviado.precoReferencia) : null
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