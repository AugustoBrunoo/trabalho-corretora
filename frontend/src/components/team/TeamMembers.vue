<template>
  <section class="pb-32 relative z-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">

      <div class="card-fintech rounded-2xl p-6 md:p-8 relative overflow-hidden group flex flex-col md:flex-row items-center md:items-start gap-8">
        <div class="absolute -top-24 -left-24 w-64 h-64 bg-prime-500/5 blur-[60px] rounded-full group-hover:bg-prime-500/10 transition-all duration-500 pointer-events-none"></div>
        <div class="flex-shrink-0 relative z-10">
          <div class="w-40 h-40 md:w-48 md:h-48 rounded-full border-[3px] border-slate-700 overflow-hidden avatar-glow mx-auto shadow-xl">
            <img src="https://media.licdn.com/dms/image/v2/D5603AQH3yNJIFCRGRQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722440199001?e=1782950400&v=beta&t=PvgP3AOnkhrZfyAZtOcWMe45S6IW5t7UFqYp4Em9Cso" alt="Augusto Bruno Menezes Silva" class="w-full h-full object-cover">
          </div>
        </div>
        <div class="flex-grow flex flex-col w-full text-center md:text-left z-10">
          <h3 class="text-2xl font-bold text-white mb-1">Augusto Bruno</h3>
          <p class="text-prime-400 font-medium text-sm mb-5">Especialista Front-End & Dados</p>
          <div class="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
            <span class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-slate-300 border border-slate-700/50 flex items-center gap-1.5"><GraduationCap class="w-3.5 h-3.5" /> UNIRIO</span>
            <span class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-prime-400 border border-prime-500/20 flex items-center gap-1.5"><Award class="w-3.5 h-3.5" /> MONITOR PET</span>
            <span class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-prime-400 border border-prime-500/20 flex items-center gap-1.5"><Atom class="w-3.5 h-3.5" /> JOVENS CIENTISTAS</span>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
            Formado pelo Oracle Next Education (F2 T7). É Monitor Bolsista PET e participa do programa Jovens Cientistas Carioca como Iniciante (Mai/26 - Nov/26). Responsável pela construção da interface interativa em Vue.js e pela integração visual de dados em tempo real da corretora. Graduando em Sistemas de Informação.
          </p>
          
          <div class="pt-5 border-t border-slate-800 flex flex-wrap gap-3 justify-center md:justify-start mt-auto">
            <a href="https://github.com/AugustoBrunoo" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              <span class="text-sm font-medium">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/augustobrunoo/" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span class="text-sm font-medium">LinkedIn</span>
            </a>
            <a href="#" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.384 0 12.03c0 2.128.552 4.137 1.536 5.92L.05 24l6.216-1.632A11.94 11.94 0 0 0 12.031 24c6.645 0 12.03-5.383 12.03-12.03S18.676 0 12.031 0zm0 22.015c-1.84 0-3.612-.474-5.205-1.373l-.372-.21-3.87 1.016 1.034-3.771-.231-.368A9.972 9.972 0 0 1 2.015 12.03c0-5.526 4.498-10.024 10.016-10.024 5.52 0 10.017 4.498 10.017 10.024 0 5.526-4.498 10.024-10.017 10.024zm5.5-7.514c-.302-.15-1.782-.88-2.058-.98-.276-.1-.476-.15-.676.15s-.78.98-.956 1.18c-.176.2-.352.226-.654.076-1.67-.746-2.852-1.644-3.95-3.538-.176-.3-.018-.462.132-.612.136-.136.302-.352.454-.528.152-.176.202-.302.302-.502.1-.2.05-.376-.026-.526-.076-.15-.676-1.632-.926-2.232-.244-.588-.492-.508-.676-.518-.176-.008-.376-.008-.576-.008s-.526.076-.802.376c-.276.3-1.054 1.03-1.054 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.236 5.132 4.538 2.008.868 2.748.746 3.248.646.582-.116 1.782-.728 2.032-1.432.25-.704.25-1.308.176-1.432-.076-.124-.276-.2-.578-.35z"/></svg>
              <span class="text-sm font-medium">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div class="card-fintech rounded-2xl p-6 md:p-8 relative overflow-hidden group flex flex-col md:flex-row items-center md:items-start gap-8">
        <div class="absolute -top-24 -left-24 w-64 h-64 bg-prime-500/5 blur-[60px] rounded-full group-hover:bg-prime-500/10 transition-all duration-500 pointer-events-none"></div>
        <div class="flex-shrink-0 relative z-10">
          <div class="w-40 h-40 md:w-48 md:h-48 rounded-full border-[3px] border-slate-700 overflow-hidden avatar-glow mx-auto shadow-xl">
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQG9Cj1iFkhJAg/profile-displayphoto-shrink_400_400/B4DZT8kWM6G8Ak-/0/1739404175755?e=1782950400&v=beta&t=IGmdlutpxoOgfH1twkBA7bckC9pDr55ePRREU_CQzDs" alt="Nicolas Lima" class="w-full h-full object-cover">
          </div>
        </div>
        <div class="flex-grow flex flex-col w-full text-center md:text-left z-10">
          <h3 class="text-2xl font-bold text-white mb-1">Nicolas Lima</h3>
          <p class="text-prime-400 font-medium text-sm mb-5">Desenvolvedor Back-End</p>
          <div class="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
            <span class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-slate-300 border border-slate-700/50 flex items-center gap-1.5"><GraduationCap class="w-3.5 h-3.5" /> UNIRIO</span>
            <span class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-prime-400 border border-prime-500/20 flex items-center gap-1.5"><Award class="w-3.5 h-3.5" /> MONITOR PET</span>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
            Arquiteto da infraestrutura de servidores e segurança da plataforma. Responsável pela implementação da API RESTful, validações de autenticação em JWT e integração do banco de dados com a lógica de contas do PrimeBank. Monitor Bolsista PET e graduando em Sistemas de Informação.
          </p>
          
          <div class="pt-5 border-t border-slate-800 flex flex-wrap gap-3 justify-center md:justify-start mt-auto">
             <a href="https://github.com/nicolaslima-dev" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              <span class="text-sm font-medium">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/nicolas-lima-b8982425b/" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span class="text-sm font-medium">LinkedIn</span>
            </a>
            <a href="#" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.384 0 12.03c0 2.128.552 4.137 1.536 5.92L.05 24l6.216-1.632A11.94 11.94 0 0 0 12.031 24c6.645 0 12.03-5.383 12.03-12.03S18.676 0 12.031 0zm0 22.015c-1.84 0-3.612-.474-5.205-1.373l-.372-.21-3.87 1.016 1.034-3.771-.231-.368A9.972 9.972 0 0 1 2.015 12.03c0-5.526 4.498-10.024 10.016-10.024 5.52 0 10.017 4.498 10.017 10.024 0 5.526-4.498 10.024-10.017 10.024zm5.5-7.514c-.302-.15-1.782-.88-2.058-.98-.276-.1-.476-.15-.676.15s-.78.98-.956 1.18c-.176.2-.352.226-.654.076-1.67-.746-2.852-1.644-3.95-3.538-.176-.3-.018-.462.132-.612.136-.136.302-.352.454-.528.152-.176.202-.302.302-.502.1-.2.05-.376-.026-.526-.076-.15-.676-1.632-.926-2.232-.244-.588-.492-.508-.676-.518-.176-.008-.376-.008-.576-.008s-.526.076-.802.376c-.276.3-1.054 1.03-1.054 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.236 5.132 4.538 2.008.868 2.748.746 3.248.646.582-.116 1.782-.728 2.032-1.432.25-.704.25-1.308.176-1.432-.076-.124-.276-.2-.578-.35z"/></svg>
              <span class="text-sm font-medium" >WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div class="card-fintech rounded-2xl p-6 md:p-8 relative overflow-hidden group flex flex-col md:flex-row items-center md:items-start gap-8">
        <div class="absolute -top-24 -left-24 w-64 h-64 bg-prime-500/5 blur-[60px] rounded-full group-hover:bg-prime-500/10 transition-all duration-500 pointer-events-none"></div>
        <div class="flex-shrink-0 relative z-10">
          <div class="w-40 h-40 md:w-48 md:h-48 rounded-full border-[3px] border-slate-700 overflow-hidden avatar-glow mx-auto shadow-xl">
            <img src="https://media.licdn.com/dms/image/v2/D5603AQGDEVRtK2KZUw/profile-displayphoto-crop_800_800/B56Z4QMqYAKQAI-/0/1778388216771?e=1783555200&v=beta&t=G341CLnhyzAUcmjQ-U0jZNRiZ1x3L7zWiFWf9ECsqgg" alt="Nilton Junio" class="w-full h-full object-cover">
          </div>
        </div>
        <div class="flex-grow flex flex-col w-full text-center md:text-left z-10">
          <h3 class="text-2xl font-bold text-white mb-1">Nilton Junio</h3>
          <p class="text-prime-400 font-medium text-sm mb-5">Analista de Dados</p>
          <div class="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
            <span class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-slate-300 border border-slate-700/50 flex items-center gap-1.5"><GraduationCap class="w-3.5 h-3.5" /> UNIRIO</span>
            <span class="px-2.5 py-1.5 rounded-md bg-slate-800/80 text-xs font-semibold text-prime-400 border border-prime-500/20 flex items-center gap-1.5"><Award class="w-3.5 h-3.5" /> MONITOR PET</span>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
            Especialista na modelagem e simulação do motor do mercado financeiro. Atua diretamente na estruturação analítica dos dados das ações, no processamento das variações e na precisão do histórico de ordens. Monitor Bolsista PET e graduando em Sistemas de Informação.
          </p>
          
          <div class="pt-5 border-t border-slate-800 flex flex-wrap gap-3 justify-center md:justify-start mt-auto">
             <a href="https://github.com/njbr13" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              <span class="text-sm font-medium">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/nilton-junio-614354354/" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span class="text-sm font-medium">LinkedIn</span>
            </a>
            <a href="#" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-400 hover:text-slate-900 hover:bg-prime-500 hover:border-prime-500 transition-all duration-300 group/btn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.384 0 12.03c0 2.128.552 4.137 1.536 5.92L.05 24l6.216-1.632A11.94 11.94 0 0 0 12.031 24c6.645 0 12.03-5.383 12.03-12.03S18.676 0 12.031 0zm0 22.015c-1.84 0-3.612-.474-5.205-1.373l-.372-.21-3.87 1.016 1.034-3.771-.231-.368A9.972 9.972 0 0 1 2.015 12.03c0-5.526 4.498-10.024 10.016-10.024 5.52 0 10.017 4.498 10.017 10.024 0 5.526-4.498 10.024-10.017 10.024zm5.5-7.514c-.302-.15-1.782-.88-2.058-.98-.276-.1-.476-.15-.676.15s-.78.98-.956 1.18c-.176.2-.352.226-.654.076-1.67-.746-2.852-1.644-3.95-3.538-.176-.3-.018-.462.132-.612.136-.136.302-.352.454-.528.152-.176.202-.302.302-.502.1-.2.05-.376-.026-.526-.076-.15-.676-1.632-.926-2.232-.244-.588-.492-.508-.676-.518-.176-.008-.376-.008-.576-.008s-.526.076-.802.376c-.276.3-1.054 1.03-1.054 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.236 5.132 4.538 2.008.868 2.748.746 3.248.646.582-.116 1.782-.728 2.032-1.432.25-.704.25-1.308.176-1.432-.076-.124-.276-.2-.578-.35z"/></svg>
              <span class="text-sm font-medium">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { GraduationCap, Award, Atom } from '@lucide/vue'
</script>

<style scoped>
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