class EventosController < ApplicationController
  before_action :set_evento, only: %i[ show ]

  def index
    @eventos = Evento.all
  end

  def show
  end

  private

  def set_evento
    @evento = Evento.find(params[:id])
  end
end
