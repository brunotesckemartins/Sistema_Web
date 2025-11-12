import React from 'react';
import { createRoot } from 'react-dom/client';

import Home from '../components/Home';
import ProdutoDetalhe from '../components/ProdutoDetalhe';
import Carrinho from '../components/Carrinho';
import Login from '../components/Login';
import Cadastro from '../components/Cadastro';

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
});