const todo = require("./routes/todo");
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.post("/todo-api/todo", todo.save);
app.get("/todo-api/todo", todo.list);
app.put("/todo-api/todo/:id", todo.update);
app.delete("/todo-api/todo/:id", todo.remove);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Listening on port " + PORT));