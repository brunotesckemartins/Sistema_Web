import React, { useState } from 'react';

export default function AdminEventosIndex(props) {
    const [eventos, setEventos] = useState(props.eventos);

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que quer excluir este evento?')) {
            return;
        }
        try {
            const response = await fetch(`/admin/eventos/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Evento excluído!');
                setEventos(eventos.filter(e => e.id !== id));
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
                <h1 className="admin-title">Gerenciar Eventos</h1>
                <a href="/admin/eventos/new" className="admin-btn-new">
                    + Novo Evento
                </a>
            </div>

            <table className="admin-table">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Data</th>
                    <th>Localização</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {eventos.map(evento => (
                    <tr key={evento.id}>
                        <td>{evento.nome}</td>
                        <td>{new Date(evento.data_evento).toLocaleDateString()}</td>
                        <td>{evento.localizacao || '-'}</td>
                        <td>{evento.status}</td>
                        <td className="action-links">
                            <a href={`/admin/eventos/${evento.id}/edit`}>
                                Editar
                            </a>
                            <button onClick={() => handleDelete(evento.id)}>
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