Rails.application.routes.draw do
  resources :eventos
  resources :pedidos, only: [ :create, :index, :show ]
  devise_for :usuarios,
             path: "auth",
             controllers: {
               registrations: "autenticacao/registrations",
               sessions: "autenticacao/sessions"
             }

  root "pages#home"
  resources :usuarios
  resources :produtos

  post "add_to_carrinho/:produto_id", to: "carrinho#add_to_carrinho", as: "add_to_carrinho"

  post "decrease_quantity/:produto_id", to: "carrinho#decrease_quantity", as: "decrease_quantity"

  delete "remove_from_carrinho/:produto_id", to: "carrinho#remove_from_cart", as: "remove_from_carrinho"

  get "carrinho", to: "carrinho#show", as: "carrinho"

  get "admin/dashboard", to: "admin#dashboard"

  namespace :api do
    namespace :v1 do
      resources :produtos, except: [ :new, :edit ]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
