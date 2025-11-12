class ApplicationController < ActionController::Base
  allow_browser versions: :modern
  helper ViteRails::TagHelpers
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    custom_keys = [ :login, :telefone, :cep, :endereco ]

    devise_parameter_sanitizer.permit(:sign_up, keys: [ :email, :password, :password_confirmation ] + custom_keys)
    devise_parameter_sanitizer.permit(:account_update, keys: [ :email, :password, :password_confirmation, :current_password ] + custom_keys)
  end

  private

  def require_admin
    unless current_usuario && current_usuario.admin?
      flash[:alert] = "Você não tem permissão para acessar esta página."
      redirect_to root_path
    end
  end
end
