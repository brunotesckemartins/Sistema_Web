class Autenticacao::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  before_action :configure_permitted_parameters, if: :devise_controller?

  def create
    build_resource(sign_up_params)

    resource.save

    if resource.persisted?
      sign_up(resource_name, resource)
      render json: { message: "Cadastro realizado com sucesso!" }, status: :ok
    else
      render json: {
        message: "Não foi possível criar a conta.",
        errors: resource.errors.to_hash(true)
      }, status: :unprocessable_content
    end
  end
end
