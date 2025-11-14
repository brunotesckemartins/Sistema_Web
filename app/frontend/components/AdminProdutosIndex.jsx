import React, { useState } from 'react';
import "../stylesheets/AdminIndex.css";
export default function AdminProdutosIndex(props) {
    const [produtos, setProdutos] = useState(props.produtos);

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que quer excluir este produto?')) {
            return;
        }

        try {
            const response = await fetch(`/admin/produtos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Produto excluído!');
                setProdutos(produtos.filter(p => p.id !== id));
            } else {
                // Lê a mensagem de erro que o Rails enviou
                const data = await response.json();
                alert(`Erro ao excluir: ${data.message}`);
            }
        } catch (err) {
            alert('Erro de conexão.');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Gerenciar Produtos</h1>
            <a href="/admin/produtos/new" style={{ padding: '10px', backgroundColor: 'green', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
                + Novo Produto
            </a>

            <table style={{ width: '100%', marginTop: '20px' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {produtos.map(produto => (
                    <tr key={produto.id}>
                        <td>{produto.id}</td>
                        <td>{produto.nome}</td>
                        <td>R$ {Number(produto.preco).toFixed(2)}</td>
                        <td>
                            <a href={`/admin/produtos/${produto.id}/edit`} style={{ marginRight: '10px' }}>
                                Editar
                            </a>
                            <button onClick={() => handleDelete(produto.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <a href="/admin/dashboard">Voltar ao Dashboard</a>
        </div>
    );
}