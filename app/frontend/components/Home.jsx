import React, { useState } from 'react';
import '../stylesheets/Home.css';
export default function Home({ doces, eventos, promocoes }) {

    const [categoria, setCategoria] = useState("");

    return (
        <>
            {}
            <section className="banner">
                <h2>Doces artesanais feitos sob encomenda.</h2>
                <div className="banner-buttons">
                    <a href="#doces" className="btn-pink">Ver cardápio</a>
                    <a href="#eventos" className="btn-gray">Próximos Eventos</a>
                </div>
            </section>

            {/* DOCES (Com link) */}
            <section id="doces" className="section">
                <h2>Doces</h2>
                <div className="filters">
                    <input type="text" placeholder="Pesquisar..." />
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="">Selecionar categoria...</option>
                        <option value="Docinho">Docinhos</option>
                        <option value="Bolos">Bolos</option>
                    </select>
                </div>

                <div className="grid">
                    {doces.map((doce) => (
                        <div key={doce.id} className="card">
                            <div className="image"></div>
                            <p className="nome">{doce.nome}</p>
                            <span className="tag">{doce.categoria}</span>
                            <p className="preco">R$ {Number(doce.preco).toFixed(2)}</p>
                            <a href={`/produtos/${doce.id}`} className="btn-pink">
                                Ver produto
                            </a>
                            <span className="favorite">♡</span>
                        </div>
                    ))}
                </div>
            </section>

            <section id="promocoes" className="section">
                <h2>Promoções</h2>
                <p>Para tornar sua data comemorativa ainda mais especial.</p>
                <div className="grid">
                    {promocoes.map((item) => (
                        <div key={item.id} className="card">
                            <div className="image"></div>
                            <p className="nome">{item.nome}</p>
                            <p className="preco">R$ {Number(item.preco).toFixed(2)}</p>
                            <a href={`/produtos/${item.produto_id}`} className="btn-pink">
                                Ver produto
                            </a>
                            <span className="favorite">♡</span>
                        </div>
                    ))}
                </div>
            </section>

            {}
            <section id="eventos" className="section">
                <h2>Eventos</h2>
                <p>Encontre o evento mais próximo de você para experimentar nossos doces!</p>
                <div className="grid grid-2">
                    {}
                    {eventos.map((evento) =>
                        Array(1).fill(1).map((_, i) => (
                            <div key={`${evento.id}-${i}`} className="evento-card">
                                <p className="data">{evento.data}</p>
                                <h3>{evento.nome}</h3>
                                <p className="desc">{evento.desc}</p>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </>
    );
}