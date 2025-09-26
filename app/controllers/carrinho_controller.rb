class CarrinhoController < ApplicationController
  def add_to_carrinho
    session[:carrinho] ||= {}

    produto_id = params[:produto_id]

    session[:carrinho][produto_id] = (session[:carrinho][produto_id].to_i + 1)

    redirect_to produtos_path, notice: "Produto adicionado ao carrinho!"
  end

  def show
    ids_produtos = (session[:carrinho] || {}).keys.map(&:to_i)

    @produtos_do_carrinho = Produto.where(id: ids_produtos).to_a

  rescue ActiveRecord::RecordNotFound
    @produtos_do_carrinho = []
  end

  def remover_do_carrinho
    session[:carrinho].delete(params[:produto_id])
    redirect_to produtos_path, notice: "Produto removido do carrinho!"
  end
end
