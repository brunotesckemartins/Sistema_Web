import React from "react";
import "./ProdutoDetalhe.css";
function getCsrfToken() {
    return document.querySelector("meta[name='csrf-token']")?.content;
}

export default function ProdutoDetalhe(props) {
    const { produto } = props;

    const adicionarAoCarrinho = async () => {
        const productId = produto.id;

        try {
            const response = await fetch(`/add_to_carrinho/${productId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-Token': getCsrfToken()
                }
            });

            const data = await response.json();

            alert(data.notice || "Produto adicionado ao carrinho!");

        } catch (error) {
            console.error("Erro ao adicionar ao carrinho:", error);
            alert("Não foi possível adicionar o produto.");
        }
    };

    return (
        <>
            <div className="produto-detalhe-container">
                <h1 className="produto-nome">{produto.nome}</h1>

                <div className="produto-conteudo">
                    <img
                        src={""}
                        alt={produto.nome}
                        className="produto-imagem"
                    />

                    <div className="produto-info">
                        <h3>{produto.nome}</h3>
                        <span className="produto-categoria">{produto.categoria}</span>
                        <p className="produto-descricao">{produto.descricao}</p>

                        <p className="produto-preco">
                            Valor: <span>R${Number(produto.preco).toFixed(2)}</span>
                        </p>

                        <button className="btn-carrinho" onClick={adicionarAoCarrinho}>
                            Adicionar ao carrinho
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}