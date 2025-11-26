class PedidosController < ApplicationController
  before_action :authenticate_usuario!
  skip_before_action :verify_authenticity_token, only: [ :create ]

  def show
    @pedido = Pedido.find_by(id: params[:id])

    if @pedido.nil?
      redirect_to root_path, alert: "Pedido não encontrado."
      return
    end

    if @pedido.usuario_id != current_usuario.id
      redirect_to root_path, alert: "Você não tem permissão para ver este pedido."
      nil
    end
  end

  def confirmar_pagamento
  @pedido = Pedido.find_by(id: params[:id])

  if @pedido.nil?
    redirect_to root_path, alert: "Pedido não encontrado."
    return
  end

  if @pedido.usuario_id != current_usuario.id
    redirect_to root_path, alert: "Você não tem permissão para acessar este pedido."
    return
  end

  if @pedido.update(status: "Pago / Em Preparação")
    # Renderiza a view de confirmação
    render :confirmar_pagamento
  else
    redirect_to pedido_path(@pedido), alert: "Erro ao processar pagamento."
  end
end

  def create
  carrinho = session[:carrinho] || {}

  if carrinho.empty?
    render json: { error: "Carrinho vazio" }, status: :unprocessable_entity
    return
  end

  total_pedido = 0
  itens_validos = []

  carrinho.each do |produto_id, quantidade_str|
    produto = Produto.find_by(id: produto_id)
    next unless produto

    quantidade_int = quantidade_str.to_i
    next if quantidade_int <= 0

    subtotal = produto.preco * quantidade_int
    total_pedido += subtotal

    itens_validos << {
      produto: produto,
      quantidade: quantidade_int,
      preco_unitario: produto.preco
    }
  end

  Pedido.transaction do
    @pedido = current_usuario.pedidos.build(
      status: "Recebido",
      total: total_pedido
    )

    itens_validos.each do |item|
      @pedido.item_pedidos.build(
        produto: item[:produto],
        quantidade: item[:quantidade],
        preco_unitario: item[:preco_unitario]
      )
    end

    if @pedido.save
      session[:carrinho] = {}
      render json: { notice: "Pedido realizado com sucesso!", pedido_id: @pedido.id }, status: :created
    else
      render json: { error: "Não foi possível processar o pedido: #{@pedido.errors.full_messages.join(', ')}" }, status: :unprocessable_entity
      raise ActiveRecord::Rollback
    end
  end
end
end
