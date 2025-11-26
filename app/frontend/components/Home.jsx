import React, { useState } from 'react';
import '../stylesheets/Home.css';

export default function Home({ doces, eventos, promocoes }) {
    const [categoria, setCategoria] = useState("");

    return (
        <>
            <section className="banner">
                <h2>Doces artesanais feitos sob encomenda.</h2>
                <div className="banner-buttons">
                    <a href="#doces" className="btn-pink">Ver cardápio</a>
                    <a href="#eventos" className="btn-gray">Próximos Eventos</a>
                    <a href="#promocoes" className="btn-gray">Promoções</a>

                </div>
            </section>

            <section id="doces" className="section">
                <h2>Doces</h2>
                

                <div className="grid">
                    {doces.map((doce) => (
                        <div key={doce.id} className="card">
                            <div className="image">
                                {doce.imagem_url ? (
                                    <img src={doce.imagem_url} alt={doce.nome} />
                                ) : (
                                    <span style={{ color: '#999', fontSize: '0.9rem' }}>Sem foto</span>
                                )}
                            </div>

                            <p className="nome">{doce.nome}</p>
                            <span className="tag">{doce.categoria}</span>
                            <p className="preco">R$ {Number(doce.preco).toFixed(2)}</p>
                            <a href={`/produtos/${doce.id}`} className="btn-pink">
                                Ver produto
                            </a>
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
                            <div className="image">
                                {item.imagem_url ? (
                                    <img src={item.imagem_url} alt={item.nome} />
                                ) : (
                                    <span style={{ color: '#999', fontSize: '0.9rem' }}>Sem foto</span>
                                )}
                            </div>

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

            <section id="eventos" className="section">
                <h2>Eventos</h2>
                <p>Encontre o evento mais próximo de você para experimentar nossos doces!</p>
                <div className="grid grid-2">
                    {eventos.map((evento) => (
                        <a key={evento.id} href={`/eventos/${evento.id}`} className="evento-card-link">
                            <div className="evento-card">
                                <p className="data">{new Date(evento.data_evento).toLocaleDateString('pt-BR')}</p>
                                <h3>{evento.nome}</h3>
                                <p className="desc">{evento.descricao}</p>
                                <span className="ver-detalhes">Ver detalhes →</span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
}