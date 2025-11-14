class Produto < ApplicationRecord
  has_one_attached :imagem
  has_many :promocoes
  belongs_to :categoria

  has_many :item_pedidos
end
