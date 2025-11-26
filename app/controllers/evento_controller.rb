class EventoController < ApplicationController
  def show
    @evento = Evento.find(params[:id])
    render "evento/show"
  end
end
