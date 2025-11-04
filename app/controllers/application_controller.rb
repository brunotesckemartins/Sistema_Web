class ApplicationController < ActionController::Base
  allow_browser versions: :modern
  helper ViteRails::TagHelpers

  private

  def require_admin
    unless current_usuario && current_usuario.admin?
      flash[:alert] = "Você não tem permissão para acessar esta página."
      redirect_to root_path
    end
  end
  # ---------------------------------------------------
end
