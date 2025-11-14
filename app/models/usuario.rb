class Usuario < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :enderecos, dependent: :destroy

  has_many :pedidos, dependent: :restrict_with_error
end
