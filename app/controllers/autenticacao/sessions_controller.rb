class Autenticacao::SessionsController < Devise::SessionsController
  respond_to :html, only: [ :new ]
  respond_to :json, only: [ :create, :destroy ]

  def create
    self.resource = warden.authenticate(auth_options)

    if resource
      sign_in(resource_name, resource)
      render json: {
        message: "Login com sucesso.",
        data: resource
      }, status: :ok
    else
      render json: {
        message: "Email ou senha inválidos."
      }, status: :unauthorized
    end
  end

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    render json: { message: "Logout com sucesso." }, status: :ok
  end
end
