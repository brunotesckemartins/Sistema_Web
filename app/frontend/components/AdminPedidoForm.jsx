import React, { useState } from 'react';

export default function AdminPedidoForm(props) {
    const [pedido, setPedido] = useState(props.pedido);
    const [errors, setErrors] = useState(null);

    const { itens, cliente } = props;

    const handleChange = (e) => {
        setPedido({
            ...pedido,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);

        const url = `/admin/pedidos/${pedido.id}`;
        const params = {
            pedido: {
                status: pedido.status
            }
        };

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params)
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                window.location.href = '/admin/pedidos';
            } else {
                setErrors(data.errors);
            }
        } catch (err) {
            alert('Erro de conexão.');
        }
    };

    return (
        <div className="admin-form-container">
            <div className="admin-form-box">
                <h1 className="admin-form-title">
                    Detalhes do Pedido #{pedido.id}
                </h1>
                <p style={{ textAlign: 'center', marginTop: '-20px', marginBottom: '30px' }}>
                    Cliente: {cliente.email}
                </p>

                <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Itens do Pedido</h3>
                <table className="admin-table" style={{ margin: '20px 0' }}>
                    <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Qtd.</th>
                        <th>Preço Unit.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {itens.map(item => (
                        <tr key={item.id}>
                            <td>{item.produto.nome}</td>
                            <td>{item.quantidade}</td>
                            <td>R$ {Number(item.preco_unitario).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <h2 style={{ textAlign: 'right', margin: '20px 0' }}>
                    Total: R$ {Number(pedido.total).toFixed(2)}
                </h2>

                {errors && (
                    <div style={{ color: 'red', marginBottom: '15px', textAlign: 'left' }}>
                        <strong>Ocorreram erros:</strong>
                        <ul>
                            {Object.entries(errors).map(([field, messages]) => (
                                <li key={field}>{field} {messages.join(', ')}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="admin-form">
                    <div>
                        <label htmlFor="status">Alterar Status do Pedido</label>
                        <select
                            id="status"
                            name="status"
                            value={pedido.status || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '1rem', boxSizing: 'border-box' }}
                        >
                            <option value="Recebido">Recebido</option>
                            <option value="Em preparação">Em preparação</option>
                            <option value="Pronto para retirada">Pronto para retirada</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-submit">
                        Atualizar Status
                    </button>
                </form>
                <a href="/admin/pedidos" className="admin-form-link-back">Voltar para Lista de Pedidos</a>
            </div>
        </div>
    );
}