import React from 'react';
import { createRoot } from 'react-dom/client';

import Home from '../components/Home';
import ProdutoDetalhe from '../components/ProdutoDetalhe';
import Carrinho from '../components/Carrinho';

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
});