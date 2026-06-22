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
                    <button @click="abrirModalSair"
                        class="flex-1 py-2.5 px-3 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20 shadow-sm flex items-center justify-center gap-2">
                        <i data-lucide="log-out" class="w-4 h-4"></i> Sair
                    </button>
                </div>
            </div>

            <nav class="flex-1 overflow-y-auto p-5 space-y-2 no-scrollbar">
                <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Plataforma</p>

                <router-link to="/dashboard" @click="isSidebarOpen = false"
                    class="flex items-center justify-between px-4 py-3.5 rounded-xl bg-prime-500/10 text-prime-400 border border-prime-500/20 font-semibold transition-colors group">
                    <div class="flex items-center gap-3">
                        <i data-lucide="layout-dashboard" class="w-5 h-5"></i> Início
                    </div>
                    <div class="w-1.5 h-1.5 rounded-full bg-prime-500"></div>
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
                    class="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium transition-colors group border border-transparent hover:border-slate-700/50">
                    <div class="flex items-center gap-3">
                        <i data-lucide="file-text"
                            class="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors"></i> Conta
                        Corrente
                    </div>
                    <i data-lucide="chevron-right"
                        class="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors"></i>
                </router-link>
            </nav>
        </aside>

        <main
            class="flex-grow flex flex-col max-w-[1400px] w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10 animate-fade-in-up">

            <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 class="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight flex items-center gap-3">
                        Olá, {{ primeiroNome }}!
                    </h1>
                    <p class="text-slate-400 text-sm md:text-base">Bem-vindo de volta ao seu painel de controle do
                        PrimeInvest.</p>
                </div>
            </div>

            <div v-if="isLoadingDados" class="flex flex-col items-center justify-center py-20">
                <i data-lucide="loader-2" class="w-10 h-10 text-prime-500 animate-spin mb-4"></i>
                <p class="text-slate-400 font-medium">Buscando seus dados financeiros...</p>
            </div>

            <div v-else>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    <div
                        class="lg:col-span-2 bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
                        <div
                            class="absolute -right-20 -top-20 w-64 h-64 bg-prime-500/10 rounded-full blur-[80px] pointer-events-none">
                        </div>

                        <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div class="flex items-center gap-2 mb-2">
                                    <div
                                        class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <i data-lucide="wallet" class="w-4 h-4 text-emerald-500"></i>
                                    </div>
                                    <p class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Saldo da
                                        Conta</p>
                                </div>
                                <h2 class="text-4xl font-bold text-white tracking-tight mb-2">{{
                                    formatarMoeda(saldoConta) }}</h2>
                                <p class="text-xs text-slate-500">Disponível para novos investimentos</p>
                            </div>

                            <div class="md:border-l border-slate-700/60 md:pl-8">
                                <div class="flex items-center gap-2 mb-2">
                                    <div
                                        class="w-8 h-8 rounded-lg bg-prime-500/10 border border-prime-500/20 flex items-center justify-center">
                                        <i data-lucide="pie-chart" class="w-4 h-4 text-prime-500"></i>
                                    </div>
                                    <p class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Patrimônio
                                        Investido</p>
                                </div>
                                <h2 class="text-3xl font-bold text-white tracking-tight mb-2">{{
                                    formatarMoeda(patrimonioInvestido) }}</h2>

                                <div v-if="patrimonioInvestido > 0"
                                    class="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 w-fit px-2 py-1 rounded border border-emerald-500/20">
                                    <i data-lucide="trending-up" class="w-3 h-3"></i> Ativo no mercado
                                </div>
                                <div v-else
                                    class="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-800 w-fit px-2 py-1 rounded border border-slate-700">
                                    Nenhum valor investido ainda
                                </div>
                            </div>
                        </div>

                        <div class="relative z-10 mt-8 pt-6 border-t border-slate-700/60 flex flex-wrap gap-3">
                            <button @click="abrirModalTransacao('deposito')"
                                class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold text-white transition-colors shadow-lg shadow-emerald-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="w-4 h-4">
                                    <path d="M12 17V3" />
                                    <path d="m6 11 6 6 6-6" />
                                    <path d="M19 21H5" />
                                </svg>
                                Depositar
                            </button>
                            <button @click="abrirModalTransacao('retirada')"
                                class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-sm font-bold text-white transition-colors shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="w-4 h-4 text-slate-300">
                                    <path d="m18 9-6-6-6 6" />
                                    <path d="M12 3v14" />
                                    <path d="M5 21h14" />
                                </svg>
                                Retirar
                            </button>
                        </div>
                    </div>

                    <div class="flex flex-col gap-4">
                        <router-link to="/mercado"
                            class="bg-[#151E2E] border border-slate-700 rounded-xl p-5 flex items-center gap-4 card-hover-effect group">
                            <div
                                class="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <i data-lucide="line-chart" class="w-6 h-6 text-blue-500"></i>
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-white font-bold text-base mb-0.5">Mercado (Home Broker)</h3>
                                <p class="text-xs text-slate-400">Acompanhe preços e opere ativos</p>
                            </div>
                            <i data-lucide="chevron-right"
                                class="w-5 h-5 text-slate-600 group-hover:text-prime-500 transition-colors"></i>
                        </router-link>

                        <router-link to="/carteira"
                            class="bg-[#151E2E] border border-slate-700 rounded-xl p-5 flex items-center gap-4 card-hover-effect group">
                            <div
                                class="w-12 h-12 rounded-full bg-prime-500/10 border border-prime-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <i data-lucide="briefcase" class="w-6 h-6 text-prime-500"></i>
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-white font-bold text-base mb-0.5">Minha Carteira</h3>
                                <p class="text-xs text-slate-400">Gerencie suas posições e lucros</p>
                            </div>
                            <i data-lucide="chevron-right"
                                class="w-5 h-5 text-slate-600 group-hover:text-prime-500 transition-colors"></i>
                        </router-link>

                        <router-link to="/conta-corrente"
                            class="bg-[#151E2E] border border-slate-700 rounded-xl p-5 flex items-center gap-4 card-hover-effect group">
                            <div
                                class="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <i data-lucide="file-text" class="w-6 h-6 text-emerald-500"></i>
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-white font-bold text-base mb-0.5">Conta Corrente</h3>
                                <p class="text-xs text-slate-400">Ver extrato e transferências</p>
                            </div>
                            <i data-lucide="chevron-right"
                                class="w-5 h-5 text-slate-600 group-hover:text-prime-500 transition-colors"></i>
                        </router-link>
                    </div>
                </div>

                <div class="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h2 class="text-xl font-bold text-white flex items-center gap-2">
                            <i data-lucide="star" class="w-5 h-5 text-prime-500"></i> Suas Maiores Posições
                        </h2>
                        <p class="text-sm text-slate-400 mt-1">Os ativos com maior valor investido na sua carteira.</p>
                    </div>
                    <router-link v-if="acoes.length > 0" to="/carteira"
                        class="text-sm font-medium text-prime-500 hover:text-prime-400 flex items-center gap-1 group transition-colors">
                        Ver carteira completa
                        <i data-lucide="arrow-right"
                            class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"></i>
                    </router-link>
                </div>

                <div v-if="acoes.length === 0"
                    class="bg-[#0F172A] border border-slate-800 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center mt-6">
                    <div
                        class="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700">
                        <i data-lucide="box-select" class="w-8 h-8 text-slate-500"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Sua carteira está vazia</h3>
                    <p class="text-slate-400 text-sm max-w-md mb-6">
                        Você ainda não possui nenhum ativo investido. Acesse o Home Broker, analise o mercado e faça sua
                        primeira operação de compra.
                    </p>
                    <router-link to="/mercado"
                        class="bg-prime-500 hover:bg-prime-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                        <i data-lucide="line-chart" class="w-5 h-5"></i> Explorar o Mercado
                    </router-link>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div v-for="acao in acoes" :key="acao.ticker"
                        class="bg-[#0F172A] border border-slate-800 hover:border-slate-600 rounded-xl p-5 transition-colors">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-10 h-10 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-sm text-slate-300 font-bold">
                                    {{ acao.ticker.substring(0, 2) }}
                                </div>
                                <div>
                                    <h4 class="font-bold text-white text-lg leading-none mb-1">{{ acao.ticker }}</h4>
                                    <p class="text-xs text-slate-400 leading-none">{{ acao.quantidade }} ações</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <span
                                    :class="parseFloat(acao.resultado) >= 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'"
                                    class="text-xs font-bold px-2 py-1 rounded border flex items-center gap-1">
                                    <i :data-lucide="parseFloat(acao.resultado) >= 0 ? 'trending-up' : 'trending-down'"
                                        class="w-3 h-3"></i>
                                    {{ formatarMoeda(parseFloat(acao.resultado)) }}
                                </span>
                            </div>
                        </div>
                        <div class="pt-4 border-t border-slate-800/80 flex justify-between items-end">
                            <div>
                                <p class="text-xs text-slate-500 mb-0.5">Valor Total</p>
                                <p class="font-bold text-white">{{ formatarMoeda(parseFloat(acao.valorTotalAtual)) }}
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-xs text-slate-500 mb-0.5">Preço Médio</p>
                                <p class="font-medium text-slate-300">{{ formatarMoeda(parseFloat(acao.precoMedio)) }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <router-link to="/mercado"
                        class="bg-[#0F172A] border border-slate-800 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center group transition-colors hover:border-prime-500/50 cursor-pointer">
                        <div
                            class="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-3 group-hover:bg-prime-500/10 transition-colors">
                            <i data-lucide="plus"
                                class="w-6 h-6 text-slate-500 group-hover:text-prime-500 transition-colors"></i>
                        </div>
                        <h4 class="font-medium text-slate-300 mb-1">Diversifique sua carteira</h4>
                        <p class="text-xs text-slate-500">Adicione novas ações ao seu portfólio.</p>
                    </router-link>
                </div>
            </div>
        </main>

        <div v-if="isLogoutModalOpen"
            class="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div
                class="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center animate-fade-in-up">
                <div
                    class="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-red-500">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <line x1="12" x2="12" y1="9" y2="13" />
                        <line x1="12" x2="12.01" y1="17" y2="17" />
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-white mb-2 tracking-tight">Sair da Conta?</h3>
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

        <div v-if="isTransacaoModalOpen"
            class="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div
                class="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">

                <div
                    :class="['p-5 border-b border-slate-800 flex justify-between items-center', transacao.tipo === 'deposito' ? 'bg-emerald-900/20 border-l-4 border-l-emerald-500' : 'bg-slate-800/50 border-l-4 border-l-slate-400']">
                    <h3 class="text-lg font-bold text-white flex items-center gap-2">
                        <svg v-if="transacao.tipo === 'deposito'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="w-5 h-5 text-emerald-400">
                            <path d="M12 17V3" />
                            <path d="m6 11 6 6 6-6" />
                            <path d="M19 21H5" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="w-5 h-5 text-slate-300">
                            <path d="m18 9-6-6-6 6" />
                            <path d="M12 3v14" />
                            <path d="M5 21h14" />
                        </svg>

                        {{ transacao.tipo === 'deposito' ? 'Fazer Depósito' : 'Fazer Retirada' }}
                    </h3>
                    <button @click="isTransacaoModalOpen = false"
                        class="text-slate-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
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

                                <svg v-if="isProcessandoTransacao" class="animate-spin w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="w-4 h-4">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>

                                {{ isProcessandoTransacao ? 'Processando...' : (transacao.tipo === 'deposito' ?
                                'Confirmar Depósito' : 'Confirmar Retirada') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
            <transition-group name="toast-anim">
                <div v-for="toast in toasts" :key="toast.id" :class="['flex items-center gap-3 bg-[#0F172A] border p-4 rounded-xl shadow-xl pointer-events-auto',
                    toast.tipo === 'erro' ? 'border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]' :
                        toast.tipo === 'info' ? 'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]' :
                            'border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]']">

                    <svg v-if="toast.tipo === 'erro'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="w-5 h-5 text-red-500">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="12" />
                        <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    <svg v-else-if="toast.tipo === 'info'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="w-5 h-5 text-blue-500">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="16" y2="12" />
                        <line x1="12" x2="12.01" y1="8" y2="8" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="w-5 h-5 text-emerald-500">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                    </svg>

                    <p class="text-sm font-medium text-white pr-4">{{ toast.mensagem }}</p>
                </div>
            </transition-group>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// ==========================================
// ESTADOS REATIVOS DA INTERFACE
// ==========================================
const isSidebarOpen = ref(false)
const isLogoutModalOpen = ref(false)
const isLoadingDados = ref(true)

// Estados do Modal de Transações
const isTransacaoModalOpen = ref(false)
const isProcessandoTransacao = ref(false)

const transacao = reactive({
    tipo: 'deposito', // ou 'retirada'
    valor: '',
    descricao: ''
})

// Estados para Toasts
const toasts = ref([])
let toastIdCounter = 0

// ==========================================
// ESTADOS REATIVOS DE DADOS DO USUÁRIO
// ==========================================
const nomeUsuario = ref(localStorage.getItem('usuario_nome') || 'Usuário')
const primeiroNome = computed(() => nomeUsuario.value.trim().split(' ')[0])

const saldoConta = ref(0)
const patrimonioInvestido = ref(0)
const acoes = ref([])

// 🔗 ROTAS DE API
const API_URL_RESUMO = 'http://localhost:3000/api/carteira'
const API_BASE_CONTA = 'http://localhost:3000/api/conta'
const API_DEPOSITO = `${API_BASE_CONTA}/deposito`
const API_RETIRADA = `${API_BASE_CONTA}/retirada`

const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0)
}

const getConfig = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        router.push('/login')
        throw new Error('Token ausente')
    }
    return { headers: { Authorization: `Bearer ${token}` } }
}

// ==========================================
// LÓGICA DE INTEGRAÇÃO COM O BACKEND
// ==========================================

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
        console.error("Erro ao buscar dados do dashboard:", error)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            efetuarLogout()
        }
    } finally {
        isLoadingDados.value = false
        nextTick(() => { if (window.lucide) window.lucide.createIcons() })
    }
}

const abrirModalTransacao = (tipo) => {
    transacao.tipo = tipo
    transacao.valor = ''
    transacao.descricao = ''
    isTransacaoModalOpen.value = true
}

const enviarTransacao = async () => {
    if (transacao.valor <= 0) {
        return mostrarToast("O valor deve ser maior que zero.", "erro")
    }

    if (transacao.tipo === 'retirada' && transacao.valor > saldoConta.value) {
        return mostrarToast("Saldo insuficiente para esta retirada.", "erro")
    }

    isProcessandoTransacao.value = true

    try {
        const payload = {
            valor: parseFloat(transacao.valor),
            descricao: transacao.descricao
        }

        const url = transacao.tipo === 'deposito' ? API_DEPOSITO : API_RETIRADA

        // Faz o post no backend
        await axios.post(url, payload, getConfig())

        isTransacaoModalOpen.value = false
        mostrarToast(`${transacao.tipo === 'deposito' ? 'Depósito' : 'Retirada'} realizado com sucesso!`, 'sucesso')

        // Atualiza a tela (vai chamar a API de novo para pegar o saldo fresco)
        await fetchDadosDashboard()

    } catch (error) {
        console.error(`Erro ao efetuar ${transacao.tipo}:`, error)
        const msg = error.response?.data?.message || `Erro ao processar a ${transacao.tipo}.`
        mostrarToast(msg, "erro")
    } finally {
        isProcessandoTransacao.value = false
    }
}

// ==========================================
// FUNÇÕES DE CONTROLE GERAIS
// ==========================================
const abrirModalSair = () => {
    isSidebarOpen.value = false
    isLogoutModalOpen.value = true
    nextTick(() => { if (window.lucide) window.lucide.createIcons() })
}

const efetuarLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario_nome')
    router.push('/login')
}

onMounted(() => {
    fetchDadosDashboard()
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

.card-hover-effect {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover-effect:hover {
    transform: translateY(-4px);
    border-color: rgba(234, 179, 8, 0.4);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(234, 179, 8, 0.1);
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