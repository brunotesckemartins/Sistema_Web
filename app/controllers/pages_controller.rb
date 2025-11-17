class PagesController < ApplicationController
  def home
    produtos = Produto.includes(:categoria).all
    produtos_props = produtos.map do |produto|
      {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        categoria: produto.categoria&.nome,
        imagem_url: produto.imagem.attached? ? url_for(produto.imagem) : nil
      }
    end

    eventos = Evento.all.order(data_evento: :asc)
    eventos_props = eventos.map do |evento|
      {
        id: evento.id,
        nome: evento.nome,
        desc: evento.descricao,
        data: evento.data_evento.strftime("%d/%m/%Y")
      }
    end

    promocoes = Promocao.includes(:produto).all
    promocoes_props = promocoes.map do |promo|
      {
        id: promo.id,
        nome: promo.nome_promocao,
        preco: promo.preco_promocional,
        produto_id: promo.produto_id,
        imagem_url: promo.produto.imagem.attached? ? url_for(promo.produto.imagem) : nil
      }
    end

    @react_props = {
      doces: produtos_props,
      eventos: eventos_props,
      promocoes: promocoes_props
    }
  end
end
