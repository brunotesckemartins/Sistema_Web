class CreateEventos < ActiveRecord::Migration[8.0]
  def change
    create_table :eventos do |t|
      t.string :nome
      t.text :descricao
      t.datetime :data_evento
      t.string :status

      t.timestamps
    end
  end
end
