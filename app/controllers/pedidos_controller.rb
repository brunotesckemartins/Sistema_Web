class PedidosController < ApplicationController
  before_action :authenticate_usuario!

  skip_before_action :verify_authenticity_token

  def create
    carrinho = session[:carrinho] || {}

    pedido = current_usuario.pedidos.build(status: "Recebido", total: 0)

    total_pedido = 0

    carrinho.each do |produto_id, quantidade_str|
      produto = Produto.find(produto_id)
      quantidade_int = quantidade_str.to_i
      preco_unitario = produto.preco

      pedido.item_pedidos.build(
        produto: produto,
        quantidade: quantidade_int,
        preco_unitario: preco_unitario
      )

      total_pedido += (preco_unitario * quantidade_int)
    end

    if pedido.save
      session[:carrinho] = {}
      render json: { notice: "Pedido realizado com sucesso!", pedido_id: pedido.id }, status: :created
    else
      render json: { error: "Não foi possível processar o pedido" }, status: :unprocessable_entity
    end
  end
end
