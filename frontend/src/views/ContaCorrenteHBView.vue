<template>
    <div class="bg-[#0B0F19] text-slate-300 font-sans antialiased selection:bg-prime-500 selection:text-slate-900 min-h-screen flex flex-col overflow-x-hidden">

        <conta-corrente-navbar @toggle-sidebar="isSidebarOpen = true" />

        <conta-corrente-sidebar 
            :isOpen="isSidebarOpen" 
            :nomeUsuario="nomeUsuario" 
            @close="isSidebarOpen = false" 
            @click-logout="isLogoutModalOpen = true; isSidebarOpen = false" 
        />

        <main class="flex-grow flex flex-col max-w-[900px] w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10 animate-fade-in-up">
            <div class="mb-8">
                <router-link to="/dashboard" class="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-prime-500 transition-colors mb-3 group">
                    <i data-lucide="arrow-left" class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"></i> Voltar ao Dashboard
                </router-link>
                <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <i data-lucide="file-text" class="w-7 h-7 text-prime-500"></i> Conta Corrente
                </h1>
                <p class="text-slate-400 text-sm mt-1">Acompanhe seus depósitos, retiradas e transações de ordens.</p>
            </div>

            <conta-corrente-balance :saldoAtual="saldoAtual" @action="abrirModalTransacao" />

            <conta-corrente-statement :transacoes="transacoes" :isLoading="isLoading" :minutoAtual="minutoAtual" @export-pdf="gerarPDFExtrato" />
        </main>

        <conta-corrente-transaction-modal 
            v-if="isTransacaoModalOpen" 
            :tipo="tipoTransacaoSelecionada" 
            :isProcessando="isProcessandoTransacao" 
            @close="isTransacaoModalOpen = false" 
            @submit="enviarTransacao" 
        />

        <div v-if="isLogoutModalOpen" class="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div class="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center animate-fade-in-up">
                <div class="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4"><i data-lucide="alert-triangle" class="w-7 h-7 text-red-500"></i></div>
                <h3 class="text-xl font-bold text-white mb-2">Sair da Conta?</h3>
                <p class="text-sm text-slate-400 mb-8 leading-relaxed">Sua sessão será encerrada e você precisará fazer login novamente.</p>
                <div class="flex gap-3">
                    <button @click="isLogoutModalOpen = false" class="flex-1 py-3 rounded-lg border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors">Cancelar</button>
                    <button @click="efetuarLogout" class="flex-1 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-500/20">Sair</button>
                </div>
            </div>
        </div>

        <conta-corrente-toasts :toasts="toasts" @close-toast="removerToast" />

        <div id="pdf-container-oculto" style="display: none;"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ContaCorrenteNavbar from '../components/contaCorrente/ContaCorrenteNavbar.vue'
import ContaCorrenteSidebar from '../components/contaCorrente/ContaCorrenteSidebar.vue'
import ContaCorrenteBalance from '../components/contaCorrente/ContaCorrenteBalance.vue'
import ContaCorrenteStatement from '../components/contaCorrente/ContaCorrenteStatement.vue'
import ContaCorrenteTransactionModal from '../components/contaCorrente/ContaCorrenteTransactionModal.vue'
import ContaCorrenteToasts from '../components/contaCorrente/ContaCorrenteToasts.vue'

const router = useRouter()

const isSidebarOpen = ref(false)
const isLogoutModalOpen = ref(false)
const isLoading = ref(true)
const isTransacaoModalOpen = ref(false)
const isProcessandoTransacao = ref(false)
const tipoTransacaoSelecionada = ref('deposito')
const nomeUsuario = ref(localStorage.getItem('usuario_nome') || 'Usuário')

const saldoAtual = ref(0)
const minutoAtual = ref(0)
const transacoes = ref([])
const toasts = ref([])
let toastIdCounter = 0

const API_BASE = 'http://localhost:3000/api/conta'

// Função centralizada para remover o item da lista
const removerToast = (id) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
}

const mostrarToast = (mensagem, tipo = 'sucesso') => {
    const id = toastIdCounter++
    toasts.value.push({ id, mensagem, tipo })
    nextTick(() => { if (window.lucide) window.lucide.createIcons() })
    
    // TEMPO ALTERADO: De 4000ms para 2000ms (2 segundos) para sumir sozinho bem mais rápido!
    setTimeout(() => { removerToast(id) }, 4000)
}

const formatarMoeda = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0)

const getConfig = () => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); throw new Error('Token ausente') }
    return { headers: { Authorization: `Bearer ${token}` } }
}

const fetchTransacoes = async () => {
    isLoading.value = true
    try {
        const { data } = await axios.get(`${API_BASE}/transacoes`, getConfig())
        saldoAtual.value = parseFloat(data.saldoAtual || 0)
        minutoAtual.value = data.minutoAtual || 0
        transacoes.value = data.transacoes.reverse() || []
    } catch (error) {
        if (error.response?.status === 401) efetuarLogout()
        mostrarToast("Erro ao carregar o extrato.", "erro")
    } finally {
        isLoading.value = false
        nextTick(() => { if (window.lucide) window.lucide.createIcons() })
    }
}

const abrirModalTransacao = (tipo) => {
    tipoTransacaoSelecionada.value = tipo
    isTransacaoModalOpen.value = true
}

const enviarTransacao = async ({ valor, descricao }) => {
    if (valor <= 0) return mostrarToast("O valor deve ser maior que zero.", "erro")
    if (tipoTransacaoSelecionada.value === 'retirada' && valor > saldoAtual.value) return mostrarToast("Saldo insuficiente.", "erro")

    isProcessandoTransacao.value = true
    try {
        const url = `${API_BASE}/${tipoTransacaoSelecionada.value}`
        await axios.post(url, { valor: parseFloat(valor), descricao }, getConfig())
        isTransacaoModalOpen.value = false
        mostrarToast(`Operação realizada com sucesso!`, 'sucesso')
        await fetchTransacoes()
    } catch (error) {
        mostrarToast(error.response?.data?.message || "Erro ao processar.", "erro")
    } finally {
        isProcessandoTransacao.value = false
    }
}

const gerarPDFExtrato = () => {
    if (transacoes.value.length === 0 || !window.html2pdf) return
    mostrarToast("Gerando PDF, aguarde...", "info")
    
    const elementoDocumento = document.createElement('div')
    elementoDocumento.style.padding = '40px'
    elementoDocumento.style.fontFamily = 'Helvetica, Arial, sans-serif'
    
    let html = `
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px; border-bottom: 2px solid #EAB308; padding-bottom: 20px;">
            <div style="width: 45px; height: 45px; background-color: #EAB308; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #0B0F19; font-weight: 900; font-size: 24px;">P</div>
            <div>
                <h1 style="margin: 0; font-size: 24px; color: #0F172A;">Prime<span style="color: #EAB308;">Invest</span></h1>
                <p style="margin: 0; font-size: 14px; color: #64748B;">Extrato Oficial de Conta Corrente</p>
            </div>
        </div>
        <div style="margin-bottom: 30px; font-size: 14px; color: #334155;">
            <p style="margin: 0;"><strong>Cliente:</strong> ${nomeUsuario.value}</p>
            <p style="margin: 0;"><strong>Saldo:</strong> ${formatarMoeda(saldoAtual.value)}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background-color: #F1F5F9; border-bottom: 2px solid #94A3B8; text-align: left;">
                    <th style="padding: 12px 10px; font-size: 12px;">Data</th>
                    <th style="padding: 12px 10px; font-size: 12px;">Descrição</th>
                    <th style="padding: 12px 10px; font-size: 12px; text-align: right;">Valor</th>
                </tr>
            </thead>
            <tbody>
    `
    transacoes.value.forEach(t => {
        const isDep = t.tipo === 'deposito'
        html += `
            <tr style="border-bottom: 1px solid #E2E8F0;">
                <td style="padding: 12px 10px; font-size: 12px;">${new Date(t.createdAt).toLocaleDateString('pt-BR')} (Min: ${t.minutoSimulacao}m)</td>
                <td style="padding: 12px 10px; font-size: 12px;">${t.descricao}</td>
                <td style="padding: 12px 10px; font-size: 13px; color: ${isDep ? '#059669' : '#DC2626'}; text-align: right; font-weight: bold;">${isDep ? '+' : '-'} ${formatarMoeda(t.valor)}</td>
            </tr>
        `
    })
    html += `</tbody></table>`
    elementoDocumento.innerHTML = html

    window.html2pdf().set({
        margin: 10, filename: `Extrato_PrimeInvest.pdf`, image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(elementoDocumento).save().then(() => mostrarToast("PDF baixado!", "sucesso"))
}

const efetuarLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario_nome')
    router.push('/login')
}

onMounted(() => {
    fetchTransacoes()
    if (!window.html2pdf) {
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
        script.async = true
        document.head.appendChild(script)
    }
})

onUpdated(() => { nextTick(() => { if (window.lucide) window.lucide.createIcons() }) })
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
@keyframes fadeInUp {
    0% { transform: translateY(10px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
}
</style>