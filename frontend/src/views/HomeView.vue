<template>
    <div
        class="bg-slate-950 text-slate-300 font-sans antialiased selection:bg-prime-500 selection:text-slate-900 overflow-x-hidden min-h-screen">

        <nav
            :class="['fixed w-full z-50 glass-header transition-all duration-300', { 'border-b border-slate-800': isScrolled }]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20">
                    <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer">
                        <div
                            class="w-9 h-9 rounded-lg bg-prime-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-prime-500/20">
                            P
                        </div>
                        <span class="font-bold text-2xl tracking-tight text-white">Prime<span
                                class="text-prime-500 font-medium">Invest</span></span>
                    </div>

                    <div class="hidden md:flex items-center space-x-8">
                        <a href="#plataforma" @click.prevent="scrollToSection('plataforma')"
                            class="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">A
                            Plataforma</a>
                        <a href="#funcionalidades" @click.prevent="scrollToSection('funcionalidades')"
                            class="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">Vantagens</a>
                        <a href="#ecossistema" @click.prevent="scrollToSection('ecossistema')"
                            class="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">Ecossistema</a>
                            
                        <router-link to="/equipe"
                            class="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">Equipe</router-link>

                        <div class="flex items-center space-x-5 ml-4 border-l border-slate-800 pl-6">
                            <router-link to="/login"
                                class="text-sm font-medium text-slate-300 hover:text-white transition-colors">Acessar
                                Conta</router-link>
                            <router-link to="/registro"
                                class="text-sm font-semibold bg-white hover:bg-slate-200 text-slate-900 px-5 py-2.5 rounded-md transition-all">
                                Abrir Conta
                            </router-link>
                        </div>
                    </div>

                    <div class="md:hidden flex items-center">
                        <button @click="toggleMenu" class="text-slate-400 hover:text-white focus:outline-none">
                            <MenuIcon class="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <div v-show="isMenuOpen" class="md:hidden bg-slate-900 border-b border-slate-800">
                <div class="px-4 pt-2 pb-6 space-y-2">
                    <a href="#plataforma" @click.prevent="scrollToSection('plataforma')"
                        class="block py-3 text-base font-medium text-slate-300 border-b border-slate-800 cursor-pointer">A
                        Plataforma</a>
                    <a href="#funcionalidades" @click.prevent="scrollToSection('funcionalidades')"
                        class="block py-3 text-base font-medium text-slate-300 border-b border-slate-800 cursor-pointer">Vantagens</a>
                    <a href="#ecossistema" @click.prevent="scrollToSection('ecossistema')"
                        class="block py-3 text-base font-medium text-slate-300 border-b border-slate-800 cursor-pointer">Ecossistema</a>
                    <a href="#equipe" @click.prevent="scrollToSection('equipe')"
                        class="block py-3 text-base font-medium text-slate-300 border-b border-slate-800 cursor-pointer">Equipe</a>
                    <router-link to="/login"
                        class="block py-3 text-base font-medium text-slate-300 border-b border-slate-800">Acessar
                        Conta</router-link>
                    <router-link to="/registro"
                        class="block py-3 mt-4 text-center rounded-md text-base font-bold bg-white text-slate-900">Abrir
                        Conta</router-link>
                </div>
            </div>
        </nav>

        <div class="w-full bg-[#0B0F19] border-b border-slate-800/50 pt-20 overflow-hidden flex">
            <div class="flex whitespace-nowrap animate-marquee py-2.5 items-center text-xs font-medium tracking-wide">
                <span class="mx-6 text-slate-500">IBOV <span class="text-emerald-500 ml-1 font-semibold">128.450 ▲
                        0.8%</span></span>
                <span class="mx-6 text-slate-500">PETR4 <span class="text-emerald-500 ml-1 font-semibold">R$ 38,40 ▲
                        1.2%</span></span>
                <span class="mx-6 text-slate-500">VALE3 <span class="text-rose-500 ml-1 font-semibold">R$ 62,10 ▼
                        0.5%</span></span>
                <span class="mx-6 text-slate-500">ITUB4 <span class="text-emerald-500 ml-1 font-semibold">R$ 33,80 ▲
                        0.3%</span></span>
                <span class="mx-6 text-slate-500">WEGE3 <span class="text-emerald-500 ml-1 font-semibold">R$ 39,20 ▲
                        2.1%</span></span>
                <span class="mx-6 text-slate-500">BBAS3 <span class="text-emerald-500 ml-1 font-semibold">R$ 57,90 ▲
                        0.7%</span></span>
                <span class="mx-6 text-slate-500">IBOV <span class="text-emerald-500 ml-1 font-semibold">128.450 ▲
                        0.8%</span></span>
                <span class="mx-6 text-slate-500">PETR4 <span class="text-emerald-500 ml-1 font-semibold">R$ 38,40 ▲
                        1.2%</span></span>
                <span class="mx-6 text-slate-500">VALE3 <span class="text-rose-500 ml-1 font-semibold">R$ 62,10 ▼
                        0.5%</span></span>
                <span class="mx-6 text-slate-500">ITUB4 <span class="text-emerald-500 ml-1 font-semibold">R$ 33,80 ▲
                        0.3%</span></span>
                <span class="mx-6 text-slate-500">WEGE3 <span class="text-emerald-500 ml-1 font-semibold">R$ 39,20 ▲
                        2.1%</span></span>
                <span class="mx-6 text-slate-500">BBAS3 <span class="text-emerald-500 ml-1 font-semibold">R$ 57,90 ▲
                        0.7%</span></span>
            </div>
        </div>

        <section id="plataforma" class="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="grid lg:grid-cols-2 gap-16 items-center">

                    <div class="text-center lg:text-left">
                        <h1
                            class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Do seu banco <br />
                            direto para a <span class="text-prime-500">bolsa de valores.</span>
                        </h1>

                        <p class="text-lg text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            A solidez do PrimeBank agora em uma plataforma de investimentos completa. Opere no mercado
                            simulado com dados em tempo real, ordens automáticas e gestão de portfólio profissional.
                        </p>

                        <div class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <router-link to="/registro"
                                class="w-full sm:w-auto text-center font-medium bg-prime-500 hover:bg-prime-400 text-slate-900 px-8 py-3.5 rounded-lg transition-colors text-base">
                                Começar a Investir
                            </router-link>
                            <a href="#plataforma" @click.prevent="scrollToSection('plataforma')"
                                class="w-full sm:w-auto text-center font-medium bg-transparent border border-slate-700 hover:bg-slate-800 text-white px-8 py-3.5 rounded-lg transition-colors text-base flex justify-center items-center gap-2 cursor-pointer">
                                Entenda como funciona
                            </a>
                        </div>

                        <div
                            class="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-slate-400">
                            <div class="flex items-center gap-2">
                                <CheckCircle2 class="w-5 h-5 text-prime-500" /> Zero corretagem
                            </div>
                            <div class="flex items-center gap-2">
                                <CheckCircle2 class="w-5 h-5 text-prime-500" /> Tempo real
                            </div>
                        </div>
                    </div>

                    <div class="relative mx-auto w-full max-w-lg lg:max-w-none">
                        <div
                            class="absolute -inset-0.5 bg-gradient-to-br from-prime-500/20 to-slate-800 rounded-2xl blur opacity-50">
                        </div>

                        <div
                            class="relative bg-[#0F172A] rounded-xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
                            <div
                                class="h-12 border-b border-slate-800/80 px-4 flex items-center justify-between bg-[#0B0F19]">
                                <div class="flex items-center gap-2 text-white font-medium text-sm">
                                    <div
                                        class="w-5 h-5 rounded bg-prime-500 flex items-center justify-center text-slate-950 font-bold text-[10px]">
                                        P</div>
                                    Minha Carteira
                                </div>
                                <div class="flex gap-2">
                                    <div class="w-2 h-2 rounded-full bg-slate-700"></div>
                                    <div class="w-2 h-2 rounded-full bg-slate-700"></div>
                                    <div class="w-2 h-2 rounded-full bg-slate-700"></div>
                                </div>
                            </div>

                            <div class="p-6">
                                <p class="text-sm text-slate-400 mb-1">Patrimônio Líquido</p>
                                <div class="flex items-end gap-3 mb-8">
                                    <h3 class="text-3xl font-bold text-white tracking-tight">{{
                                        formatCurrency(mockBalance) }}</h3>
                                    <span class="text-emerald-500 text-sm font-medium mb-1 flex items-center">
                                        <TrendingUp class="w-4 h-4 mr-1" /> 2.4%
                                    </span>
                                </div>

                                <div class="h-32 flex items-end gap-1.5 mb-8">
                                    <div class="w-full bg-slate-800 rounded-t-sm" style="height: 30%"></div>
                                    <div class="w-full bg-slate-800 rounded-t-sm" style="height: 40%"></div>
                                    <div class="w-full bg-slate-800 rounded-t-sm" style="height: 35%"></div>
                                    <div class="w-full bg-slate-800 rounded-t-sm" style="height: 50%"></div>
                                    <div class="w-full bg-slate-800 rounded-t-sm" style="height: 60%"></div>
                                    <div class="w-full bg-slate-800 rounded-t-sm" style="height: 55%"></div>
                                    <div class="w-full bg-prime-500 rounded-t-sm shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                                        style="height: 80%"></div>
                                </div>

                                <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Últimas
                                    Movimentações</h4>
                                <div class="space-y-2">
                                    <div
                                        class="flex justify-between items-center p-3 rounded-lg bg-[#151E2E] border border-slate-800/60">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold">
                                                PT</div>
                                            <div>
                                                <p class="font-medium text-sm text-white">PETR4</p>
                                                <p class="text-xs text-slate-500">Compra a mercado</p>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <p class="font-medium text-sm text-white">100 cotas</p>
                                            <p class="text-xs text-emerald-500">R$ 3.840,00</p>
                                        </div>
                                    </div>
                                    <div
                                        class="flex justify-between items-center p-3 rounded-lg bg-[#151E2E] border border-slate-800/60">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold">
                                                VL</div>
                                            <div>
                                                <p class="font-medium text-sm text-white">VALE3</p>
                                                <p class="text-xs text-slate-500">Ordem Condicional</p>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <p class="font-medium text-sm text-slate-400">Pendente</p>
                                            <p class="text-xs text-slate-500">R$ 60,00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section id="funcionalidades" class="py-20 bg-[#0F172A] border-y border-slate-800/50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-2xl mx-auto mb-16">
                    <h2 class="text-3xl font-bold text-white mb-4">Desenvolvido para Performance</h2>
                    <p class="text-slate-400">Todo o ecossistema da PrimeInvest focado exclusivamente em multiplicar o
                        seu capital com segurança e inteligência.</p>
                </div>

                <div class="grid md:grid-cols-3 gap-6">
                    <div class="card-fintech p-8 rounded-xl">
                        <div class="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6">
                            <BarChart2 class="w-6 h-6 text-prime-500" />
                        </div>
                        <h4 class="text-lg font-semibold text-white mb-3">Simulação Realista</h4>
                        <p class="text-sm text-slate-400 leading-relaxed">
                            Nosso motor de mercado avança no tempo processando dados reais. Uma experiência de Home
                            Broker imersiva e precisa.
                        </p>
                    </div>

                    <div class="card-fintech p-8 rounded-xl">
                        <div class="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6">
                            <Clock class="w-6 h-6 text-prime-500" />
                        </div>
                        <h4 class="text-lg font-semibold text-white mb-3">Ordens Automáticas</h4>
                        <p class="text-sm text-slate-400 leading-relaxed">
                            Configure preços-alvo. Se o ativo atingir o valor definido, o PrimeInvest executa a sua
                            ordem condicional automaticamente.
                        </p>
                    </div>

                    <div class="card-fintech p-8 rounded-xl">
                        <div class="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6">
                            <Shield class="w-6 h-6 text-prime-500" />
                        </div>
                        <h4 class="text-lg font-semibold text-white mb-3">Conexão PrimeBank</h4>
                        <p class="text-sm text-slate-400 leading-relaxed">
                            Depósitos e retiradas perfeitamente sincronizados. Seu saldo da conta corrente integrado
                            instantaneamente à corretora.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section id="ecossistema" class="py-24 relative bg-[#0B0F19]">
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[500px] bg-indigo-900/10 blur-[120px] pointer-events-none rounded-full">
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="overflow-hidden rounded-3xl border border-slate-800/80 shadow-2xl relative bg-[#0F172A]">

                    <div class="flex transition-transform duration-700 ease-in-out w-full h-full"
                        :style="{ transform: `translateX(-${slideAtual * 100}%)` }">

                        <div class="w-full flex-shrink-0 grid lg:grid-cols-2 gap-12 items-center p-8 md:p-14">
                            <div>
                                <div class="flex items-center gap-3 mb-6">
                                    <div
                                        class="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-purple-600/20">
                                        P</div>
                                    <span class="font-bold text-3xl tracking-tight text-white">Prime<span
                                            class="text-purple-500 font-medium">Bank</span></span>
                                </div>

                                <h2 class="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">O ecossistema
                                    financeiro completo.</h2>
                                <p class="text-slate-400 text-lg mb-10 leading-relaxed">
                                    A corretora PrimeInvest foi construída para trabalhar em perfeita sincronia com a
                                    sua conta digital PrimeBank. Controle seus cartões, PIX, transferências e
                                    investimentos em um único universo seguro e inovador.
                                </p>

                                <a href="https://primebank-vue.vercel.app/" target="_blank" rel="noopener noreferrer"
                                    class="inline-flex items-center gap-3 font-medium bg-purple-600 hover:bg-purple-500 text-white px-8 py-3.5 rounded-lg transition-all text-base shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transform hover:-translate-y-0.5">
                                    Conheça o PrimeBank
                                    <ExternalLink class="w-4 h-4" />
                                </a>
                            </div>

                            <div
                                class="relative flex justify-center items-center mt-10 lg:mt-0 perspective-1000 pb-10 lg:pb-0">
                                <div class="absolute w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
                                <div
                                    class="w-72 h-48 sm:w-80 sm:h-52 bg-gradient-to-tr from-purple-900 via-purple-800 to-slate-900 rounded-2xl shadow-[0_20px_40px_-15px_rgba(147,51,234,0.5)] border border-purple-500/30 p-5 sm:p-6 flex flex-col relative overflow-hidden transform -rotate-12 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-default">
                                    <div class="flex justify-between items-start z-10 w-full">
                                        <Wifi
                                            class="w-6 h-6 sm:w-7 sm:h-7 text-white/80 transform rotate-90 ml-1 mt-1" />
                                        <span
                                            class="text-white font-bold text-xl sm:text-2xl italic tracking-wide">PrimeBank</span>
                                    </div>
                                    <div class="z-10 mt-auto mb-2 w-full">
                                        <p
                                            class="text-white font-mono text-base sm:text-[18px] tracking-[0.10em] sm:tracking-[0.15em] drop-shadow-md">
                                            5512 2026 2222 3948</p>
                                    </div>
                                    <div class="z-10 mt-auto flex justify-between items-end w-full">
                                        <div class="flex flex-col">
                                            <span
                                                class="text-white/70 text-[10px] sm:text-xs tracking-wider mb-0.5">Titular</span>
                                            <span
                                                class="text-white font-medium text-base sm:text-lg tracking-wide drop-shadow-sm">Carlos
                                                Henrique</span>
                                        </div>
                                        <div class="flex relative w-[42px] sm:w-[52px] h-6 sm:h-8 mb-1">
                                            <div
                                                class="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#eb001b] absolute left-0 z-10">
                                            </div>
                                            <div
                                                class="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#f79e1b] absolute right-0 z-20 opacity-85 mix-blend-multiply">
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="absolute -right-16 -bottom-16 w-48 h-48 border-[3px] border-white/5 rounded-full pointer-events-none">
                                    </div>
                                    <div
                                        class="absolute -right-6 -bottom-6 w-32 h-32 border border-white/5 rounded-full pointer-events-none">
                                    </div>
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full flex-shrink-0 grid lg:grid-cols-2 gap-12 items-center p-8 md:p-14">
                            <div>
                                <h2 class="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">Cresçam juntos.
                                    Construam o amanhã.</h2>
                                <p class="text-slate-400 text-lg mb-10 leading-relaxed">
                                    Investir no futuro é muito melhor quando fazemos isso ao lado de quem queremos bem.
                                    Convide seus amigos e familiares para ingressar no nosso ecossistema e ajude quem
                                    você ama a trilhar o caminho da independência financeira.
                                </p>
                                <div class="flex items-center gap-4 text-sm text-slate-300">
                                    <div class="flex -space-x-3">
                                        <div
                                            class="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-slate-700 flex items-center justify-center overflow-hidden">
                                            <img src="https://i.pravatar.cc/100?img=1" alt="User">
                                        </div>
                                        <div
                                            class="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-slate-700 flex items-center justify-center overflow-hidden">
                                            <img src="https://i.pravatar.cc/100?img=2" alt="User">
                                        </div>
                                        <div
                                            class="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-slate-700 flex items-center justify-center overflow-hidden">
                                            <img src="https://i.pravatar.cc/100?img=3" alt="User">
                                        </div>
                                    </div>
                                    <span>Mais de <strong>10.000 pessoas</strong> já investem conosco.</span>
                                </div>
                            </div>

                            <div class="relative flex justify-center items-center mt-6 lg:mt-0 pb-10 lg:pb-0">
                                <div class="absolute w-64 h-64 bg-emerald-600/20 rounded-full blur-[80px]"></div>
                                <div
                                    class="bg-slate-900 border border-slate-700 p-6 sm:p-8 rounded-3xl shadow-2xl relative z-10 flex flex-col items-center w-full max-w-[320px]">
                                    <h4 class="text-white font-bold text-lg mb-1 text-center">Convite Exclusivo</h4>
                                    <p class="text-slate-400 text-xs mb-6 text-center">Escaneie o código para abrir a
                                        conta</p>

                                    <div
                                        class="bg-white p-3 rounded-2xl mb-6 shadow-inner w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center relative transition-transform hover:scale-105 duration-300">
                                        <div
                                            class="w-full h-full bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 text-xs">
                                            QR CODE</div>
                                        <div class="absolute inset-0 flex items-center justify-center">
                                            <div
                                                class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow border border-slate-100">
                                                <div
                                                    class="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                                                    P</div>
                                            </div>
                                        </div>
                                    </div>

                                    <button v-if="!linkCopiado" @click="copiarLink"
                                        class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20">
                                        <LinkIcon class="w-4 h-4" /> Copiar Link PrimeInvest
                                    </button>
                                    <button v-else
                                        class="w-full bg-[#151E2E] border border-emerald-500/50 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                                        <CheckCircle2 class="w-5 h-5 text-emerald-400" /> <span
                                            class="text-emerald-400 font-bold">Link Copiado!</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                        <button @click="irParaSlide(0)"
                            :class="['w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ring-2', slideAtual === 0 ? 'bg-purple-500 ring-purple-400' : 'bg-slate-600 hover:bg-slate-500 ring-transparent']"></button>
                        <button @click="irParaSlide(1)"
                            :class="['w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ring-2', slideAtual === 1 ? 'bg-emerald-500 ring-emerald-400' : 'bg-slate-600 hover:bg-slate-500 ring-transparent']"></button>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 bg-[#0F172A] border-t border-slate-800/50">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-5">Pronto para dar o próximo passo?</h2>
                <p class="text-slate-400 mb-10">Crie sua conta PrimeInvest hoje e acesse a plataforma de simulação de
                    mercado mais avançada.</p>
                <router-link to="/registro"
                    class="inline-block font-medium bg-prime-500 hover:bg-prime-400 text-slate-900 px-8 py-3.5 rounded-lg transition-colors text-base shadow-lg shadow-prime-500/20">
                    Criar Conta Gratuita
                </router-link>
            </div>
        </section>

        <footer class="bg-[#0B0F19] pt-12 pb-8 border-t border-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    <div class="flex items-center gap-2">
                        <div
                            class="w-6 h-6 rounded bg-prime-500 flex items-center justify-center text-slate-950 font-bold text-[10px]">
                            P</div>
                        <span class="font-bold text-lg tracking-tight text-white">Prime<span
                                class="text-prime-500 font-medium">Invest</span></span>
                    </div>

                    <div class="flex gap-6 text-sm text-slate-400">
                        <a href="#" class="hover:text-white transition-colors">Sobre</a>
                        <a href="#" class="hover:text-white transition-colors">Segurança</a>
                        <a href="#" class="hover:text-white transition-colors">Termos</a>
                        <a href="#" class="hover:text-white transition-colors">Privacidade</a>
                    </div>
                </div>

                <div
                    class="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-slate-500 text-xs text-center md:text-left">
                        &copy; 2026 PrimeBank & PrimeInvest. Projeto Acadêmico Simulador de Mercado.<br>
                        Plataforma com fins estritamente educacionais.
                    </p>
                    <div class="flex gap-4">
                        <a href="#" class="text-slate-500 hover:text-white transition-colors">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4">
                                </path>
                                <path d="M9 18c-4.51 2-5-2-7-2"></path>
                            </svg>
                        </a>

                        <a href="#" class="text-slate-500 hover:text-white transition-colors">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                                </path>
                                <rect width="4" height="12" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
    Menu as MenuIcon,
    CheckCircle2,
    TrendingUp,
    BarChart2,
    Clock,
    Shield,
    ExternalLink,
    Wifi,
    Link as LinkIcon
} from '@lucide/vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const mockBalance = ref(45230.00)
const slideAtual = ref(0)
const linkCopiado = ref(false)

let balanceInterval = null
let carrosselInterval = null

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
        const navHeight = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - navHeight

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })
    }
    isMenuOpen.value = false
}

const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
}

const formatCurrency = (value) => {
    return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const irParaSlide = (index) => {
    slideAtual.value = index
    reiniciarTimerCarrossel()
}

const iniciarTimerCarrossel = () => {
    carrosselInterval = setInterval(() => {
        slideAtual.value = (slideAtual.value + 1) % 2
    }, 8000)
}

const reiniciarTimerCarrossel = () => {
    clearInterval(carrosselInterval)
    iniciarTimerCarrossel()
}

const copiarLink = () => {
    const link = "https://front-primeinvest.vercel.app/"
    navigator.clipboard.writeText(link).then(() => {
        linkCopiado.value = true
    }).catch(() => {
        const tempInput = document.createElement("textarea")
        document.body.appendChild(tempInput)
        tempInput.value = link
        tempInput.select()
        document.execCommand("copy")
        document.body.removeChild(tempInput)
        linkCopiado.value = true
    }).finally(() => {
        setTimeout(() => {
            linkCopiado.value = false
        }, 3000)
    })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)

    balanceInterval = setInterval(() => {
        const change = (Math.random() * 4) - 2
        mockBalance.value += change
    }, 4000)

    iniciarTimerCarrossel()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    clearInterval(balanceInterval)
    clearInterval(carrosselInterval)
})
</script>

<style scoped>
.glass-header {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
}

.card-fintech {
    background: #111827;
    border: 1px solid #1F2937;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease;
}

.card-fintech:hover {
    border-color: #374151;
    transform: translateY(-2px);
}
</style>
