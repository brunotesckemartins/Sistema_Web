import React, { useState } from "react";
import "../stylesheets/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const params = {
            usuario: {
                email: email,
                password: password
            }
        };

        try {
            const response = await fetch('/auth/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                setError("Email ou senha inválidos.");
            }
        } catch (err) {
            console.error("Erro no login:", err);
            setError("Erro ao conectar ao servidor.");
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="login-box">
                    <h1>Entrar</h1>
                    <p>Digite seus dados para encomendar seu produto.</p>

                    {error && (
                        <div style={{ color: 'red', marginBottom: '15px' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Acessar</button>
                    </form>
                </div>

                <div className="register-box">
                    <h2>Não possui cadastro?</h2>
                    <p>
                        É fácil, demora poucos minutinhos.
                        <br />
                        <a href="/auth/sign_up">Clique aqui</a> para realizar seu cadastro.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;