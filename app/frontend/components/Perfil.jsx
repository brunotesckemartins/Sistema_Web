import React, { useState, useEffect } from "react";

function getCsrfToken() {
    return document.querySelector("meta[name='csrf-token']")?.content;
}

export default function Perfil() {
    const [cliente, setCliente] = useState({
        nome: "",
        email: "",
        telefone: "",
        cep: "",
        endereco: "",
        foto: "",
        login: ""
    });

    const [formSenha, setFormSenha] = useState({
        current_password: "",
        password: "",
        password_confirmation: ""
    });

    const [editando, setEditando] = useState(false);
    const [alterarSenha, setAlterarSenha] = useState(false);
    const [novaFotoArquivo, setNovaFotoArquivo] = useState(null);

    useEffect(() => {
        carregarDadosCliente();
    }, []);

    async function carregarDadosCliente() {
        try {
            const response = await fetch('/perfil', {
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                const data = await response.json();
                setCliente(data);
            }
        } catch (error) {
            console.error("Erro ao carregar perfil", error);
        }
    }

    async function salvarAlteracoes() {
        const formData = new FormData();
        formData.append('nome', cliente.nome || "");
        formData.append('email', cliente.email || "");
        formData.append('telefone', cliente.telefone || "");
        formData.append('cep', cliente.cep || "");
        formData.append('endereco', cliente.endereco || "");

        if (novaFotoArquivo) {
            formData.append('foto', novaFotoArquivo);
        }

        try {
            const response = await fetch('/perfil', {
                method: 'PUT',
                headers: {
                    'X-CSRF-Token': getCsrfToken()
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert("Perfil atualizado!");
                setEditando(false);
                if (data.foto) {
                    setCliente(prev => ({ ...prev, foto: data.foto }));
                }
                setNovaFotoArquivo(null);
            } else {
                alert("Erro: " + (data.errors || "Falha ao salvar"));
            }
        } catch (error) {
            alert("Erro de conexão.");
        }
    }

    async function salvarNovaSenha() {
        const params = {
            usuario: {
                current_password: formSenha.current_password,
                password: formSenha.password,
                password_confirmation: formSenha.password_confirmation
            }
        };

        try {
            const response = await fetch('/perfil/senha', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': getCsrfToken()
                },
                body: JSON.stringify(params)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setAlterarSenha(false);
                setFormSenha({ current_password: "", password: "", password_confirmation: "" });
            } else {
                alert("Erro: " + (data.errors ? data.errors.join(", ") : "Erro ao alterar senha"));
            }
        } catch (error) {
            alert("Erro de conexão.");
        }
    }

    const handleFotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const arquivo = e.target.files[0];
            setNovaFotoArquivo(arquivo);
            setCliente({ ...cliente, foto: URL.createObjectURL(arquivo) });
        }
    };

    return (
        <div className="perfil-container">
            <div className="perfil-esquerda">
                <div className="foto-perfil">
                    {cliente.foto ? (
                        <img src={cliente.foto} alt="Foto de perfil" style={{objectFit: "cover"}} />
                    ) : (
                        <div className="foto-placeholder">Sem foto</div>
                    )}
                </div>

                {editando ? (
                    <input
                        type="text"
                        placeholder="Seu Nome"
                        value={cliente.nome || ""}
                        onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                        className="input-editar"
                        style={{ marginTop: '10px', textAlign: 'center' }}
                    />
                ) : (
                    <h2>{cliente.nome || cliente.email}</h2>
                )}

                {editando && (
                    <label className="upload-btn">
                        Alterar Foto
                        <input type="file" onChange={handleFotoChange} accept="image/*" />
                    </label>
                )}
            </div>

            <div className="perfil-direita">
                <h1>Perfil do Cliente</h1>
                <div className="perfil-campos">
                    <div className="campo">
                        <label>Email:</label>
                        {editando ? (
                            <input
                                type="email"
                                value={cliente.email || ""}
                                onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                            />
                        ) : (
                            <p>{cliente.email}</p>
                        )}
                    </div>

                    <div className="campo">
                        <label>Telefone:</label>
                        {editando ? (
                            <input
                                type="text"
                                value={cliente.telefone || ""}
                                onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                            />
                        ) : (
                            <p>{cliente.telefone || "Não informado"}</p>
                        )}
                    </div>

                    <div className="campo">
                        <label>CEP:</label>
                        {editando ? (
                            <input
                                type="text"
                                value={cliente.cep || ""}
                                onChange={(e) => setCliente({ ...cliente, cep: e.target.value })}
                            />
                        ) : (
                            <p>{cliente.cep || "Não informado"}</p>
                        )}
                    </div>

                    <div className="campo">
                        <label>Endereço:</label>
                        {editando ? (
                            <input
                                type="text"
                                value={cliente.endereco || ""}
                                onChange={(e) => setCliente({ ...cliente, endereco: e.target.value })}
                            />
                        ) : (
                            <p>{cliente.endereco || "Não informado"}</p>
                        )}
                    </div>
                </div>

                {!editando ? (
                    <>
                        <button className="btn editar" onClick={() => setEditando(true)}>
                            Editar Perfil
                        </button>
                        <button className="btn senha" onClick={() => setAlterarSenha(true)}>
                            Alterar Senha
                        </button>
                    </>
                ) : (
                    <div className="botoes-editar">
                        <button className="btn salvar" onClick={salvarAlteracoes}>
                            Salvar Alterações
                        </button>
                        <button className="btn cancelar" onClick={() => {
                            setEditando(false);
                            setNovaFotoArquivo(null);
                            carregarDadosCliente();
                        }}>
                            Cancelar
                        </button>
                    </div>
                )}

                {alterarSenha && (
                    <div className="modal-senha">
                        <div className="modal-content">
                            <h2>Alterar Senha</h2>
                            <input
                                type="password"
                                placeholder="Senha atual"
                                value={formSenha.current_password}
                                onChange={(e) => setFormSenha({...formSenha, current_password: e.target.value})}
                            />
                            <input
                                type="password"
                                placeholder="Nova senha"
                                value={formSenha.password}
                                onChange={(e) => setFormSenha({...formSenha, password: e.target.value})}
                            />
                            <input
                                type="password"
                                placeholder="Confirmar nova senha"
                                value={formSenha.password_confirmation}
                                onChange={(e) => setFormSenha({...formSenha, password_confirmation: e.target.value})}
                            />
                            <button className="btn salvar" onClick={salvarNovaSenha}>Salvar Senha</button>
                            <button className="btn cancelar" onClick={() => setAlterarSenha(false)}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}