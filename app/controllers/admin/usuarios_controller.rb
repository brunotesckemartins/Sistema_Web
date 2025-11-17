class Admin::UsuariosController < ApplicationController
  before_action :require_admin
  before_action :set_usuario, only: [ :edit, :update, :destroy ]

  def index
    @react_props = { usuarios: Usuario.all.order(id: :asc) }
  end

  def new
    @react_props = { usuario: Usuario.new }
  end

  def edit
    @react_props = { usuario: @usuario }
  end

  def create
    @usuario = Usuario.new(usuario_params)
    if @usuario.save
      render json: { message: "Usuário criado!", usuario: @usuario }, status: :created
    else
      render json: { errors: @usuario.errors.to_hash(true) }, status: :unprocessable_entity
    end
  end

  def update
    if @usuario.update(usuario_params)
      render json: { message: "Usuário atualizado!", usuario: @usuario }, status: :ok
    else
      render json: { errors: @usuario.errors.to_hash(true) }, status: :unprocessable_entity
    end
  end

  def destroy
    if @usuario.destroy
      render json: { message: "Usuário excluído!" }, status: :ok
    else
      render json: {
        message: @usuario.errors.full_messages.to_sentence
      }, status: :unprocessable_entity
    end
  end

  private

  def set_usuario
    @usuario = Usuario.find(params[:id])
  end

  def usuario_params
    dados = params[:usuario] ? params.require(:usuario) : params

    dados.permit(
      :email, :password, :password_confirmation,
      :login, :telefone, :cep, :endereco, :admin
    )
  end
end
