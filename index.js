const todo = require("./routes/todo");
const users = require("./routes/user");
const utils = require("./routes/utils");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Todo-list.postman_collection-Swagger20.json');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, user");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});


app.get("/ping", (req, res) => {
    res.send("pong");
});

app.use(utils.validateUser)
app.post("/todo", todo.save);
app.get("/todo", todo.list);
app.put("/todo/:id", todo.update);
app.delete("/todo/:id", todo.remove);
app.post("/users", users.signUp);
app.post("/users/login", users.login);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Listening on port " + PORT));
