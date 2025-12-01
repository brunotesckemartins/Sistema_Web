class Autenticacao::SessionsController < Devise::SessionsController

  def create
    self.resource = warden.authenticate(auth_options)
    
    if resource
      sign_in(resource_name, resource)
      
      respond_to do |format|
        format.json { 
          render json: {
            message: 'Login com sucesso.',
            data: resource
          }, status: :ok 
        }
      end
    else
      respond_to do |format|
        format.json {
          render json: {
            message: 'Email ou senha inválidos.'
          }, status: :unauthorized
        }
      end
    end
  end

  # DELETE /auth/sign_out
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    
    respond_to do |format|
      format.json { render json: { message: 'Logout com sucesso.' }, status: :ok }
      
      format.html { redirect_to root_path, notice: 'Você saiu com sucesso.' }
    end
  end
end