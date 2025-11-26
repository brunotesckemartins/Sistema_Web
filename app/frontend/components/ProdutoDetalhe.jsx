import React from "react";
import "../stylesheets/ProdutoDetalhe.css";

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
                headers: { 'Accept': 'application/json', 'X-CSRF-Token': getCsrfToken() }
            });
            const data = await response.json();
            alert(data.notice || "Produto adicionado ao carrinho!");
        } catch (error) {
            console.error("Erro ao adicionar:", error);
            alert("Não foi possível adicionar o produto.");
        }
    };

    const comprarAgora = async () => {
        const productId = produto.id;
        
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/produtos/${productId}/comprar_agora`;
        
        const csrfToken = document.createElement('input');
        csrfToken.type = 'hidden';
        csrfToken.name = 'authenticity_token';
        csrfToken.value = getCsrfToken();
        form.appendChild(csrfToken);
        
        document.body.appendChild(form);
        form.submit();
    };

    return (
        <>
            <div className="produto-detalhe-container">
                <h1 className="produto-nome">{produto.nome}</h1>
                <div className="produto-conteudo">
                    {produto.imagem_url ? (
                        <img
                            src={produto.imagem_url}
                            alt={produto.nome}
                            className="produto-imagem"
                            style={{ objectFit: "cover" }}
                        />
                    ) : (
                        <div className="produto-imagem" style={{ backgroundColor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}>
                            Sem foto
                        </div>
                    )}

                    <div className="produto-info">
                        <h3>{produto.nome}</h3>
                        <span className="produto-categoria">{produto.categoria}</span>
                        <p className="produto-descricao">{produto.descricao}</p>
                        <p className="produto-preco">
                            {produto.em_promocao ? (
                                <>
                                    <span className="preco-original">De: R${Number(produto.preco).toFixed(2)}</span>
                                    <span className="preco-promocional">Por: R${Number(produto.preco_promocional).toFixed(2)}</span>
                                </>
                            ) : (
                                <span>Valor: R${Number(produto.preco).toFixed(2)}</span>
                            )}
                        </p>
                        
                        <div className="produto-botoes">
                            <button className="btn-comprar-agora" onClick={comprarAgora}>
                                Comprar Agora
                            </button>
                            <button className="btn-carrinho" onClick={adicionarAoCarrinho}>
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}