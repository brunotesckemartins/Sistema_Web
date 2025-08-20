Rails.application.routes.draw do
  devise_for :usuarios

  root "produtos#index"
  resources :usuarios
  resources :produtos
  namespace :api do
    namespace :v1 do
      # Rotas RESTful padrão para Produtos
      resources :produtos, except: [ :new, :edit ]  # Remove rotas de views HTML
    end
  end

  # Health check (opcional)
  get "up" => "rails/health#show", as: :rails_health_check
end
