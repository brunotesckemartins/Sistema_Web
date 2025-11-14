import React, { useState } from 'react';

export default function AdminPedidosIndex(props) {
    const [pedidos, setPedidos] = useState(props.pedidos);

    const formatarData = (dataISO) => {
        return new Date(dataISO).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Gerenciar Pedidos</h1>
            </div>

            <table className="admin-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {pedidos.map(pedido => (
                    <tr key={pedido.id}>
                        <td>#{pedido.id}</td>
                        <td>{formatarData(pedido.created_at)}</td>

                        {}
                        <td>{pedido.usuario?.email || 'Usuário Deletado'}</td>

                        <td>R$ {Number(pedido.total).toFixed(2)}</td>
                        <td>{pedido.status}</td>
                        <td className="action-links">
                            <a href={`/admin/pedidos/${pedido.id}/edit`}>
                                Ver / Alterar Status
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <a href="/admin/dashboard" className="admin-link-back">Voltar ao Dashboard</a>
        </div>
    );
}