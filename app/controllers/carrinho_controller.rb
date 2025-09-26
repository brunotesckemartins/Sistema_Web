class CarrinhoController < ApplicationController
  def add_to_carrinho
    session[:carrinho] ||= {}

    produto_id = params[:produto_id].to_s

    session[:carrinho][produto_id] = (session[:carrinho][produto_id].to_i + 1)

    redirect_to produtos_path, notice: "Produto adicionado ao carrinho!"
  end

  def show
    ids_produtos = (session[:carrinho] || {}).keys.map(&:to_i)

    @produtos_do_carrinho = Produto.where(id: ids_produtos)
  rescue ActiveRecord::RecordNotFound
    @produtos_do_carrinho = []
  end

  def remover_do_carrinho
    produto_id = params[:produto_id].to_s
    session[:carrinho]&.delete(produto_id)
    redirect_to carrinho_path, notice: "Produto removido do carrinho."
  end
end
