import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Carrinho.css";

function getCsrfToken() {
    return document.querySelector("meta[name='csrf-token']")?.content;
}

export default function Carrinho({ initialCart }) {

    const [itens, setItens] = useState(initialCart.itens);
    const [total, setTotal] = useState(initialCart.total_geral);

    const loadCart = async () => {
        const response = await fetch('/carrinho', {
            headers: {
                'Accept': 'application/json' // Pede JSON
            }
        });
        const data = await response.json();
        setItens(data.itens);
        setTotal(data.total_geral);
    };

    const alterarQuantidade = async (id, delta) => {
        let url = '';

        if (delta > 0) {
            url = `/add_to_carrinho/${id}`;
        } else {
            url = `/decrease_quantity/${id}`;
        }

        await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-CSRF-Token': getCsrfToken()
            }
        });

        loadCart();
    };

    const removerItem = async (id) => {
        await fetch(`/remove_from_carrinho/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'X-CSRF-Token': getCsrfToken()
            }
        });

        loadCart();
    };

    return (
        <>
            <Navbar />
            <div className="carrinho-container">
                <h1 className="carrinho-title">Cestinha de doces</h1>

                <div className="carrinho-grid">
                    {itens.map((item) => (
                        <div key={item.id} className="carrinho-item">
                            <div className="carrinho-img" />
                            <p className="carrinho-nome">{item.nome}</p>

                            <div className="carrinho-quantidade">
                                <button onClick={() => alterarQuantidade(item.id, -1)}>-</button>
                                <span>{item.quantidade}</span>
                                <button onClick={() => alterarQuantidade(item.id, 1)}>+</button>
                            </div>

                            <p className="carrinho-preco">
                                {/* O backend já manda o total do item, mas podemos calcular aqui também */}
                                Total: R${(item.preco * item.quantidade).toFixed(2)}
                            </p>

                            <button
                                className="btn-remover"
                                onClick={() => removerItem(item.id)}
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                </div>

                <div className="carrinho-footer">
                    <h2>
                        Total da compra: <span>R${total.toFixed(2)}</span>
                    </h2>
                    <button className="btn-finalizar">Finalizar pedido</button>
                </div>
            </div>
        </>
    );
}