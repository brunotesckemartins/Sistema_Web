class Admin::PromocoesController < ApplicationController
  before_action :require_admin
  before_action :set_promocao, only: [ :edit, :update, :destroy ]

  def index
    promocoes = Promocao.includes(:produto).all.order(id: :asc)

    promocoes_props = promocoes.map do |p|
      p.as_json.merge(
        produto_nome: p.produto.nome,
        preco_original: p.produto.preco
      )
    end

    @react_props = { promocoes: promocoes_props }
  end

  def new
    @react_props = {
      promocao: Promocao.new,
      produtos: Produto.all.select(:id, :nome, :preco)
    }
  end

  def edit
    @react_props = {
      promocao: @promocao,
      produtos: Produto.all.select(:id, :nome, :preco)
    }
  end

  def create
    @promocao = Promocao.new(promocao_params)
    if @promocao.save
      render json: { message: "Promoção criada!", promocao: @promocao }, status: :created
    else
      render json: { errors: @promocao.errors.to_hash(true) }, status: :unprocessable_content
    end
  end

  def update
    if @promocao.update(promocao_params)
      render json: { message: "Promoção atualizada!", promocao: @promocao }, status: :ok
    else
      render json: { errors: @promocao.errors.to_hash(true) }, status: :unprocessable_content
    end
  end

  def destroy
    @promocao.destroy
    render json: { message: "Promoção excluída!" }, status: :ok
  end

  private

  def set_promocao
    @promocao = Promocao.find(params[:id])
  end

  def promocao_params
    params.require(:promocao).permit(:nome_promocao, :preco_promocional, :produto_id)
  end
end
