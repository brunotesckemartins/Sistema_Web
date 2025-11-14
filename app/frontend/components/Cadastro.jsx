import React, { useState } from "react";
import "../stylesheets/Cadastro.css";

export default function Cadastro() {
    const [formData, setFormData] = useState({
        login: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        telefone: "",
        cep: "",
        endereco: "",
    });
    const [errors, setErrors] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);

        if (formData.senha !== formData.confirmarSenha) {
            setErrors({ "Confirmar Senha": ["não confere com a Senha"] });
            return;
        }

        const params = {
            usuario: {
                login: formData.login,
                email: formData.email,
                password: formData.senha,
                password_confirmation: formData.confirmarSenha,
                telefone: formData.telefone,
                cep: formData.cep,
                endereco: formData.endereco,
            }
        };

        try {
            const response = await fetch('/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (response.ok) {
                alert("Cadastro realizado com sucesso! Faça o login.");
                window.location.href = '/auth/sign_in';
            } else {
                const data = await response.json();
                setErrors(data.errors);
            }
        } catch (error) {
            console.error("Erro no cadastro:", error);
            setErrors({ "Erro": ["Não foi possível conectar ao servidor."] });
        }
    };

    return (
        <>
            <div className="cadastro-container">
                <div className="cadastro-box">
                    <h1 className="cadastro-title">Cadastro</h1>
                    <p className="cadastro-subtitle">
                        Digite seus dados para criar sua conta.
                    </p>

                    {errors && (
                        <div style={{ color: 'red', marginBottom: '15px', textAlign: 'left' }}>
                            <strong>Ocorreram erros:</strong>
                            <ul>
                                {Object.entries(errors).map(([field, messages]) => (
                                    <li key={field}>
                                        {field} {messages.join(', ')}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="cadastro-form">
                        <input
                            type="text"
                            name="login"
                            placeholder="Login (nome de usuário)"
                            value={formData.login}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="senha"
                            placeholder="Senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="confirmarSenha"
                            placeholder="Confirmar senha"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="telefone"
                            placeholder="Telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="cep"
                            placeholder="CEP"
                            value={formData.cep}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="endereco"
                            placeholder="Endereço"
                            value={formData.endereco}
                            onChange={handleChange}
                            rows="3"
                        />
                        <button type="submit" className="btn-cadastro">
                            Criar conta
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}