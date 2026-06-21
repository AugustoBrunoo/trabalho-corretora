import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EquipeView from '../views/EquipeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import RecuperarSenhaView from '../views/RecuperarSenhaView.vue'
import NovaSenhaView from '../views/NovaSenhaView.vue'
import DashboardHBView from '../views/DashboardHBView.vue'
import ContaCorrenteHBView from '../views/ContaCorrenteHBView.vue'
import MinhaCarteiraHBView from '../views/MinhaCarteiraHBView.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/equipe',
        name: 'Equipe',
        component: EquipeView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/registro',
        name: 'Registro',
        component: RegistroView
    },
    {
        path: '/recuperar-senha',
        name: 'Recuperar Senha',
        component: RecuperarSenhaView
    },
    {
        path: '/login/reset',
        name: 'Nova Senha',
        component: NovaSenhaView
    },
    // rotas do homebroker
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardHBView,
        // O 'meta' funciona como uma etiqueta dizendo para o Vue que essa rota é privada
        meta: { requiresAuth: true }
    },
    {
        path: '/conta-corrente',
        name: 'Conta Corrente',
        component: ContaCorrenteHBView, // Importe do jeito que preferir
        meta: { requiresAuth: true }
    },
    {
        path: '/carteira',
        name: 'Carteira',
        component: MinhaCarteiraHBView,
        meta: { requiresAuth: true }
    }
]

/*
,
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/registro',
        name: 'Registro',
        component: RegistroView
    }
*/
const router = createRouter({
    history: createWebHistory(),
    routes
})

// =====================================================================
// 🔒 TRAVA DE SEGURANÇA GLOBAL (NAVIGATION GUARD)
// =====================================================================
// Esse bloco roda toda vez que o usuário tenta mudar de página no navegador.
router.beforeEach((to, from, next) => {
    // Verifica se a rota que o usuário quer ir tem a etiqueta 'requiresAuth'
    const rotaExigeToken = to.matched.some(record => record.meta.requiresAuth)

    // Busca o token JWT salvo no navegador
    const tokenExistente = localStorage.getItem('token')

    if (rotaExigeToken && !tokenExistente) {
        // Se a rota for privada e o usuário NÃO tiver o token, barra ele e manda pro Login!
        console.warn("Acesso negado. Usuário sem token de autenticação.")
        next('/login')
    } else {
        // Se a rota for pública ou ele tiver o token, deixa ele passar normalmente
        next()
    }
})

export default router