class AddFieldsToUsuarios < ActiveRecord::Migration[8.0]
  def change
    add_column :usuarios, :login, :string
    add_column :usuarios, :telefone, :string
    add_column :usuarios, :cep, :string
    add_column :usuarios, :endereco, :text
  end
end
