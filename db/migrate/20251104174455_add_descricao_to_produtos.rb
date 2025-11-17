class AddDescricaoToProdutos < ActiveRecord::Migration[8.0]
  def change
    add_column :produtos, :descricao, :text
  end
end
