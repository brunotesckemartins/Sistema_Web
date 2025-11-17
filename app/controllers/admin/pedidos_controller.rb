class Admin::PedidosController < ApplicationController
  before_action :require_admin
  before_action :set_pedido, only: [ :edit, :update ]

  def index
    pedidos_com_usuario = Pedido.all.order(created_at: :desc).includes(:usuario)

    pedidos_props = pedidos_com_usuario.map do |pedido|
      pedido.as_json.merge(
        usuario: pedido.usuario.as_json(only: [ :id, :email ])
      )
    end

    @react_props = {
      pedidos: pedidos_props
    }
  end

  def edit
    itens_com_produtos = @pedido.item_pedidos.includes(:produto)

    itens_props = itens_com_produtos.map do |item|
      item.as_json.merge(
        produto: item.produto.as_json(only: [ :nome ])
      )
    end

    @react_props = {
      pedido: @pedido,
      itens: itens_props,
      cliente: @pedido.usuario
    }
  end

  def update
    if @pedido.update(pedido_params)
      render json: { message: "Status do pedido atualizado!" }, status: :ok
    else
      render json: { errors: @pedido.errors.to_hash(true) }, status: :unprocessable_content
    end
  end

  private

  def set_pedido
    @pedido = Pedido.find(params[:id])
  end

  def pedido_params
    params.require(:pedido).permit(:status)
  end
end
