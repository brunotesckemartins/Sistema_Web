class ProdutosController < ApplicationController
  before_action :set_produto, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token # Apenas para desenvolvimento!

  # GET /produtos
  def index
    @produtos = Produto.all
    render json: @produtos
  end

  # GET /produtos/1
  def show
    render json: @produto
  end

  # POST /produtos
  def create
    @produto = Produto.new(produto_params)

    if @produto.save
      render json: @produto, status: :created
    else
      render json: @produto.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /produtos/1
  def update
    if @produto.update(produto_params)
      render json: @produto
    else
      render json: @produto.errors, status: :unprocessable_entity
    end
  end

  # DELETE /produtos/1
  def destroy
    @produto.destroy
    head :no_content
  end

  private
  def set_produto
    @produto = Produto.find(params[:id])
  end

  def produto_params
    params.require(:produto).permit(:nome, :preco, :categoria, :disponivel)
  end
end