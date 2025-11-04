import React from "react";
import "./ProdutoDetalhe.css";

export default function ProdutoDetalhe(props) {

    const { produto } = props;


    const adicionarAoCarrinho = () => {
        alert(`${produto.nome} foi adicionado ao carrinho!`);
    };

    return (
        <>
            {}

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