class Usuario < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :enderecos, dependent: :destroy
  has_many :pedidos, dependent: :restrict_with_error

  has_one_attached :foto

  def admin?
    admin == true
  end
end
