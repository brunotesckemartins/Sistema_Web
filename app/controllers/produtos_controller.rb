class ProdutosController < ApplicationController
  before_action :set_produto, only: %i[ show ]

  def index
    redirect_to root_path
  end

  def show
    @react_props = {
      produto: {
        id: @produto.id,
        nome: @produto.nome,
        descricao: @produto.descricao,
        preco: @produto.preco,
        categoria: @produto.categoria&.nome,
        imagem_url: @produto.imagem.attached? ? url_for(@produto.imagem) : nil
      }
    }
  end

  private

  def set_produto
    @produto = Produto.find(params[:id])
  end
end
