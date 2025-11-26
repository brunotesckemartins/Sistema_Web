class ProdutosController < ApplicationController
  before_action :authenticate_usuario!, only: [ :comprar_agora ]
  before_action :set_produto, only: %i[ show comprar_agora ]

  def index
    redirect_to root_path
  end

  def show
    promocao = Promocao.find_by(produto_id: @produto.id)

    @react_props = {
      produto: {
        id: @produto.id,
        nome: @produto.nome,
        descricao: @produto.descricao,
        preco: @produto.preco,
        preco_promocional: promocao&.preco_promocional,
        em_promocao: promocao.present?,
        categoria: @produto.categoria&.nome,
        imagem_url: @produto.imagem.attached? ? url_for(@produto.imagem) : nil
      }
    }
  end

  def comprar_agora
    promocao = Promocao.find_by(produto_id: @produto.id)
    preco_final = promocao&.preco_promocional || @produto.preco

    pedido = current_usuario.pedidos.build(
      status: "Recebido",
      total: preco_final
    )

    pedido.item_pedidos.build(
      produto: @produto,
      quantidade: 1,
      preco_unitario: preco_final
    )

    if pedido.save
      redirect_to pedido_path(pedido)
    else
      redirect_to produto_path(@produto), alert: "Erro ao criar pedido"
    end
  end

  private

  def set_produto
    @produto = Produto.find(params[:id])
  end
end
