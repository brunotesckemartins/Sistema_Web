class AdminController < ApplicationController
  before_action :require_admin

  def dashboard
    @total_pedidos = Pedido.count
    @faturament_total = Pedido.sum(:total)
    @ultimo_pedido = Pedido.order(created_at: :desc).first
    @produtos_mais_vendidos = ItemPedido.joins(:produto)
                                        .group("produtos.nome")
                                        .sum(:quantidade)
                                        .sort_by { |_nome, total| -total }
                                        .to_h
  end
end
