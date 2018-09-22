const mongo = require("../mongo")
function save(req, res) {
    const todo = req.body
    const user = req.get("user")
    if (!user) {
        res.status(400).send({msg: "user is required in header"})
        return
    }   
    todo.user = user 
    console.log("Saving todo:" + todo)
    const db = mongo.getDb();
    db.collection("todo").insertOne(todo, function(err,r) {
        if (err != null) {
            res.send(err);
        } else {
            res.send({"msg":"Item salvo", "status": 200});        
        }
    });
}

function list(req, res) {
    const db = mongo.getDb();
    const user = req.get("user")
    if (!user) {
        res.status(400).send({msg: "user is required in header"})
        return
    }   
    db.collection("todo").find({"user": user}).toArray(function(err,docs) {
        if (err != null) {
            res.send(err);
        } else {
            res.send({"todo": docs});        
        }
    });
}


module.exports = {
    list, save
}

