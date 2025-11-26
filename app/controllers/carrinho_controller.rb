class CarrinhoController < ApplicationController
  skip_before_action :verify_authenticity_token, if: :json_request?

  def show
    @carrinho_hash = session[:carrinho] || {}
    ids_dos_produtos = @carrinho_hash.keys.map(&:to_i)
    produtos = Produto.where(id: ids_dos_produtos).to_a

    total_preco = 0
    itens_completos = produtos.map do |produto|
      quantidade = @carrinho_hash[produto.id.to_s].to_i
      total_item = produto.preco * quantidade
      total_preco += total_item

      produto.attributes.merge(
        quantidade: quantidade,
        total_item: total_item,
        imagem_url: produto.imagem.attached? ? url_for(produto.imagem) : nil
      )
    end

    cart_data = {
      itens: itens_completos,
      total_geral: total_preco
    }

    respond_to do |format|
      format.html {
        @react_props = { initialCart: cart_data }
      }
      format.json {
        render json: cart_data
      }
    end
  end

  def add_to_carrinho
    session[:carrinho] ||= {}
    produto_id = params[:produto_id].to_s
    session[:carrinho][produto_id] = (session[:carrinho][produto_id].to_i + 1)
    render json: { notice: "Produto adicionado!" }, status: :ok
  end

  def decrease_quantity
    session[:carrinho] ||= {}
    produto_id = params[:produto_id].to_s

    if session[:carrinho][produto_id].to_i > 1
      session[:carrinho][produto_id] = session[:carrinho][produto_id].to_i - 1
    else
      session[:carrinho].delete(produto_id)
    end

    render json: { notice: "Quantidade diminuída." }, status: :ok
  end

  def remove_from_cart
    session[:carrinho] ||= {}
    produto_id = params[:produto_id].to_s
    session[:carrinho].delete(produto_id)
    render json: { notice: "Produto removido." }, status: :ok
  end

  def comprar_agora
  produto = Produto.find(params[:produto_id])

  session[:carrinho] = { produto.id.to_s => "1" }

  redirect_to carrinho_path
end

  private

  def json_request?
    request.format.json?
  end
end
