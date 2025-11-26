json.extract! evento, :id, :nome, :descricao, :data_evento, :status, :created_at, :updated_at
json.url evento_url(evento, format: :json)
