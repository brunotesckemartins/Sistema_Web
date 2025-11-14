class Admin::EventosController < ApplicationController
  before_action :require_admin
  before_action :set_evento, only: [ :edit, :update, :destroy ]

  def index
    @react_props = { eventos: Evento.all.order(data_evento: :desc) }
  end

  def new
    @react_props = { evento: Evento.new }
  end

  def edit
    @react_props = { evento: @evento }
  end

  def create
    @evento = Evento.new(evento_params)
    if @evento.save
      render json: { message: "Evento criado!", evento: @evento }, status: :created
    else
      render json: { errors: @evento.errors.to_hash(true) }, status: :unprocessable_content
    end
  end

  def update
    if @evento.update(evento_params)
      render json: { message: "Evento atualizado!", evento: @evento }, status: :ok
    else
      render json: { errors: @evento.errors.to_hash(true) }, status: :unprocessable_content
    end
  end

  def destroy
    @evento.destroy
    render json: { message: "Evento excluído!" }, status: :ok
  end

  private

  def set_evento
    @evento = Evento.find(params[:id])
  end

  def evento_params
    params.require(:evento).permit(:nome, :descricao, :data_evento, :status)
  end
end
