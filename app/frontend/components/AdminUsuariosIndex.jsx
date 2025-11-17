import React, { useState } from 'react';

export default function AdminUsuariosIndex(props) {
    const [usuarios, setUsuarios] = useState(props.usuarios);

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que quer excluir este usuário? Esta ação não pode ser desfeita.')) {
            return;
        }
        try {
            const response = await fetch(`/admin/usuarios/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Usuário excluído!');
                setUsuarios(usuarios.filter(u => u.id !== id));
            } else {
                // --- MELHORIA AQUI ---
                const data = await response.json();
                alert(`Erro ao excluir: ${data.message || 'Erro desconhecido'}`);
            }
        } catch (err) {
            alert('Erro de conexão.');
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Gerenciar Usuários</h1>
                <a href="/admin/usuarios/new" className="admin-btn-new">
                    + Novo Usuário
                </a>
            </div>

            <table className="admin-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Login</th>
                    <th>Admin?</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {usuarios.map(usuario => (
                    <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.login}</td>
                        <td>{usuario.admin ? 'Sim' : 'Não'}</td>
                        <td className="action-links">
                            <a href={`/admin/usuarios/${usuario.id}/edit`}>
                                Editar
                            </a>
                            <button onClick={() => handleDelete(usuario.id)}>
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