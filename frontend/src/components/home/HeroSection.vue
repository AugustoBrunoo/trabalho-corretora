<template>
  <section id="plataforma" class="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <div class="text-center lg:text-left">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
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

          <div class="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-slate-400">
            <div class="flex items-center gap-2">
              <CheckCircle2 class="w-5 h-5 text-prime-500" /> Zero corretagem
            </div>
            <div class="flex items-center gap-2">
              <CheckCircle2 class="w-5 h-5 text-prime-500" /> Tempo real
            </div>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div class="absolute -inset-0.5 bg-gradient-to-br from-prime-500/20 to-slate-800 rounded-2xl blur opacity-50">
          </div>

          <div class="relative bg-[#0F172A] rounded-xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            <div class="h-12 border-b border-slate-800/80 px-4 flex items-center justify-between bg-[#0B0F19]">
              <div class="flex items-center gap-2 text-white font-medium text-sm">
                <div class="w-5 h-5 rounded bg-prime-500 flex items-center justify-center text-slate-950 font-bold text-[10px]">P</div>
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
                <h3 class="text-3xl font-bold text-white tracking-tight">{{ formatCurrency(mockBalance) }}</h3>
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
                <div class="w-full bg-prime-500 rounded-t-sm shadow-[0_0_10px_rgba(234,179,8,0.5)]" style="height: 80%"></div>
              </div>

              <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Últimas Movimentações</h4>
              <div class="space-y-2">
                <div class="flex justify-between items-center p-3 rounded-lg bg-[#151E2E] border border-slate-800/60">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold">PT</div>
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
                <div class="flex justify-between items-center p-3 rounded-lg bg-[#151E2E] border border-slate-800/60">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold">VL</div>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { CheckCircle2, TrendingUp } from '@lucide/vue'

const mockBalance = ref(45230.00)
let balanceInterval = null

const formatCurrency = (value) => {
    return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
}

onMounted(() => {
    balanceInterval = setInterval(() => {
        const change = (Math.random() * 4) - 2
        mockBalance.value += change
    }, 4000)
})

onUnmounted(() => {
    clearInterval(balanceInterval)
})
</script>