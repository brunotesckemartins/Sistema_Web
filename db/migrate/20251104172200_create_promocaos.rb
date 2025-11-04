class CreatePromocaos < ActiveRecord::Migration[8.0]
  def change
    create_table :promocaos do |t|
      t.string :nome_promocao
      t.decimal :preco_promocional
      t.references :produto, null: false, foreign_key: true

      t.timestamps
    end
  end
end
