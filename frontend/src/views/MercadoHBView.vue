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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
            <div class="p-6 border-b border-slate-800">
                <div class="flex items-center gap-4 mb-5">
                    <div
                        class="w-12 h-12 rounded-full bg-[#0B0F19] border-2 border-prime-500/50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-sm font-bold text-white">{{ nomeUsuario }}</h3>
                        <p class="text-[10px] text-prime-400 font-medium uppercase">Conta Prime</p>
                    </div>
                </div>
                <button @click="efetuarLogout"
                    class="w-full py-2 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20 shadow-sm flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    Sair da Conta
                </button>
            </div>
            <nav class="flex-1 p-5 space-y-2">
                <router-link to="/dashboard"
                    class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                        <rect width="7" height="9" x="3" y="3" rx="1" />
                        <rect width="7" height="5" x="14" y="3" rx="1" />
                        <rect width="7" height="9" x="14" y="12" rx="1" />
                        <rect width="7" height="5" x="3" y="16" rx="1" />
                    </svg>
                    Início
                </router-link>

                <router-link to="/mercado"
                    class="flex items-center justify-between px-4 py-3 rounded-xl bg-prime-500/10 text-prime-400 border border-prime-500/20 font-semibold">
                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                            <path d="M3 3v18h18" />
                            <path d="m19 9-5 5-4-4-3 3" />
                        </svg>
                        Mercado
                    </div>
                    <div class="w-1.5 h-1.5 rounded-full bg-prime-500"></div>
                </router-link>

                <router-link to="/carteira"
                    class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    Minha Carteira
                </router-link>
                <router-link to="/conta-corrente"
                    class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                        <path d="M10 9H8" />
                        <path d="M16 13H8" />
                        <path d="M16 17H8" />
                    </svg>
                    Conta Corrente
                </router-link>
            </nav>
        </aside>

        <main
            class="flex-grow flex flex-col max-w-[1400px] w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10 animate-fade-in-up">

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                <div
                    class="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex items-center justify-between shadow-lg">
                    <div>
                        <p class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Saldo Conta Corrente
                        </p>
                        <h3 class="text-2xl font-bold text-white tracking-tight">{{ formatarMoeda(saldoDisponivel) }}
                        </h3>
                    </div>
                    <div
                        class="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="w-6 h-6 text-emerald-500">
                            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                    </div>
                </div>

                <div
                    class="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex items-center justify-between shadow-lg">
                    <div>
                        <p class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Patrimônio em Ações
                        </p>
                        <h3 class="text-2xl font-bold text-white tracking-tight">{{ formatarMoeda(patrimonioInvestido)
                        }}</h3>
                    </div>
                    <div
                        class="w-12 h-12 rounded-full bg-prime-500/10 border border-prime-500/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="w-6 h-6 text-prime-500">
                            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                            <path d="M22 12A10 10 0 0 0 12 2v10z" />
                        </svg>
                    </div>
                </div>

                <div
                    class="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-700 rounded-xl p-5 flex items-center justify-between shadow-lg relative overflow-hidden">
                    <div
                        class="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none">
                    </div>
                    <div class="relative z-10">
                        <p
                            class="text-xs font-medium text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="w-3.5 h-3.5">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            Horário Mercado
                        </p>
                        <h3 class="text-2xl font-bold text-white tracking-tight font-mono">{{ relogioFormatado }}</h3>
                    </div>
                    <div class="flex gap-2 relative z-10">
                        <button @click="avancarTempo(1)" :disabled="isAvancandoTempo"
                            class="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-white transition-colors shadow-sm disabled:opacity-50">
                            +1 min
                        </button>
                        <button @click="abrirOffcanvasTempo"
                            class="px-3 py-1.5 rounded bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-xs font-bold text-blue-400 transition-colors shadow-sm flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="w-3.5 h-3.5">
                                <path d="M20 7h-9" />
                                <path d="M14 17H5" />
                                <circle cx="17" cy="17" r="3" />
                                <circle cx="7" cy="7" r="3" />
                            </svg>
                            Ajustar
                        </button>
                    </div>
                </div>
            </div>

            <div
                class="flex-grow flex flex-col bg-[#0F172A] border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                <div
                    class="p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#151E2E]">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-6 bg-prime-500 rounded-full"></div>
                        <h2 class="text-lg font-bold text-white">Mercado de Ações</h2>
                    </div>
                    <button @click="abrirOffcanvasPesquisa"
                        class="w-full sm:w-auto bg-prime-500 hover:bg-prime-400 text-slate-900 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-prime-500/20 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        Explorar Ativos
                    </button>
                </div>

                <div class="overflow-x-auto flex-grow relative">
                    <div v-if="isLoading" class="p-20 text-center text-slate-400">
                        <svg class="animate-spin w-10 h-10 text-prime-500 mx-auto mb-4"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <p>Sincronizando cotações...</p>
                    </div>

                    <table v-else-if="acoesMercado.length > 0" class="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr
                                class="bg-[#0B0F19] text-xs uppercase tracking-wider text-slate-500 border-b border-slate-800">
                                <th class="p-4 font-semibold">Ativo (Ticker)</th>
                                <th class="p-4 font-semibold text-right">Preço Atual</th>
                                <th class="p-4 font-semibold text-right">Variação (R$)</th>
                                <th class="p-4 font-semibold text-right">Variação (%)</th>
                                <th class="p-4 font-semibold text-center">Operar</th>
                                <th class="p-4 font-semibold text-center w-16">Ações</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-slate-800/50">
                            <tr v-for="acao in acoesMercado" :key="acao.ticker"
                                class="hover:bg-slate-800/30 transition-colors group">
                                <td class="p-4 font-bold text-white flex items-center gap-2">
                                    <div
                                        :class="['w-2 h-2 rounded-full', parseFloat(acao.variacaoNominal) >= 0 ? 'bg-emerald-500' : 'bg-red-500']">
                                    </div>
                                    {{ acao.ticker }}
                                </td>

                                <td :class="['p-4 text-right font-medium text-white', acao.animClass]">
                                    {{ formatarMoeda(acao.preco) }}
                                </td>
                                <td
                                    :class="['p-4 text-right font-medium', parseFloat(acao.variacaoNominal) >= 0 ? 'text-emerald-400' : 'text-red-400', acao.animClass]">

                                    <svg v-if="parseFloat(acao.variacaoNominal) >= 0" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 mr-1 inline">
                                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                                        <polyline points="16 7 22 7 22 13" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="w-3.5 h-3.5 mr-1 inline">
                                        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                                        <polyline points="16 17 22 17 22 11" />
                                    </svg>

                                    R$ {{ Math.abs(parseFloat(acao.variacaoNominal)).toFixed(2) }}
                                </td>
                                <td
                                    :class="['p-4 text-right font-bold', parseFloat(acao.variacaoPercentual) >= 0 ? 'text-emerald-400' : 'text-red-400', acao.animClass]">
                                    {{ parseFloat(acao.variacaoPercentual) >= 0 ? '+' : '' }}{{
                                        parseFloat(acao.variacaoPercentual).toFixed(2) }}%
                                </td>

                                <td class="p-4 text-center">
                                    <div
                                        class="flex justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                        <button @click="prepararOrdem('compra', acao)"
                                            class="px-5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded shadow transition-colors">
                                            COMPRAR
                                        </button>
                                    </div>
                                </td>
                                <td class="p-4 text-center">
                                    <button @click="removerAcao(acao.ticker)"
                                        class="text-slate-500 hover:text-red-400 transition-colors"
                                        title="Remover da visualização">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="w-4 h-4 mx-auto">
                                            <path d="M3 6h18" />
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                            <line x1="10" x2="10" y1="11" y2="17" />
                                            <line x1="14" x2="14" y1="11" y2="17" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-else class="flex flex-col items-center justify-center py-20 px-4 text-center">
                        <div
                            class="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="w-8 h-8 text-slate-500">
                                <path d="M3 3v18h18" />
                                <path d="m19 9-5 5-4-4-3 3" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Painel Vazio</h3>
                        <p class="text-slate-400 text-sm max-w-sm mb-4">Adicione ativos clicando no botão acima para
                            monitorar os preços.</p>
                    </div>
                </div>
                <div
                    class="p-3 bg-[#0B0F19] border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
                    <span>Atualização sincronizada com o relógio do simulador.</span>
                    <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                        Variações em relação à abertura.
                    </span>
                </div>
            </div>
        </main>

        <div @click="isTempoOpen = false"
            :class="['fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-300', isTempoOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']">
        </div>
        <aside
            :class="['fixed top-0 right-0 h-full w-full sm:w-[360px] bg-[#0F172A] border-l border-slate-700 shadow-2xl z-[60] transform transition-transform duration-300 flex flex-col', isTempoOpen ? 'translate-x-0' : 'translate-x-full']">
            <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-[#151E2E]/30">
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-prime-500">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span class="font-bold text-white">Avançar Relógio</span>
                </div>
                <button @click="isTempoOpen = false"
                    class="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
            <div class="p-6 flex-1 overflow-y-auto">
                <p class="text-sm text-slate-400 mb-6">O mercado simulado encerra no minuto 59. Defina quantos minutos
                    deseja avançar.</p>
                <div
                    class="bg-[#151E2E] border border-slate-800 rounded-lg p-4 mb-6 flex justify-between items-center shadow-inner">
                    <span class="text-sm font-medium text-slate-400">Minuto Atual:</span>
                    <span class="text-2xl font-bold text-white font-mono">{{ minutoAtual }}</span>
                </div>
                <div class="mb-8">
                    <label class="block text-xs font-medium text-slate-300 mb-2">Minutos a avançar</label>
                    <div class="relative input-fintech rounded-lg flex items-center shadow-sm">
                        <div class="pl-4 text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="w-5 h-5">
                                <polygon points="13 19 22 12 13 5 13 19" />
                                <polygon points="2 19 11 12 2 5 2 19" />
                            </svg>
                        </div>
                        <input v-model="tempoAvanco" type="number" min="1" max="59"
                            class="w-full bg-transparent border-none text-white px-3 py-3.5 focus:outline-none text-sm"
                            placeholder="Ex: 5">
                    </div>
                </div>

                <button @click="processarAvancoCustomizado" :disabled="isAvancandoTempo"
                    class="w-full py-3.5 rounded-lg bg-prime-500 text-slate-900 font-bold hover:bg-prime-400 transition-colors shadow-lg disabled:opacity-50 flex justify-center items-center gap-2">
                    <svg v-if="isAvancandoTempo" class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span>Avançar Tempo</span>
                    <svg v-if="!isAvancandoTempo" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="w-4 h-4">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>

            </div>
        </aside>

        <div @click="isSearchOpen = false"
            :class="['fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-300', isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']">
        </div>
        <aside
            :class="['fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0F172A] border-l border-slate-700 shadow-2xl z-[60] transform transition-transform duration-300 flex flex-col', isSearchOpen ? 'translate-x-0' : 'translate-x-full']">

            <div class="p-5 border-b border-slate-800 flex justify-between items-center bg-[#151E2E]/30">
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-prime-500">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                    <span class="font-bold text-white">Explorar Ativos</span>
                </div>
                <button @click="isSearchOpen = false"
                    class="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-5 border-b border-slate-800">
                <div class="relative input-fintech rounded-lg flex items-center shadow-sm">
                    <div class="pl-4 text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </div>
                    <input v-model="searchTicker" type="text"
                        class="w-full bg-transparent border-none text-white px-3 py-3 focus:outline-none text-sm placeholder-slate-500 uppercase"
                        placeholder="Buscar ação (Ex: PETR4)">
                </div>
            </div>

            <div class="flex-1 overflow-y-auto p-5 no-scrollbar">

                <div v-if="isLoadingCatalogo" class="text-center py-10">
                    <svg class="animate-spin w-6 h-6 text-prime-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <p class="text-xs text-slate-500 mt-3">Buscando base de dados do GitHub...</p>
                </div>

                <div v-else class="space-y-3">
                    <div v-for="acao in catalogoFiltrado" :key="acao.ticker"
                        class="bg-[#151E2E] border border-slate-700/60 rounded-lg p-3 flex justify-between items-center shadow-sm">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400 font-bold">
                                {{ acao.ticker.substring(0, 2) }}
                            </div>
                            <div>
                                <h4 class="font-bold text-white text-sm">{{ acao.ticker }}</h4>
                                <p class="text-[10px] text-slate-400">Ativo Disponível</p>
                            </div>
                        </div>
                        <button @click="salvarNovaAcao(acao.ticker)"
                            class="px-3 py-1.5 bg-prime-500/10 hover:bg-prime-500/20 text-prime-400 border border-prime-500/30 rounded text-xs font-bold transition-colors flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="w-3 h-3">
                                <path d="M5 12h14" />
                                <path d="M12 5v14" />
                            </svg>
                            Adicionar
                        </button>
                    </div>

                    <div v-if="catalogoFiltrado.length === 0" class="text-center py-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="w-8 h-8 text-slate-600 mx-auto mb-2">
                            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                            <path
                                d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                        </svg>
                        <p class="text-sm text-slate-500">Nenhum ativo corresponde à busca.</p>
                    </div>
                </div>
            </div>
        </aside>

        <div v-if="isOrdemOpen"
            class="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div
                class="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
                <div
                    class="p-5 border-b border-slate-800 flex justify-between items-center border-l-4 bg-blue-900/20 border-l-blue-500">
                    <div>
                        <h3 class="text-lg font-bold text-white flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="text-blue-400 w-5 h-5">
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path
                                    d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                            Comprar {{ ordemForm.ticker }}
                        </h3>
                        <p class="text-xs text-slate-400 mt-1">Preço Atual: <strong class="text-white">{{
                            formatarMoeda(ordemForm.precoAtual) }}</strong></p>
                    </div>
                    <button @click="isOrdemOpen = false" class="text-slate-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-6 space-y-4">
                    <div>
                        <label class="block text-xs font-medium text-slate-300 mb-1.5">Tipo de Execução</label>
                        <select v-model="ordemForm.tipoExecucao"
                            class="w-full input-fintech text-white px-4 py-3 rounded-lg focus:outline-none text-sm appearance-none cursor-pointer">
                            <option value="mercado">A Mercado (Preço Atual)</option>
                            <option value="condicional">Condicional (Agendada)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-300 mb-1.5">Quantidade</label>
                        <input v-model="ordemForm.quantidade" type="number" min="1"
                            class="w-full input-fintech text-white px-4 py-3 rounded-lg focus:outline-none text-sm">
                    </div>
                    <div v-if="ordemForm.tipoExecucao === 'condicional'">
                        <label class="block text-xs font-medium text-slate-300 mb-1.5">Preço Desejado (Gatilho)</label>
                        <div class="relative input-fintech rounded-lg flex items-center">
                            <span class="pl-4 text-slate-500 text-sm">R$</span>
                            <input v-model="ordemForm.precoReferencia" type="number" step="0.01"
                                class="w-full bg-transparent border-none text-white px-2 py-3 focus:outline-none text-sm"
                                placeholder="0.00">
                        </div>
                    </div>
                    <div v-else class="bg-[#151E2E] border border-slate-800 rounded-lg p-4">
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-slate-400">Total Estimado:</span>
                            <span class="text-white font-bold">{{ formatarMoeda(ordemForm.quantidade *
                                ordemForm.precoAtual) }}</span>
                        </div>
                    </div>

                    <button @click="enviarOrdem" :disabled="isEnviandoOrdem"
                        class="w-full py-3.5 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 bg-blue-600 hover:bg-blue-500 text-white">
                        <svg v-if="isEnviandoOrdem" class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <span>Confirmar Compra</span>
                    </button>

                </div>
            </div>
        </div>

        <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
            <div v-for="toast in toasts" :key="toast.id"
                :class="['p-4 rounded-xl border shadow-2xl flex items-center gap-3 transition-all duration-300 animate-slide-in pointer-events-auto', toast.tipo === 'sucesso' ? 'bg-[#0F172A] border-emerald-500/30 text-emerald-400' : 'bg-[#0F172A] border-red-500/30 text-red-400']">

                <svg v-if="toast.tipo === 'sucesso'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="w-5 h-5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="m9 11 3 3L22 4" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>

                <p class="text-sm font-medium">{{ toast.mensagem }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

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

// --- LÓGICA DE CATÁLOGO / PESQUISA DIRETO DO GITHUB ---
const searchTicker = ref('')
const catalogoAcoes = ref([])

const catalogoFiltrado = computed(() => {
    if (!searchTicker.value) return catalogoAcoes.value;
    return catalogoAcoes.value.filter(a => a.ticker.toLowerCase().includes(searchTicker.value.toLowerCase()));
})

const ordemForm = reactive({
    ticker: '',
    tipoOperacao: 'compra',
    tipoExecucao: 'mercado',
    quantidade: 100,
    precoReferencia: '',
    precoAtual: 0
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

// --- FUNÇÕES DE API ---
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
        console.error("🕵️ Erro detalhado no carregarMercado:", error)
        if (error.response?.status === 401) router.push('/login')
        adicionarToast("Erro ao conectar com o mercado.", "erro")
    } finally {
        isLoading.value = false
    }
}

// BUSCAR JSON DIRETO DO GITHUB
const abrirOffcanvasPesquisa = async () => {
    searchTicker.value = ''
    isSearchOpen.value = true

    if (catalogoAcoes.value.length > 0) return;

    isLoadingCatalogo.value = true
    try {
        const minUrl = minutoAtual.value || 0;
        const urlGithub = `https://raw.githubusercontent.com/marciobarros/dsw-simulador-corretora/refs/heads/main/${minUrl}.json`;

        const response = await axios.get(urlGithub);
        const listaBruta = extrairArraySeguro(response.data);

        const setTickers = new Set();
        listaBruta.forEach(item => {
            const tickerReal = item.ticker || item.symbol || item.Ativo;
            if (tickerReal) setTickers.add(tickerReal);
        });

        catalogoAcoes.value = Array.from(setTickers).map(t => ({ ticker: t }));

    } catch (error) {
        console.error("Erro ao puxar dados do GitHub:", error);
        adicionarToast("Não foi possível carregar a lista de ativos do servidor externo.", "erro");
    } finally {
        isLoadingCatalogo.value = false
    }
}

// Lógica de Tempo
const avancarTempo = async (minutos) => {

    const minutoInt = parseInt(minutoAtual.value) || 0;

    if (minutoInt >= 59) {
        isTempoOpen.value = false;
        tempoAvanco.value = '';
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
        isAvancandoTempo.value = false
        isTempoOpen.value = false
        tempoAvanco.value = ''
    }
}

const processarAvancoCustomizado = () => {
    const val = parseInt(tempoAvanco.value)
    if (isNaN(val) || val <= 0) {
        tempoAvanco.value = ''
        return adicionarToast("Insira um valor numérico válido maior que zero.", "erro")
    }
    avancarTempo(val)
}

const abrirOffcanvasTempo = () => {
    tempoAvanco.value = ''
    isTempoOpen.value = true
}

const salvarNovaAcao = async (tickerSelecionado) => {
    try {
        await axios.post('http://localhost:3000/api/mercado/acoes', { ticker: tickerSelecionado }, getConfig())
        adicionarToast(`Ação ${tickerSelecionado} adicionada ao painel.`, "sucesso")
        isSearchOpen.value = false
        await carregarMercado()
    } catch (error) {
        adicionarToast(error.response?.data?.message || "Erro ao adicionar ação.", "erro")
    }
}

const removerAcao = async (ticker) => {
    if (!confirm(`Parar de acompanhar ${ticker} no painel?`)) return

    try {
        await axios.delete(`http://localhost:3000/api/mercado/acoes/${ticker}`, getConfig())
        adicionarToast(`${ticker} removida da visualização.`, "sucesso")
        await carregarMercado()
    } catch (error) {
        adicionarToast(error.response?.data?.message || "Erro ao remover ação.", "erro")
    }
}

const prepararOrdem = (tipo, acao) => {
    ordemForm.tipoOperacao = tipo
    ordemForm.ticker = acao.ticker
    ordemForm.precoAtual = parseFloat(acao.preco || 0)
    ordemForm.tipoExecucao = 'mercado'
    ordemForm.quantidade = 100
    ordemForm.precoReferencia = ''
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
            ticker: ordemForm.ticker,
            tipoOrdem: ordemForm.tipoOperacao,
            tipoExecucao: ordemForm.tipoExecucao,
            quantidade: parseInt(ordemForm.quantidade),
            precoReferencia: ordemForm.tipoExecucao === 'condicional' ? parseFloat(ordemForm.precoReferencia) : null
        }, getConfig())

        adicionarToast(`Ordem de compra registrada com sucesso.`, "sucesso")
        isOrdemOpen.value = false
        await carregarMercado()
    } catch (error) {
        adicionarToast(error.response?.data?.message || "Erro ao processar ordem.", "erro")
    } finally {
        isEnviandoOrdem.value = false
    }
}

const efetuarLogout = () => {
    localStorage.clear()
    router.push('/login')
}

// --- LIFECYCLE SEM LUCIDE ---
onMounted(carregarMercado)
// A grande diferença: Removido onUpdated(renderIcons)! A tabela agora voa!
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

.flash-up {
    animation: flashGreen 1s ease-out;
}

.flash-down {
    animation: flashRed 1s ease-out;
}

@keyframes flashGreen {
    0% {
        background-color: rgba(16, 185, 129, 0.4);
    }

    100% {
        background-color: transparent;
    }
}

@keyframes flashRed {
    0% {
        background-color: rgba(239, 68, 68, 0.4);
    }

    100% {
        background-color: transparent;
    }
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: #0B0F19;
}

::-webkit-scrollbar-thumb {
    background: #1F2937;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #374151;
}

.animate-slide-in {
    animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>