import React from 'react';
import { createRoot } from 'react-dom/client';

// 1. Importe os DOIS componentes
import Home from '../components/Home';
import ProdutoDetalhe from '../components/ProdutoDetalhe';

document.addEventListener('DOMContentLoaded', () => {

    // --- LANÇADOR DA HOME PAGE ---
    const homeRootEl = document.getElementById('react-home-root');
    if (homeRootEl) {
        const allProps = JSON.parse(homeRootEl.dataset.props);
        const root = createRoot(homeRootEl);
        root.render(<Home {...allProps} />);
    }

    // --- LANÇADOR DA PÁGINA DE PRODUTO (NOVO!) ---
    const productRootEl = document.getElementById('react-product-detail-root');
    if (productRootEl) {
        const allProps = JSON.parse(productRootEl.dataset.props);
        const root = createRoot(productRootEl);
        // Renderiza o componente ProdutoDetalhe passando as props
        root.render(<ProdutoDetalhe {...allProps} />);
    }
});