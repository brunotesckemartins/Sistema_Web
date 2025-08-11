json.extract! produto, :id, :nome, :preco, :categoria, :disponivel, :created_at, :updated_at
json.url produto_url(produto, format: :json)
