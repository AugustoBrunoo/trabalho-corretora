<template>
  <section id="ecossistema" class="py-24 relative bg-[#0B0F19]">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[500px] bg-indigo-900/10 blur-[120px] pointer-events-none rounded-full"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="overflow-hidden rounded-3xl border border-slate-800/80 shadow-2xl relative bg-[#0F172A]">

        <div class="flex transition-transform duration-700 ease-in-out w-full h-full" :style="{ transform: `translateX(-${slideAtual * 100}%)` }">

          <!-- Slide 1: PrimeBank -->
          <div class="w-full flex-shrink-0 grid lg:grid-cols-2 gap-12 items-center p-8 md:p-14">
            <div>
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-purple-600/20">
                  P
                </div>
                <span class="font-bold text-3xl tracking-tight text-white">Prime<span class="text-purple-500 font-medium">Bank</span></span>
              </div>

              <h2 class="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">O ecossistema financeiro completo.</h2>
              <p class="text-slate-400 text-lg mb-10 leading-relaxed">
                A corretora PrimeInvest foi construída para trabalhar em perfeita sincronia com a sua conta digital PrimeBank. Controle seus cartões, PIX, transferências e investimentos em um único universo seguro e inovador.
              </p>

              <a href="https://primebank-vue.vercel.app/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 font-medium bg-purple-600 hover:bg-purple-500 text-white px-8 py-3.5 rounded-lg transition-all text-base shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transform hover:-translate-y-0.5">
                Conheça o PrimeBank
                <ExternalLink class="w-4 h-4" />
              </a>
            </div>

            <div class="relative flex justify-center items-center mt-10 lg:mt-0 perspective-1000 pb-10 lg:pb-0">
              <div class="absolute w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
              <div class="w-72 h-48 sm:w-80 sm:h-52 bg-gradient-to-tr from-purple-900 via-purple-800 to-slate-900 rounded-2xl shadow-[0_20px_40px_-15px_rgba(147,51,234,0.5)] border border-purple-500/30 p-5 sm:p-6 flex flex-col relative overflow-hidden transform -rotate-12 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-default">
                <div class="flex justify-between items-start z-10 w-full">
                  <Wifi class="w-6 h-6 sm:w-7 sm:h-7 text-white/80 transform rotate-90 ml-1 mt-1" />
                  <span class="text-white font-bold text-xl sm:text-2xl italic tracking-wide">PrimeBank</span>
                </div>
                <div class="z-10 mt-auto mb-2 w-full">
                  <p class="text-white font-mono text-base sm:text-[18px] tracking-[0.10em] sm:tracking-[0.15em] drop-shadow-md">
                    5512 2026 2222 3948
                  </p>
                </div>
                <div class="z-10 mt-auto flex justify-between items-end w-full">
                  <div class="flex flex-col">
                    <span class="text-white/70 text-[10px] sm:text-xs tracking-wider mb-0.5">Titular</span>
                    <span class="text-white font-medium text-base sm:text-lg tracking-wide drop-shadow-sm">Carlos Henrique</span>
                  </div>
                  <div class="flex relative w-[42px] sm:w-[52px] h-6 sm:h-8 mb-1">
                    <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#eb001b] absolute left-0 z-10"></div>
                    <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#f79e1b] absolute right-0 z-20 opacity-85 mix-blend-multiply"></div>
                  </div>
                </div>
                <div class="absolute -right-16 -bottom-16 w-48 h-48 border-[3px] border-white/5 rounded-full pointer-events-none"></div>
                <div class="absolute -right-6 -bottom-6 w-32 h-32 border border-white/5 rounded-full pointer-events-none"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>

          <!-- Slide 2: Indicação -->
          <div class="w-full flex-shrink-0 grid lg:grid-cols-2 gap-12 items-center p-8 md:p-14">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">Cresçam juntos. Construam o amanhã.</h2>
              <p class="text-slate-400 text-lg mb-10 leading-relaxed">
                Investir no futuro é muito melhor quando fazemos isso ao lado de quem queremos bem. Convide seus amigos e familiares para ingressar no nosso ecossistema e ajude quem você ama a trilhar o caminho da independência financeira.
              </p>
              <div class="flex items-center gap-4 text-sm text-slate-300">
                <div class="flex -space-x-3">
                  <div class="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-slate-700 flex items-center justify-center overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=1" alt="User">
                  </div>
                  <div class="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-slate-700 flex items-center justify-center overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=2" alt="User">
                  </div>
                  <div class="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-slate-700 flex items-center justify-center overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=3" alt="User">
                  </div>
                </div>
                <span>Mais de <strong>10.000 pessoas</strong> já investem conosco.</span>
              </div>
            </div>

            <div class="relative flex justify-center items-center mt-6 lg:mt-0 pb-10 lg:pb-0">
              <div class="absolute w-64 h-64 bg-emerald-600/20 rounded-full blur-[80px]"></div>
              <div class="bg-slate-900 border border-slate-700 p-6 sm:p-8 rounded-3xl shadow-2xl relative z-10 flex flex-col items-center w-full max-w-[320px]">
                <h4 class="text-white font-bold text-lg mb-1 text-center">Convite Exclusivo</h4>
                <p class="text-slate-400 text-xs mb-6 text-center">Escaneie o código para abrir a conta</p>

                <div class="bg-white p-3 rounded-2xl mb-6 shadow-inner w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center relative transition-transform hover:scale-105 duration-300">
                  <div class="w-full h-full bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 text-xs">QR CODE</div>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow border border-slate-100">
                      <div class="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs">P</div>
                    </div>
                  </div>
                </div>

                <button v-if="!linkCopiado" @click="copiarLink" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20">
                  <LinkIcon class="w-4 h-4" /> Copiar Link PrimeInvest
                </button>
                <button v-else class="w-full bg-[#151E2E] border border-emerald-500/50 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <CheckCircle2 class="w-5 h-5 text-emerald-400" /> <span class="text-emerald-400 font-bold">Link Copiado!</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- Controles do Carrossel -->
        <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          <button @click="irParaSlide(0)" :class="['w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ring-2', slideAtual === 0 ? 'bg-purple-500 ring-purple-400' : 'bg-slate-600 hover:bg-slate-500 ring-transparent']"></button>
          <button @click="irParaSlide(1)" :class="['w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ring-2', slideAtual === 1 ? 'bg-emerald-500 ring-emerald-400' : 'bg-slate-600 hover:bg-slate-500 ring-transparent']"></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ExternalLink, Wifi, Link as LinkIcon, CheckCircle2 } from '@lucide/vue'

const slideAtual = ref(0)
const linkCopiado = ref(false)
let carrosselInterval = null

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
    iniciarTimerCarrossel()
})

onUnmounted(() => {
    clearInterval(carrosselInterval)
})
</script>