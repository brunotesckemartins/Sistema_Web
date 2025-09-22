Rails.application.routes.draw do
  resources :eventos
  devise_for :usuarios

  root "produtos#index"
  resources :usuarios
  resources :produtos

  post "add_to_carrinho/produto_id", to: "carrinho#add_to_carrinho", as: "add_to_carrinho"

  delete "remove_from_carrinho/produto_id", to: "carrinho#remove_from_cart", as: "remove_from_carrinho"

  get "carrinho", to: "carrinho#show", as: "carrinho"

  namespace :api do
    namespace :v1 do
      resources :produtos, except: [ :new, :edit ]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
