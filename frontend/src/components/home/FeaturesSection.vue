<template>
  <section id="funcionalidades" class="py-20 bg-[#0F172A] border-y border-slate-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-white mb-4">Desenvolvido para Performance</h2>
        <p class="text-slate-400">Todo o ecossistema da PrimeInvest focado exclusivamente em multiplicar o seu capital com segurança e inteligência.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="card-fintech p-8 rounded-xl">
          <div class="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6">
            <BarChart2 class="w-6 h-6 text-prime-500" />
          </div>
          <h4 class="text-lg font-semibold text-white mb-3">Simulação Realista</h4>
          <p class="text-sm text-slate-400 leading-relaxed">
            Nosso motor de mercado avança no tempo processando dados reais. Uma experiência de Home Broker imersiva e precisa.
          </p>
        </div>

        <div class="card-fintech p-8 rounded-xl">
          <div class="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6">
            <Clock class="w-6 h-6 text-prime-500" />
          </div>
          <h4 class="text-lg font-semibold text-white mb-3">Ordens Automáticas</h4>
          <p class="text-sm text-slate-400 leading-relaxed">
            Configure preços-alvo. Se o ativo atingir o valor definido, o PrimeInvest executa a sua ordem condicional automaticamente.
          </p>
        </div>

        <div class="card-fintech p-8 rounded-xl">
          <div class="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6">
            <Shield class="w-6 h-6 text-prime-500" />
          </div>
          <h4 class="text-lg font-semibold text-white mb-3">Conexão PrimeBank</h4>
          <p class="text-sm text-slate-400 leading-relaxed">
            Depósitos e retiradas perfeitamente sincronizados. Seu saldo da conta corrente integrado instantaneamente à corretora.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BarChart2, Clock, Shield } from '@lucide/vue'
</script>

<style scoped>
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