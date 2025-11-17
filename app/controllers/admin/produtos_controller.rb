class Admin::ProdutosController < ApplicationController
  before_action :require_admin
  before_action :set_produto, only: [ :edit, :update, :destroy ]

  def index
    produtos = Produto.all.order(id: :asc).map do |p|
      p.as_json.merge(
        imagem_url: p.imagem.attached? ? url_for(p.imagem) : nil,
        categoria_nome: p.categoria&.nome
      )
    end
    @react_props = { produtos: produtos }
  end

  def new
    @react_props = {
      produto: Produto.new,
      categorias: Categoria.all.map { |c| { id: c.id, nome: c.nome } }
    }
  end

  def edit
    @react_props = {
      produto: @produto.as_json.merge(
        imagem_url: @produto.imagem.attached? ? url_for(@produto.imagem) : nil
      ),
      categorias: Categoria.all.map { |c| { id: c.id, nome: c.nome } }
    }
  end

  def create
    @produto = Produto.new(produto_params)
    if @produto.save
      render json: { message: "Produto criado!", produto: @produto }, status: :created
    else
      render json: { errors: @produto.errors.to_hash(true) }, status: :unprocessable_content
    end
  end

  def update
    if @produto.update(produto_params)
      render json: { message: "Produto atualizado!", produto: @produto }, status: :ok
    else
      render json: { errors: @produto.errors.to_hash(true) }, status: :unprocessable_content
    end
  end

  def destroy
    @produto.item_pedidos.destroy_all
    if @produto.destroy
      render json: { message: "Produto excluído!" }, status: :ok
    else
      render json: { message: @produto.errors.full_messages.to_sentence }, status: :unprocessable_content
    end
  end

  private

  def set_produto
    @produto = Produto.find(params[:id])
  end

  def produto_params
    params.require(:produto).permit(:nome, :descricao, :preco, :categoria_id, :imagem)
  end
end
