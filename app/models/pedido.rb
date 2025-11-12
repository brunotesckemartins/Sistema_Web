class Pedido < ApplicationRecord
  belongs_to :usuario
  has_many :item_pedidos
end
