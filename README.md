# todolist-api
A simple todolist api

Server: https://leh-todo-v2.herokuapp.com/


# Resources
## Ping

curl -X GET https://leh-todo-v2.herokuapp.com/ping

Response: 200 pong


## Todo - Save

curl -X POST \
  https://leh-todo-v2.herokuapp.com/todo \
  -H 'user: bdm' \
  -d '{"name":"Compras", "desc": "Comprar comida"}'

Response: 200 {"msg":"Item salvo"}

### Todo - List

curl -X GET https://leh-todo-v2.herokuapp.com/todo -H 'user: bdm'

Response: 200 {"todo":[{"_id":"5be235afe0469800167d7ad2","name":"Compras","desc":"Comprar comida","user":"bdm"}]}


### Todo - Update

curl -X PUT \
  https://leh-todo-v2.herokuapp.com/todo/*:id* \
  -H 'user: bdm' \
  -d '{"name":"Vendas", "desc": "Vender comida"}'

Response: 200 


