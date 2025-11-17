class PerfilController < ApplicationController
  before_action :authenticate_usuario!
  skip_before_action :verify_authenticity_token

  # GET /perfil
  def show
    if request.format.json?
      foto_url = current_usuario.foto.attached? ? url_for(current_usuario.foto) : nil

      render json: {
        id: current_usuario.id,
        nome: current_usuario.nome,
        email: current_usuario.email,
        telefone: current_usuario.telefone,
        cep: current_usuario.cep,
        endereco: current_usuario.endereco,
        foto: foto_url,
        login: current_usuario.login
      }
    else
      render :show
    end
  end

  # PUT /perfil
  def update
    usuario_params = params.permit(:nome, :email, :telefone, :cep, :endereco, :foto, :login)

    if current_usuario.update(usuario_params)
      foto_url = current_usuario.foto.attached? ? url_for(current_usuario.foto) : nil
      render json: { message: "Perfil atualizado!", foto: foto_url }, status: :ok
    else
      render json: { errors: current_usuario.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /perfil/senha
  def update_password
    password_params = params.require(:usuario).permit(:current_password, :password, :password_confirmation)

    if current_usuario.update_with_password(password_params)
      bypass_sign_in(current_usuario)
      render json: { message: "Senha alterada com sucesso!" }, status: :ok
    else
      render json: { errors: current_usuario.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
