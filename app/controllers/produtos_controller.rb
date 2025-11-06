class ProdutosController < ApplicationController
  before_action :set_produto, only: %i[ show edit update destroy ]
  before_action :require_admin, only: [ :new, :create, :edit, :update, :destroy ]

  def index
    @produtos = Produto.all
  end

  def show
    @react_props = {
      produto: {
        id: @produto.id,
        nome: @produto.nome,
        descricao: @produto.descricao,
        preco: @produto.preco,
        categoria: @produto.categoria&.nome
      }
    }
  end

  def new
    @produto = Produto.new
  end

  def edit
  end

  def create
    @produto = Produto.new(produto_params)
    respond_to do |format|
      if @produto.save
        format.html { redirect_to @produto, notice: "Produto was successfully created." }
        format.json { render :show, status: :created, location: @produto }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @produto.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @produto.update(produto_params)
        format.html { redirect_to @produto, notice: "Produto was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @produto }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @produto.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @produto.destroy!
    respond_to do |format|
      format.html { redirect_to produtos_path, notice: "Produto was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    def set_produto
      @produto = Produto.find(params.expect(:id))
    end

    def produto_params
      params.require(:produto).permit(:nome, :descricao, :preco, :foto_url, :imagem, :categoria_id)
    end
end
