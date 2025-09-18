Rails.application.routes.draw do
  resources :eventos
  devise_for :usuarios

  root "produtos#index"
  resources :usuarios
  resources :produtos

  post 'add_to_cart/produto_id', to: 'cart#add_to_cart', as: 'add_to_cart'

  delete 'remove_from_cart/produto_id', to: 'cart#remove_from_cart', as: 'remove_from_cart'

  get 'cart', to: 'cart#show', as: 'cart'

  namespace :api do
    namespace :v1 do
      resources :produtos, except: [ :new, :edit ]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
