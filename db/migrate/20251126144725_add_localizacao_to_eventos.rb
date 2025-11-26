class AddLocalizacaoToEventos < ActiveRecord::Migration[8.0]
  def change
    add_column :eventos, :localizacao, :string
  end
end
