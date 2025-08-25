class Produto < ApplicationRecord
  has_one_attached :imagem

  belongs_to :categoria
end
