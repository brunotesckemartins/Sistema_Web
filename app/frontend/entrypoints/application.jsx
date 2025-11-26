import React from 'react';
import { createRoot } from 'react-dom/client';

import Home from '../components/Home';
import ProdutoDetalhe from '../components/ProdutoDetalhe';
import Carrinho from '../components/Carrinho';
import Login from '../components/Login';
import Cadastro from '../components/Cadastro';
import AdminProdutosIndex from '../components/AdminProdutosIndex';
import AdminProdutoForm from '../components/AdminProdutoForm';
import AdminEventosIndex from '../components/AdminEventosIndex';
import AdminEventoForm from '../components/AdminEventoForm';
import AdminUsuariosIndex from '../components/AdminUsuariosIndex';
import AdminUsuarioForm from '../components/AdminUsuarioForm';
import AdminPedidosIndex from '../components/AdminPedidosIndex';
import AdminPedidoForm from '../components/AdminPedidoForm';
import AdminPromocoesIndex from '../components/AdminPromocoesIndex';
import AdminPromocaoForm from '../components/AdminPromocaoForm';
import Perfil from '../components/Perfil';
import '../stylesheets/Pagamento.css';

import '../stylesheets/Navbar.css';
import '../stylesheets/AdminIndex.css';
import '../stylesheets/AdminProdutoForm.css';
import '../stylesheets/Cadastro.css';
import '../stylesheets/Carrinho.css';
import '../stylesheets/Home.css';
import '../stylesheets/Login.css';
import '../stylesheets/ProdutoDetalhe.css';
import '../stylesheets/Perfil.css';

const csrfToken = document.querySelector("meta[name='csrf-token']")?.content;
const originalFetch = fetch;
window.fetch = function (url, options) {
    options = options || {};
    options.headers = options.headers || {};
    options.headers['X-CSRF-Token'] = csrfToken;
    options.headers['Accept'] = 'application/json';

    return originalFetch(url, options);
};

document.addEventListener('DOMContentLoaded', () => {

    const homeRootEl = document.getElementById('react-home-root');
    if (homeRootEl) {
        const allProps = JSON.parse(homeRootEl.dataset.props);
        const root = createRoot(homeRootEl);
        root.render(<Home {...allProps} />);
    }

    const productRootEl = document.getElementById('react-product-detail-root');
    if (productRootEl) {
        const allProps = JSON.parse(productRootEl.dataset.props);
        const root = createRoot(productRootEl);
        root.render(<ProdutoDetalhe {...allProps} />);
    }

    const cartRootEl = document.getElementById('react-cart-root');
    if (cartRootEl) {
        const allProps = JSON.parse(cartRootEl.dataset.props);
        const root = createRoot(cartRootEl);
        root.render(<Carrinho {...allProps} />);
    }

    const loginRootEl = document.getElementById('react-login-root');
    if (loginRootEl) {
        const root = createRoot(loginRootEl);
        root.render(<Login />);
    }

    const cadastroRootEl = document.getElementById('react-cadastro-root');
    if (cadastroRootEl) {
        const root = createRoot(cadastroRootEl);
        root.render(<Cadastro />);
    }

    const hamburger = document.getElementById('hamburger-button');
    const navMenu = document.getElementById('nav-links-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        navMenu.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    const adminProdutosIndexEl = document.getElementById('react-admin-produtos-index-root');
    if (adminProdutosIndexEl) {
        const allProps = JSON.parse(adminProdutosIndexEl.dataset.props);
        const root = createRoot(adminProdutosIndexEl);
        root.render(<AdminProdutosIndex {...allProps} />);
    }

    const adminProdutoFormEl = document.getElementById('react-admin-produto-form-root');
    if (adminProdutoFormEl) {
        const allProps = JSON.parse(adminProdutoFormEl.dataset.props);
        const root = createRoot(adminProdutoFormEl);
        root.render(<AdminProdutoForm {...allProps} />);
    }

    const adminEventosIndexEl = document.getElementById('react-admin-eventos-index-root');
    if (adminEventosIndexEl) {
        const allProps = JSON.parse(adminEventosIndexEl.dataset.props);
        const root = createRoot(adminEventosIndexEl);
        root.render(<AdminEventosIndex {...allProps} />);
    }

    const adminEventoFormEl = document.getElementById('react-admin-evento-form-root');
    if (adminEventoFormEl) {
        const allProps = JSON.parse(adminEventoFormEl.dataset.props);
        const root = createRoot(adminEventoFormEl);
        root.render(<AdminEventoForm {...allProps} />);
    }

    const adminUsuariosIndexEl = document.getElementById('react-admin-usuarios-index-root');
    if (adminUsuariosIndexEl) {
        const allProps = JSON.parse(adminUsuariosIndexEl.dataset.props);
        const root = createRoot(adminUsuariosIndexEl);
        root.render(<AdminUsuariosIndex {...allProps} />);
    }

    const adminUsuarioFormEl = document.getElementById('react-admin-usuario-form-root');
    if (adminUsuarioFormEl) {
        const allProps = JSON.parse(adminUsuarioFormEl.dataset.props);
        const root = createRoot(adminUsuarioFormEl);
        root.render(<AdminUsuarioForm {...allProps} />);
    }

    const adminPedidosIndexEl = document.getElementById('react-admin-pedidos-index-root');
    if (adminPedidosIndexEl) {
        const allProps = JSON.parse(adminPedidosIndexEl.dataset.props);
        const root = createRoot(adminPedidosIndexEl);
        root.render(<AdminPedidosIndex {...allProps} />);
    }

    const adminPedidoFormEl = document.getElementById('react-admin-pedido-form-root');
    if (adminPedidoFormEl) {
        const allProps = JSON.parse(adminPedidoFormEl.dataset.props);
        const root = createRoot(adminPedidoFormEl);
        root.render(<AdminPedidoForm {...allProps} />);
    }

    const adminPromocoesIndexEl = document.getElementById('react-admin-promocoes-index-root');
    if (adminPromocoesIndexEl) {
        const allProps = JSON.parse(adminPromocoesIndexEl.dataset.props);
        const root = createRoot(adminPromocoesIndexEl);
        root.render(<AdminPromocoesIndex {...allProps} />);
    }

    const adminPromocaoFormEl = document.getElementById('react-admin-promocao-form-root');
    if (adminPromocaoFormEl) {
        const allProps = JSON.parse(adminPromocaoFormEl.dataset.props);
        const root = createRoot(adminPromocaoFormEl);
        root.render(<AdminPromocaoForm {...allProps} />);
    }

    const perfilRootEl = document.getElementById('react-perfil-root');
    if (perfilRootEl) {
        const root = createRoot(perfilRootEl);
        root.render(<Perfil />);
    }
});