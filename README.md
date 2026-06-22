Simulador de Corretora de Ações

Este projeto refere-se ao Segundo e Terceiro Trabalhos da disciplina de Desenvolvimento de Software para a Web. O objetivo é desenvolver um sistema web
full-stack (Vue.js + Node.js) que atue como uma aproximação de uma corretora eletrônica real para negociação de ações.

Funcionalidades (Requisitos do Projeto)
O sistema foi construído para contemplar 6 requisitos principais de simulação de mercado financeiro:

Autenticação de Usuários: Sistema completo de gestão de contas permitindo login, logout, criação de novas contas, recuperação de senha (para usuários deslogados) e alteração de senha (para usuários logados).

Visualização de Mercado (Home):

Tabela interativa listando ações (Ticker), preço atual, variação nominal ($) e variação percentual (%), com feedback visual de cores (verde para alta, vermelho para baixa).

Simulador de Tempo: Controles de relógio (+1 min e +5 min) que avançam o tempo da simulação, atualizando dinamicamente as cotações baseadas em endpoints JSON.

Células com valores recém-atualizados piscam para chamar a atenção do usuário.

Gerenciamento dinâmico da visualização: usuários iniciam com 10 ações aleatórias e podem adicionar ou remover ativos do painel.

Persistência de estado do relógio entre sessões do usuário.

Sistema de Compra de Ações:

Possibilidade de executar ordens A Mercado (execução imediata no preço atual) ou Ordens Limitadas (execução automática quando o preço atinge/cai abaixo de um valor estipulado).

Validação automática de saldo em conta corrente antes da execução.

Registro de débito no extrato e adição do ativo à carteira.

Gestão de Carteira:

Painel dedicado exibindo as ações em posse do usuário.

Sincronização com o simulador de tempo do mercado.

Cálculo em tempo real de lucros e perdas (PnL), baseado na diferença entre o preço médio de compra e a cotação atual.

Sistema de Venda de Ações:

Execução de ordens de venda A Mercado ou Ordens Limitadas (execução automática quando o preço atinge/supera o valor estipulado).

Registro de crédito no extrato e baixa/atualização do ativo na carteira.

Conta Corrente e Extrato:

Histórico cronológico detalhado de todos os lançamentos financeiros (depósitos, saques, compras e vendas de ações).

Exibição do saldo atualizado após cada operação.

Modais para simulação de Depósitos e Saques manuais (com validação de valores positivos e maiores que zero).

🛠️ Tecnologias Utilizadas
Frontend: Vue.js

Backend: Node.js (com Express/NestJS - ajuste conforme sua implementação)

Integrações: Consumo de API/Endpoints JSON fornecidos pela disciplina.

📡 Endpoints de Dados (Simulação de Mercado)
O sistema consome os seguintes endpoints estáticos disponibilizados via GitHub para simular a flutuação de mercado:

Fechamento Anterior (Tickers disponíveis):
[https://raw.githubusercontent.com/marciobarros/dsw-simulador-corretora/refs/heads/main/tickers.json](https://raw.githubusercontent.com/marciobarros/dsw-simulador-corretora/refs/heads/main/tickers.json)

Cotações por Minuto (0 a 59):
[https://raw.githubusercontent.com/marciobarros/dsw-simulador-corretora/refs/heads/main/](https://raw.githubusercontent.com/marciobarros/dsw-simulador-corretora/refs/heads/main/)[minuto].json

⚙️ Como executar o projeto localmente
1. Clone o repositório

Bash
git clone https://github.com/AugustoBrunoo/trabalho-corretora

2. Configuração do Backend (Node.js)
Bash
cd backend
npm install
npm run dev

3. Configuração do Frontend (Vue.js)
Bash
cd frontend
npm install
npm run serve