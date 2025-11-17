import React, { useState } from 'react';
import '../stylesheets/AdminIndex.css';

export default function AdminPromocoesIndex(props) {
    const [promocoes, setPromocoes] = useState(props.promocoes);

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que quer excluir esta promoção?')) {
            return;
        }
        try {
            const response = await fetch(`/admin/promocoes/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Promoção excluída!');
                setPromocoes(promocoes.filter(p => p.id !== id));
            } else {
                alert('Erro ao excluir.');
            }
        } catch (err) {
            alert('Erro de conexão.');
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Gerenciar Promoções</h1>
                <a href="/admin/promocoes/new" className="admin-btn-new">
                    + Nova Promoção
                </a>
            </div>

            <table className="admin-table">
                <thead>
                <tr>
                    <th>Campanha</th>
                    <th>Produto</th>
                    <th>Preço Original</th>
                    <th>Preço Promo</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {promocoes.map(promo => (
                    <tr key={promo.id}>
                        {}
                        <td>{promo.nome_promocao}</td>

                        <td>{promo.produto_nome}</td>
                        <td style={{ textDecoration: 'line-through', color: '#999' }}>
                            R$ {Number(promo.preco_original).toFixed(2)}
                        </td>
                        <td style={{ color: 'green', fontWeight: 'bold' }}>
                            R$ {Number(promo.preco_promocional).toFixed(2)}
                        </td>
                        <td className="action-links">
                            <a href={`/admin/promocoes/${promo.id}/edit`}>
                                Editar
                            </a>
                            <button onClick={() => handleDelete(promo.id)}>
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <a href="/admin/dashboard" className="admin-link-back">Voltar ao Dashboard</a>
        </div>
    );
}