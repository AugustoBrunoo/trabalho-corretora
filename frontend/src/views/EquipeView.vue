<template>
    <div
        class="bg-slate-950 text-slate-300 font-sans antialiased selection:bg-prime-500 selection:text-slate-900 min-h-screen">

        <nav
            :class="['fixed w-full z-50 glass-header transition-all duration-300', { 'border-b border-slate-800': isScrolled }]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20">
                    <router-link to="/" class="flex-shrink-0 flex items-center gap-3 cursor-pointer">
                        <div
                            class="w-9 h-9 rounded-lg bg-prime-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-prime-500/20">
                            P
                        </div>
                        <span class="font-bold text-2xl tracking-tight text-white">Prime<span
                                class="text-prime-500 font-medium">Invest</span></span>
                    </router-link>

                    <div class="hidden md:flex items-center space-x-8">
                        <router-link to="/"
                            class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Voltar ao
                            Início
                        </router-link>
                        <router-link to="/equipe"
                            class="text-sm font-semibold text-prime-500 transition-colors border-b-2 border-prime-500 py-1">Equipe</router-link>

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

            <div v-show="isMenuOpen" class="md:hidden bg-slate-900 border-b border-slate-800 absolute w-full z-40">
                <div class="px-4 pt-2 pb-6 space-y-2">
                    <router-link to="/" @click="isMenuOpen = false"
                        class="block py-3 text-base font-medium text-slate-300 border-b border-slate-800">Voltar ao
                        Início</router-link>
                    <router-link to="/equipe" @click="isMenuOpen = false"
                        class="block py-3 text-base font-bold text-prime-500 border-b border-slate-800">Equipe</router-link>
                    <router-link to="/login" @click="isMenuOpen = false"
                        class="block py-3 text-base font-medium text-slate-300 border-b border-slate-800">Acessar
                        Conta</router-link>
                    <router-link to="/registro" @click="isMenuOpen = false"
                        class="block py-3 mt-4 text-center rounded-md text-base font-bold bg-white text-slate-900">Abrir
                        Conta</router-link>
                </div>
            </div>
        </nav>

        <section class="relative pt-36 pb-20 overflow-hidden">
            <div
                class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-prime-500/5 blur-[120px] rounded-full pointer-events-none">
            </div>
            <div
                class="absolute top-20 -right-20 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none">
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 class="text-prime-500 font-semibold tracking-widest uppercase text-sm mb-4">Projeto Acadêmico</h2>
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                    As mentes por trás da <br> <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-prime-400 to-yellow-200">inovação
                        financeira.</span>
                </h1>
                <p class="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Conheça a equipe de Sistemas de Informação da UNIRIO responsável por desenvolver o motor do
                    PrimeInvest,
                    desde a arquitetura de dados até a experiência imersiva do usuário.
                </p>
            </div>
        </section>

        <section class="pb-32 relative z-10">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">

                <div
                    class="card-fintech rounded-2xl p-6 md:p-8 relative overflow-hidden group flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div
                        class="absolute -top-24 -left-24 w-64 h-64 bg-prime-500/5 blur-[60px] rounded-full group-hover:bg-prime-500/10 transition-all duration-500 pointer-events-none">
                    </div>

                    <div class="flex-shrink-0 relative z-10">
                        <div
                            class="w-40 h-40 md:w-48 md:h-48 rounded-full border-[3px] border-slate-700 overflow-hidden avatar-glow mx-auto shadow-xl">
                            <img src="https://media.licdn.com/dms/image/v2/D5603AQH3yNJIFCRGRQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722440199001?e=1782950400&v=beta&t=PvgP3AOnkhrZfyAZtOcWMe45S6IW5t7UFqYp4Em9Cso"
                                alt="Augusto Bruno Menezes Silva" class="w-full h-full object-cover">
                        </div>
                    </div>

                    <div class="flex-grow flex flex-col w-full text-center md:text-left z-10">
                        <h3 class="text-2xl font-bold text-white mb-1">Augusto Bruno</h3>
                        <p class="text-prime-400 font-medium text-sm mb-5">Especialista Front-End & Dados</p>

                        <div class="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
                            <span
                                class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-slate-300 border border-slate-700/50 flex items-center gap-1.5">
                                <GraduationCap class="w-3.5 h-3.5" /> UNIRIO
                            </span>
                            <span
                                class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-prime-400 border border-prime-500/20 flex items-center gap-1.5">
                                <Award class="w-3.5 h-3.5" /> MONITOR PET
                            </span>
                            <span
                                class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-prime-400 border border-prime-500/20 flex items-center gap-1.5">
                                <Atom class="w-3.5 h-3.5" /> JOVENS CIENTISTAS
                            </span>
                        </div>

                        <p class="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                            Formado pelo Oracle Next Education (F2 T7). É Monitor Bolsista PET e participa do programa
                            Jovens Cientistas Carioca como Iniciante (Mai/26 - Nov/26). Responsável pela construção da
                            interface interativa em Vue.js e pela integração visual de dados em tempo real da corretora.
                            Graduando em Sistemas de Informação.
                        </p>

                        <div
                            class="pt-5 border-t border-slate-800 flex flex-wrap gap-3 justify-center md:justify-start mt-auto">
                            <a href="#"
                                class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                <span class="text-sm font-medium">GitHub</span>
                            </a>
                            <a href="#"
                                class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span class="text-sm font-medium">LinkedIn</span>
                            </a>
                            <a href="#"
                                class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                </svg>
                                <span class="text-sm font-medium">WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div
                    class="card-fintech rounded-2xl p-6 md:p-8 relative overflow-hidden group flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div
                        class="absolute -top-24 -left-24 w-64 h-64 bg-prime-500/5 blur-[60px] rounded-full group-hover:bg-prime-500/10 transition-all duration-500 pointer-events-none">
                    </div>

                    <div class="flex-shrink-0 relative z-10">
                        <div
                            class="w-40 h-40 md:w-48 md:h-48 rounded-full border-[3px] border-slate-700 overflow-hidden avatar-glow mx-auto shadow-xl">
                            <img src="https://media.licdn.com/dms/image/v2/D4D03AQG9Cj1iFkhJAg/profile-displayphoto-shrink_400_400/B4DZT8kWM6G8Ak-/0/1739404175755?e=1782950400&v=beta&t=IGmdlutpxoOgfH1twkBA7bckC9pDr55ePRREU_CQzDs"
                                alt="Nicolas Lima" class="w-full h-full object-cover">
                        </div>
                    </div>

                    <div class="flex-grow flex flex-col w-full text-center md:text-left z-10">
                        <h3 class="text-2xl font-bold text-white mb-1">Nicolas Lima</h3>
                        <p class="text-prime-400 font-medium text-sm mb-5">Desenvolvedor Back-End</p>

                        <div class="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
                            <span
                                class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-slate-300 border border-slate-700/50 flex items-center gap-1.5">
                                <GraduationCap class="w-3.5 h-3.5" /> UNIRIO
                            </span>
                            <span
                                class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-prime-400 border border-prime-500/20 flex items-center gap-1.5">
                                <Award class="w-3.5 h-3.5" /> MONITOR PET
                            </span>
                        </div>

                        <p class="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                            Arquiteto da infraestrutura de servidores e segurança da plataforma. Responsável pela
                            implementação da API RESTful, validações de autenticação em JWT e integração do banco de
                            dados
                            com a lógica de contas do PrimeBank. Monitor Bolsista PET e graduando em Sistemas de
                            Informação.
                        </p>

                        <div
                            class="pt-5 border-t border-slate-800 flex flex-wrap gap-3 justify-center md:justify-start mt-auto">
                            <a href="#"
                                class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                <span class="text-sm font-medium">GitHub</span>
                            </a>
                            <a href="#"
                                class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span class="text-sm font-medium">LinkedIn</span>
                            </a>
                            <a href="#"
                                class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                </svg>
                                <span class="text-sm font-medium">WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div
                    class="card-fintech rounded-2xl p-6 md:p-8 relative overflow-hidden group flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div
                        class="absolute -top-24 -left-24 w-64 h-64 bg-prime-500/5 blur-[60px] rounded-full group-hover:bg-prime-500/10 transition-all duration-500 pointer-events-none">
                    </div>

                    <div class="flex-shrink-0 relative z-10">
                        <div
                            class="w-40 h-40 md:w-48 md:h-48 rounded-full border-[3px] border-slate-700 overflow-hidden avatar-glow mx-auto shadow-xl">
                            <img src="https://media.licdn.com/dms/image/v2/D5603AQGDEVRtK2KZUw/profile-displayphoto-crop_800_800/B56Z4QMqYAKQAI-/0/1778388216771?e=1783555200&v=beta&t=G341CLnhyzAUcmjQ-U0jZNRiZ1x3L7zWiFWf9ECsqgg" alt="Nilton Junio" class="w-full h-full object-cover">
                        </div>
                    </div>

                    <div class="flex-grow flex flex-col w-full text-center md:text-left z-10">
                        <h3 class="text-2xl font-bold text-white mb-1">Nilton Junio</h3>
                        <p class="text-prime-400 font-medium text-sm mb-5">Analista de Dados</p>

                        <div class="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
                            <span
                                class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-slate-300 border border-slate-700/50 flex items-center gap-1.5">
                                <GraduationCap class="w-3.5 h-3.5" /> UNIRIO
                            </span>
                            <span
                                class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-prime-400 border border-prime-500/20 flex items-center gap-1.5">
                                <Award class="w-3.5 h-3.5" /> MONITOR PET
                            </span>
                        </div>

                        <p class="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                            Especialista na modelagem e simulação do motor do mercado financeiro. Atua diretamente na
                            estruturação analítica dos dados das ações, no processamento das variações e na precisão do
                            histórico de ordens. Monitor Bolsista PET e graduando em Sistemas de Informação.
                        </p>

                        <div
                            class="pt-5 border-t border-slate-800 flex flex-wrap gap-3 justify-center md:justify-start mt-auto">
                            <a href="#"
                                class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                <span class="text-sm font-medium">GitHub</span>
                            </a>
                            <a href="#"
                                class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span class="text-sm font-medium">LinkedIn</span>
                            </a>
                            <a href="#"
                                class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                </svg>
                                <span class="text-sm font-medium">WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>

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
                        <router-link to="/" class="hover:text-white transition-colors">Voltar</router-link>
                        <a href="#" class="hover:text-white transition-colors">Segurança</a>
                        <a href="#" class="hover:text-white transition-colors">Termos</a>
                        <a href="#" class="hover:text-white transition-colors">Privacidade</a>
                    </div>
                </div>

                <div
                    class="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-slate-500 text-xs text-center md:text-left">
                        &copy; 2026 PrimeBank & PrimeInvest. Projeto Acadêmico Simulador de Mercado.<br>
                        Plataforma com fins estritamente educacionais desenvolvida por alunos da UNIRIO.
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
import { Menu as MenuIcon, GraduationCap, Award, Atom } from '@lucide/vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.glass-header {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.card-fintech {
    background: #111827;
    border: 1px solid #1F2937;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-fintech:hover {
    border-color: rgba(234, 179, 8, 0.4);
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
}

.avatar-glow {
    transition: all 0.3s ease;
}

.card-fintech:hover .avatar-glow {
    box-shadow: 0 0 25px rgba(234, 179, 8, 0.4);
    border-color: #EAB308;
}
</style>