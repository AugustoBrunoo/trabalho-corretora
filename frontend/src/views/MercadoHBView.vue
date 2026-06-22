<template>
    <div class="bg-[#0B0F19] text-slate-300 font-sans antialiased selection:bg-prime-500 selection:text-slate-900 min-h-screen flex flex-col overflow-x-hidden">

        <!-- Componentes Injetados -->
        <NavbarTopo @abrir-menu="isSidebarOpen = true" />
        
        <MenuLateral 
            :isOpen="isSidebarOpen" 
            :nomeUsuario="nomeUsuario" 
            @fechar="isSidebarOpen = false" 
            @sair="efetuarLogout" 
        />

        <main class="flex-grow flex flex-col max-w-[1400px] w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10 animate-fade-in-up">
            
            <CardsEstatisticas 
                :saldo="saldoDisponivel" 
                :patrimonio="patrimonioInvestido" 
                :relogio="relogioFormatado"
                :isAguardando="isAvancandoTempo"
                :formatarMoeda="formatarMoeda"
                @avancar-minuto="avancarTempo(1)"
                @abrir-ajuste="abrirOffcanvasTempo"
            />

            <TabelaMercado 
                :isLoading="isLoading"
                :acoes="acoesMercado"
                :formatarMoeda="formatarMoeda"
                @abrir-pesquisa="abrirOffcanvasPesquisa"
                @preparar-compra="prepararOrdem('compra', $event)"
                @remover-acao="removerAcao"
            />

        </main>

        <PainelAjusteTempo
            :isOpen="isTempoOpen"
            :minutoAtual="minutoAtual"
            :isAvancando="isAvancandoTempo"
            v-model="tempoAvanco"
            @fechar="isTempoOpen = false"
            @processar="processarAvancoCustomizado"
        />

        <PainelBuscaAtivos
            :isOpen="isSearchOpen"
            :isLoading="isLoadingCatalogo"
            :catalogo="catalogoFiltrado"
            v-model="searchTicker"
            @fechar="isSearchOpen = false"
            @salvar="salvarNovaAcao"
        />

        <ModalOrdem
            :isOpen="isOrdemOpen"
            :ordem="ordemForm"
            :isEnviando="isEnviandoOrdem"
            :formatarMoeda="formatarMoeda"
            @fechar="isOrdemOpen = false"
            @enviar="enviarOrdem"
        />

        <SistemaNotificacoes :toasts="toasts" />

    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import NavbarTopo from '../components/mercado/NavbarTopo.vue'
import MenuLateral from '../components/mercado/MenuLateral.vue'
import CardsEstatisticas from '../components/mercado/CardsEstatisticas.vue'
import TabelaMercado from '../components/mercado/TabelaMercado.vue'
import PainelAjusteTempo from '../components/mercado/PainelAjusteTempo.vue'
import PainelBuscaAtivos from '../components/mercado/PainelBuscaAtivos.vue'
import ModalOrdem from '../components/mercado/ModalOrdem.vue'
import SistemaNotificacoes from '../components/mercado/SistemaNotificacoes.vue'

// IMPORTAÇÕES DOS NOVOS COMPONENTES ISOLADOS (Ajuste o caminho se necessário)


const router = useRouter()

// --- ESTADOS DA INTERFACE ---
const isSidebarOpen = ref(false)
const isTempoOpen = ref(false)
const isSearchOpen = ref(false)
const isOrdemOpen = ref(false)

const isLoading = ref(true)
const isLoadingCatalogo = ref(false)
const isAvancandoTempo = ref(false)
const isEnviandoOrdem = ref(false)
const toasts = ref([])

// --- DADOS DO DOMÍNIO ---
const nomeUsuario = ref(localStorage.getItem('usuario_nome') || 'Usuário')
const saldoDisponivel = ref(0)
const patrimonioInvestido = ref(0)
const minutoAtual = ref(0)
const acoesMercado = ref([])
const tempoAvanco = ref('')

// --- LÓGICA DE CATÁLOGO ---
const searchTicker = ref('')
const catalogoAcoes = ref([])

const catalogoFiltrado = computed(() => {
    if (!searchTicker.value) return catalogoAcoes.value;
    return catalogoAcoes.value.filter(a => a.ticker.toLowerCase().includes(searchTicker.value.toLowerCase()));
})

const ordemForm = reactive({
    ticker: '', tipoOperacao: 'compra', tipoExecucao: 'mercado', quantidade: 100, precoReferencia: '', precoAtual: 0
})

// --- HELPERS ---
const getConfig = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
const formatarMoeda = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)

const relogioFormatado = computed(() => {
    const d = new Date(); d.setHours(14, minutoAtual.value || 0, 0, 0);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
})

const adicionarToast = (mensagem, tipo = 'sucesso') => {
    const id = Date.now()
    toasts.value.push({ id, mensagem, tipo })
    setTimeout(() => toasts.value = toasts.value.filter(t => t.id !== id), 4000)
}

const extrairArraySeguro = (dadosBack) => {
    if (Array.isArray(dadosBack)) return dadosBack;
    if (dadosBack && Array.isArray(dadosBack.acoes)) return dadosBack.acoes;
    if (dadosBack && Array.isArray(dadosBack.ativos)) return dadosBack.ativos;
    if (dadosBack && Array.isArray(dadosBack.data)) return dadosBack.data;
    return [];
}

// --- FUNÇÕES DE API MANTIDAS EXATAMENTE IGUAIS ---
const carregarMercado = async () => {
    isLoading.value = true
    try {
        const [resCarteira, resTempo, resAcoes] = await Promise.all([
            axios.get('http://localhost:3000/api/carteira', getConfig()),
            axios.get('http://localhost:3000/api/mercado/tempo', getConfig()),
            axios.get('http://localhost:3000/api/mercado/acoes', getConfig())
        ])

        saldoDisponivel.value = parseFloat(resCarteira.data.saldoDisponivel || 0)
        patrimonioInvestido.value = parseFloat(resCarteira.data.resumo?.patrimonioAtivos || 0)
        minutoAtual.value = resTempo.data.minutoAtual !== undefined ? resTempo.data.minutoAtual : (resTempo.data.tempo || 0)

        const novasAcoes = extrairArraySeguro(resAcoes.data)

        acoesMercado.value = novasAcoes.map(nova => {
            const antiga = acoesMercado.value.find(a => a.ticker === nova.ticker)
            let animClass = ''
            if (antiga && antiga.preco) {
                if (parseFloat(nova.preco) > parseFloat(antiga.preco)) animClass = 'flash-up'
                else if (parseFloat(nova.preco) < parseFloat(antiga.preco)) animClass = 'flash-down'
            }
            return { ...nova, animClass }
        })

        setTimeout(() => { acoesMercado.value.forEach(a => a.animClass = '') }, 1000)

    } catch (error) {
        if (error.response?.status === 401) router.push('/login')
        adicionarToast("Erro ao conectar com o mercado.", "erro")
    } finally {
        isLoading.value = false
    }
}

const abrirOffcanvasPesquisa = async () => {
    searchTicker.value = ''
    isSearchOpen.value = true

    if (catalogoAcoes.value.length > 0) return;

    isLoadingCatalogo.value = true
    try {
        const minUrl = minutoAtual.value || 0;
        const response = await axios.get(`https://raw.githubusercontent.com/marciobarros/dsw-simulador-corretora/refs/heads/main/${minUrl}.json`);
        const listaBruta = extrairArraySeguro(response.data);

        const setTickers = new Set();
        listaBruta.forEach(item => {
            const tickerReal = item.ticker || item.symbol || item.Ativo;
            if (tickerReal) setTickers.add(tickerReal);
        });

        catalogoAcoes.value = Array.from(setTickers).map(t => ({ ticker: t }));

    } catch (error) {
        adicionarToast("Não foi possível carregar a lista do servidor externo.", "erro");
    } finally {
        isLoadingCatalogo.value = false
    }
}

const avancarTempo = async (minutos) => {
    const minutoInt = parseInt(minutoAtual.value) || 0;
    if (minutoInt >= 59) {
        isTempoOpen.value = false; tempoAvanco.value = '';
        return adicionarToast("Mercado encerrado no minuto 59.", "erro")
    }

    let avancoReal = parseInt(minutos)
    if (minutoInt + avancoReal > 59) avancoReal = 59 - minutoInt

    isAvancandoTempo.value = true
    try {
        await axios.post('http://localhost:3000/api/mercado/tempo', { minutos: avancoReal }, getConfig())
        adicionarToast(`Relógio avançado em ${avancoReal} minuto(s).`, "sucesso")
        catalogoAcoes.value = []
        await carregarMercado()
    } catch (error) {
        adicionarToast(error.response?.data?.message || "Erro ao avançar o tempo.", "erro")
    } finally {
        isAvancandoTempo.value = false; isTempoOpen.value = false; tempoAvanco.value = ''
    }
}

const processarAvancoCustomizado = () => {
    const val = parseInt(tempoAvanco.value)
    if (isNaN(val) || val <= 0) {
        tempoAvanco.value = ''; return adicionarToast("Insira um valor numérico válido.", "erro")
    }
    avancarTempo(val)
}

const abrirOffcanvasTempo = () => { tempoAvanco.value = ''; isTempoOpen.value = true }

const salvarNovaAcao = async (tickerSelecionado) => {
    try {
        await axios.post('http://localhost:3000/api/mercado/acoes', { ticker: tickerSelecionado }, getConfig())
        adicionarToast(`Ação ${tickerSelecionado} adicionada.`, "sucesso")
        isSearchOpen.value = false
        await carregarMercado()
    } catch (error) { adicionarToast(error.response?.data?.message || "Erro ao adicionar.", "erro") }
}

const removerAcao = async (ticker) => {
    if (!confirm(`Parar de acompanhar ${ticker} no painel?`)) return
    try {
        await axios.delete(`http://localhost:3000/api/mercado/acoes/${ticker}`, getConfig())
        adicionarToast(`${ticker} removida.`, "sucesso")
        await carregarMercado()
    } catch (error) { adicionarToast(error.response?.data?.message || "Erro ao remover.", "erro") }
}

const prepararOrdem = (tipo, acao) => {
    ordemForm.tipoOperacao = tipo; ordemForm.ticker = acao.ticker; ordemForm.precoAtual = parseFloat(acao.preco || 0);
    ordemForm.tipoExecucao = 'mercado'; ordemForm.quantidade = 100; ordemForm.precoReferencia = '';
    isOrdemOpen.value = true
}

const enviarOrdem = async () => {
    if (ordemForm.quantidade <= 0) return adicionarToast("Quantidade inválida.", "erro")
    if (ordemForm.tipoExecucao === 'condicional' && (!ordemForm.precoReferencia || ordemForm.precoReferencia <= 0)) {
        return adicionarToast("Defina um gatilho para ordem condicional.", "erro")
    }

    isEnviandoOrdem.value = true
    try {
        await axios.post('http://localhost:3000/api/ordens', {
            ticker: ordemForm.ticker, tipoOrdem: ordemForm.tipoOperacao, tipoExecucao: ordemForm.tipoExecucao,
            quantidade: parseInt(ordemForm.quantidade),
            precoReferencia: ordemForm.tipoExecucao === 'condicional' ? parseFloat(ordemForm.precoReferencia) : null
        }, getConfig())
        adicionarToast(`Ordem registrada com sucesso.`, "sucesso")
        isOrdemOpen.value = false
        await carregarMercado()
    } catch (error) { adicionarToast(error.response?.data?.message || "Erro na ordem.", "erro") } 
    finally { isEnviandoOrdem.value = false }
}

const efetuarLogout = () => { localStorage.clear(); router.push('/login') }

onMounted(carregarMercado)
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
@keyframes fadeInUp { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
</style>