import React, { useState } from 'react';
import '../stylesheets/AdminProdutoForm.css';

export default function AdminPromocaoForm(props) {
    const [formData, setFormData] = useState(props.promocao);
    const [errors, setErrors] = useState(null);

    const produtos = props.produtos || [];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);

        const isNew = !formData.id;
        const url = isNew ? '/admin/promocoes' : `/admin/promocoes/${formData.id}`;
        const method = isNew ? 'POST' : 'PATCH';

        const params = {
            promocao: {
                // --- CORREÇÃO AQUI ---
                nome_promocao: formData.nome_promocao,
                preco_promocional: formData.preco_promocional,
                produto_id: formData.produto_id
            }
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params)
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                window.location.href = '/admin/promocoes';
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
                    {formData.id ? 'Editar Promoção' : 'Nova Promoção'}
                </h1>

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
                        <label htmlFor="nome_promocao">Nome da Promoção</label>
                        {}
                        <input
                            type="text"
                            id="nome_promocao"
                            name="nome_promocao"
                            placeholder="Ex: Black Friday"
                            value={formData.nome_promocao || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="produto_id">Produto</label>
                        <select
                            id="produto_id"
                            name="produto_id"
                            value={formData.produto_id || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '1rem' }}
                        >
                            <option value="">Selecione o Produto...</option>
                            {produtos.map((prod) => (
                                <option key={prod.id} value={prod.id}>
                                    {prod.nome} (Atual: R$ {Number(prod.preco).toFixed(2)})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="preco_promocional">Novo Preço Promocional</label>
                        <input
                            type="number"
                            id="preco_promocional"
                            step="0.01"
                            name="preco_promocional"
                            placeholder="Ex: 5.00"
                            value={formData.preco_promocional || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-submit">
                        {formData.id ? 'Atualizar Promoção' : 'Salvar Promoção'}
                    </button>
                </form>
                <a href="/admin/promocoes" className="admin-form-link-back">Voltar</a>
            </div>
        </div>
    );
}