import React, { useState } from 'react';

export default function AdminProdutoForm(props) {
    const [formData, setFormData] = useState(props.produto);
    const [errors, setErrors] = useState(null);
    const [novaImagem, setNovaImagem] = useState(null); // Para guardar o arquivo selecionado
    const [preview, setPreview] = useState(props.produto.imagem_url); // Mostra a foto atual ou o preview

    // Pega a lista de categorias enviada pelo controller
    const categorias = props.categorias || [];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNovaImagem(file);
            setPreview(URL.createObjectURL(file)); // Cria um preview local instantâneo
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);

        const isNew = !formData.id;
        const url = isNew ? '/admin/produtos' : `/admin/produtos/${formData.id}`;
        const method = isNew ? 'POST' : 'PATCH';

        // --- MUDANÇA CRUCIAL: Usar FormData para envio de arquivos ---
        const data = new FormData();
        data.append('produto[nome]', formData.nome || '');
        data.append('produto[descricao]', formData.descricao || '');
        data.append('produto[preco]', formData.preco || '');
        data.append('produto[categoria_id]', formData.categoria_id || '');

        if (novaImagem) {
            data.append('produto[imagem]', novaImagem);
        }

        try {
            const response = await fetch(url, {
                method: method,
                // NÃO coloque 'Content-Type': 'application/json' aqui!
                // O browser define automaticamente o boundary do multipart/form-data
                body: data
            });

            const responseData = await response.json();

            if (response.ok) {
                alert(responseData.message);
                window.location.href = '/admin/produtos';
            } else {
                setErrors(responseData.errors);
            }
        } catch (err) {
            alert('Erro de conexão.');
        }
    };

    return (
        <div className="admin-form-container">
            <div className="admin-form-box">
                <h1 className="admin-form-title">
                    {formData.id ? 'Editar Produto' : 'Novo Produto'}
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

                    {/* --- PREVIEW DA IMAGEM --- */}
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #ccc' }}
                            />
                        ) : (
                            <div style={{ width: '150px', height: '150px', background: '#eee', margin: '0 auto', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                                Sem Foto
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="imagem">Foto do Produto</label>
                        <input
                            type="file"
                            id="imagem"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ padding: '10px 0' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="nome">Nome do Produto</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="categoria_id">Categoria</label>
                        <select
                            id="categoria_id"
                            name="categoria_id"
                            value={formData.categoria_id || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '1rem' }}
                        >
                            <option value="">Selecione...</option>
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.nome}</option>
                            ))}
                        </select>
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
                        <label htmlFor="preco">Preço</label>
                        <input
                            type="number"
                            id="preco"
                            step="0.01"
                            name="preco"
                            value={formData.preco || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-submit">
                        {formData.id ? 'Atualizar Produto' : 'Salvar Produto'}
                    </button>
                </form>
                <a href="/admin/produtos" className="admin-form-link-back">Voltar</a>
            </div>
        </div>
    );
}