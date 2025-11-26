import React, { useState } from 'react';

export default function AdminEventoForm(props) {
    const [formData, setFormData] = useState({
        ...props.evento,
        data_evento: props.evento.data_evento ? props.evento.data_evento.split('T')[0] : ''
    });
    const [errors, setErrors] = useState(null);

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
        const url = isNew ? '/admin/eventos' : `/admin/eventos/${formData.id}`;
        const method = isNew ? 'POST' : 'PATCH';

        const params = {
            evento: {
                nome: formData.nome,
                descricao: formData.descricao,
                data_evento: formData.data_evento,
                status: formData.status,
                localizacao: formData.localizacao
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
                window.location.href = '/admin/eventos';
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
                    {formData.id ? 'Editar Evento' : 'Novo Evento'}
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
                        <label htmlFor="nome">Nome do Evento</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao || ''}
                            onChange={handleChange}
                            rows="5"
                        />
                    </div>

                    <div>
                        <label htmlFor="data_evento">Data do Evento</label>
                        <input
                            type="date"
                            id="data_evento"
                            name="data_evento"
                            value={formData.data_evento || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="localizacao">Localização</label>
                        <input
                            type="text"
                            id="localizacao"
                            name="localizacao"
                            value={formData.localizacao || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '1rem', boxSizing: 'border-box' }}
                        >
                            <option value="">Selecione...</option>
                            <option value="Agendado">Agendado</option>
                            <option value="Confirmado">Confirmado</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-submit">
                        {formData.id ? 'Atualizar Evento' : 'Salvar Evento'}
                    </button>
                </form>
                <a href="/admin/eventos" className="admin-form-link-back">Voltar</a>
            </div>
        </div>
    );
}