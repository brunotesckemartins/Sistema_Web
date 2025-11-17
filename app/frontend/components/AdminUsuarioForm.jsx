import React, { useState } from 'react';

export default function AdminUsuarioForm(props) {
    const [formData, setFormData] = useState(props.usuario || {});
    const [errors, setErrors] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);

        const isNew = !formData.id;
        const url = isNew ? '/admin/usuarios' : `/admin/usuarios/${formData.id}`;
        const method = isNew ? 'POST' : 'PATCH';

        const params = {
            usuario: {
                email: formData.email,
                login: formData.login,
                admin: formData.admin,
                telefone: formData.telefone,
                cep: formData.cep,
                endereco: formData.endereco,
                password: formData.password,
                password_confirmation: formData.password_confirmation
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
                window.location.href = '/admin/usuarios';
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
                    {formData.id ? 'Editar Usuário' : 'Novo Usuário'}
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="login">Login</label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            value={formData.login || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            type="text"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            id="admin"
                            name="admin"
                            checked={formData.admin || false}
                            onChange={handleChange}
                            style={{ width: 'auto', marginRight: '10px' }}
                        />
                        <label htmlFor="admin">É Administrador?</label>
                    </div>

                    <hr style={{ margin: '20px 0' }} />

                    <p style={{ textAlign: 'center' }}>
                        {formData.id ? 'Deixe em branco para não alterar a senha.' : 'Defina a senha inicial.'}
                    </p>

                    <div>
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password_confirmation">Confirmar Senha</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-submit">
                        {formData.id ? 'Atualizar Usuário' : 'Salvar Usuário'}
                    </button>
                </form>
                <a href="/admin/usuarios" className="admin-form-link-back">Voltar</a>
            </div>
        </div>
    );
}