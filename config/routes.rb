Rails.application.routes.draw do
  devise_for :usuarios,
             path: "auth",
             controllers: {
               registrations: "autenticacao/registrations",
               sessions: "autenticacao/sessions"
             }

  root "pages#home"

  resource :perfil, only: [ :show, :update ], controller: "perfil" do
    collection do
      put "senha", to: "perfil#update_password"
    end
  end

  resources :produtos, only: [ :show ] do
    member do
      post "comprar_agora"
    end
  end

  resources :eventos, only: [ :show ], controller: "evento"

  resources :pedidos, only: [ :create, :index, :show ] do
    member do
      post "confirmar_pagamento"
    end
  end

  post "add_to_carrinho/:produto_id", to: "carrinho#add_to_carrinho", as: "add_to_carrinho"
  post "decrease_quantity/:produto_id", to: "carrinho#decrease_quantity", as: "decrease_quantity"
  delete "remove_from_carrinho/:produto_id", to: "carrinho#remove_from_cart", as: "remove_from_carrinho"
  get "carrinho", to: "carrinho#show", as: "carrinho"

  get "produtos", to: redirect("/")
  get "eventos", to: redirect("/")

  get "admin/dashboard", to: "admin#dashboard"

  namespace :admin do
    resources :produtos
    resources :eventos
    resources :usuarios
    resources :pedidos, only: [ :index, :edit, :update ]
    resources :promocoes
  end

  namespace :api do
    namespace :v1 do
      resources :produtos, except: [ :new, :edit ]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
