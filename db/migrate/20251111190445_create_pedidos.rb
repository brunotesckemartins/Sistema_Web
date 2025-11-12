class CreatePedidos < ActiveRecord::Migration[8.0]
  def change
    create_table :pedidos do |t|
      t.references :usuario, null: false, foreign_key: true
      t.string :status
      t.decimal :total

      t.timestamps
    end
  end
end
