class EventosController < ApplicationController
  before_action :set_evento, only: %i[ show edit update destroy ]
  before_action :require_admin, only: [ :new, :create, :edit, :update, :destroy ]

  def index
    @eventos = Evento.all
  end

  def show
  end

  def new
    @evento = Evento.new
  end

  def edit
  end

  def create
    @evento = Evento.new(evento_params)

    respond_to do |format|
      if @evento.save
        format.html { redirect_to @evento, notice: "Evento was successfully created." }
        format.json { render :show, status: :created, location: @evento }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @evento.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @evento.update(evento_params)
        format.html { redirect_to @evento, notice: "Evento was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @evento }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @evento.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @evento.destroy!

    respond_to do |format|
      format.html { redirect_to eventos_path, notice: "Evento was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    def set_evento
      @evento = Evento.find(params.expect(:id))
    end

    def evento_params
      params.expect(evento: [ :nome, :descricao, :data_evento, :status ])
    end
end
