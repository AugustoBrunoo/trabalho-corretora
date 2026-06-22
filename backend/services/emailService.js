const { Resend } = require('resend');

// Inicializa o Resend com a chave do .env
const resend = new Resend(process.env.RESEND_API_KEY);

const enviarEmailRecuperacao = async (emailDestino, nomeUsuario, urlSimulada) => {
    try {
        const primeiroNome = nomeUsuario.split(' ')[0];

        const { data, error } = await resend.emails.send({
            // No plano gratuito da Resend, você deve usar obrigatoriamente 'onboarding@resend.dev'
            from: 'onboarding@resend.dev',
            to: emailDestino,
            subject: "🔒 Recuperação de Senha - PrimeInvest",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0F172A; padding: 40px; border-radius: 12px; color: #F8FAFC;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #EAB308; margin: 0; font-size: 28px;">Prime<span style="color: #FFFFFF;">Invest</span></h1>
                    </div>
                    <h2 style="color: #FFFFFF; font-size: 20px; margin-bottom: 15px;">Olá, ${primeiroNome}!</h2>
                    <p style="color: #94A3B8; font-size: 15px; line-height: 1.6;">Recebemos uma solicitação para redefinir a senha da sua conta PrimeInvest.</p>
                    <p style="color: #94A3B8; font-size: 15px; line-height: 1.6;">Clique no botão dourado abaixo para escolher uma nova senha de acesso.</p>

                    <div style="text-align: center; margin: 35px 0;">
                        <a href="${urlSimulada}" style="display: inline-block; background-color: #EAB308; color: #0B0F19; text-decoration: none; font-weight: bold; font-size: 15px; padding: 14px 28px; border-radius: 8px;">
                            Criar Nova Senha
                        </a>
                    </div>

                    <p style="color: #64748B; font-size: 12px; text-align: center; border-top: 1px solid #1E293B; padding-top: 20px; margin-top: 30px;">
                        Se você não solicitou a alteração de senha, ignore este e-mail por segurança.
                    </p>
                </div>
            `
        });

        if (error) {
            console.error("Erro retornado pelo Resend:", error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Erro crítico no serviço de e-mail:", error.message);
        throw new Error("Não foi possível disparar o e-mail de recuperação.");
    }
};

module.exports = { enviarEmailRecuperacao };