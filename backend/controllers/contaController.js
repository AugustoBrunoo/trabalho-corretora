const Transacao = require('../models/transacaoModel'); 
const Usuario = require('../models/usuarioModel');
const Mercado = require('../models/mercadoModel');
const mercadoService = require('../services/mercadoService');
const auth = require('../auth/auth');

// Lógica para depositar
const depositar = async (req, res) => {
    try {
        // Identifica o usuário logado pelo Token JWT
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Acesso não autorizado. Faça login primeiro." });
        
        const userId = claims.user_id;
        const { valor, descricao } = req.body; 

        if (!valor || isNaN(valor) || valor <= 0) {
            return res.status(400).json({ erro: "O valor do depósito deve ser um número maior que zero." });
        }
        if (!descricao || descricao.trim() === "") {
            return res.status(400).json({ erro: "A descrição do depósito é obrigatória." });
        }

        // Busca o usuário no banco de dados
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        // pega o tempo global
        const minutoGlobal = await mercadoService.obterMinutoGlobal();

        // Atualiza o saldo geral do usuário
        usuario.saldoGeral += Number(valor);
        await usuario.save();

        // Registra o histórico da transação com o saldo resultante e o minuto da simulação
        const novaTransacao = await Transacao.create({
            usuario: userId,
            tipo: 'deposito',
            valor: Number(valor),
            descricao: descricao.trim(),
            minutoSimulacao: minutoGlobal, 
            saldoResultante: usuario.saldoGeral   // Saldo histórico após o depósito
        });

        return res.status(200).json({
            mensagem: "Depósito realizado com sucesso!",
            transacao: novaTransacao,
            saldoAtual: usuario.saldoGeral
        });

    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao processar o depósito.", detalhe: erro.message });
    }
};

// Lógica de retirada (saque)
const retirar = async (req, res) => {
    try {
        // Identifica o usuário logado pelo Token JWT
        const claims = auth.verifyToken(req, res);
        if (!claims) return res.status(401).json({ erro: "Acesso não autorizado. Faça login primeiro." });
        
        const userId = claims.user_id;
        const { valor, descricao } = req.body;

        if (!valor || isNaN(valor) || valor <= 0) {
            return res.status(400).json({ erro: "O valor da retirada deve ser um número maior que zero." });
        }
        if (!descricao || descricao.trim() === "") {
            return res.status(400).json({ erro: "A descrição do retirada é obrigatória." });
        }

        // Busca o usuário no banco de dados
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        // Verifica se o usuário tem saldo suficiente no banco de dados
        if (Number(valor) > usuario.saldoGeral) {
            return res.status(400).json({ 
                erro: "Saldo insuficiente para esta retirada.", 
                saldoAtual: usuario.saldoGeral 
            });
        }

        const minutoGlobal = await mercadoService.obterMinutoGlobal();

        // Reduz o valor do saldo do usuário
        usuario.saldoGeral -= Number(valor);
        await usuario.save();

        // Registra o histórico da retirada
        const novaTransacao = await Transacao.create({
            usuario: userId,
            tipo: 'retirada',
            valor: Number(valor),
            descricao: descricao.trim(),
            minutoSimulacao: minutoGlobal,
            saldoResultante: usuario.saldoGeral
        });

        return res.status(200).json({
            mensagem: "Retirada realizada com sucesso!",
            transacao: novaTransacao,
            saldoRestante: usuario.saldoGeral
        });

    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao processar a retirada.", detalhe: erro.message });
    }
};

// Listar transações e saldo do usuário
const listarTransacoes = async (req, res) => {
    try {
        // Identifica o usuário logado pelo Token JWT
        const claims = auth.verifyToken(req, res);
        if (!claims) {
            return res.status(401).json({ erro: "Acesso não autorizado. Faça login primeiro." });
        }
        const userId = claims.user_id;

        // Busca o usuário para devolver o saldo consolidado atual
        const usuario = await Usuario.findById(userId);
        //  Validação preventiva de existência do usuário antes do mapeamento de propriedades
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado na base de dados." });
        }

        // Busca todas as transações daquele usuário específico em ordem cronológica de inserção
        const transacoes = await Transacao.find({ usuario: userId }).sort({ createdAt: 1 });

        // pega o minuto global
       const minutoGlobal = await mercadoService.obterMinutoGlobal();

        return res.status(200).json({
            saldoAtual: usuario.saldoGeral,
            minutoAtual: minutoGlobal,
            transacoes: transacoes
        });

    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao buscar extrato de transações.", detalhe: erro.message });
    }
};

module.exports = {
    depositar,
    retirada: retirar, 
    listarTransacoes
};