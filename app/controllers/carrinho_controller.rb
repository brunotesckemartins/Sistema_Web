class CarrinhoController < ApplicationController
  def add_to_carrinho
    session[:carrinho] ||= {}

    produto_id = params[:produto_id]

    session[:carrinho][produto_id] = (session[:carrinho][produto_id].to_i + 1)

    redirect_to produtos_path, notice: "Produto adicionado ao carrinho!"
  end

  def show
    carrinho_hash = session[:carrinho] || {}

    ids_dos_produtos = carrinho_hash.keys.map(&:to_i)

    @produtos_no_carrinho = Produto.where(id: ids_dos_produtos).to_a
  end

  def remove_from_cart
    produto_id = params[:produto_id]

    session[:carrinho].delete(produto_id)

    redirect_to carrinho_path, notice: "Produto removido do carrinho."
  end
end
