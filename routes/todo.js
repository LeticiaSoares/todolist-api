const mongo = require("./mongo")
const ObjectID = require('mongodb').ObjectID;


function save(req, res) {
    const todo = req.body
    const user = getUser(req)
    if(!validUser(user, res)){
        return
    } 
    todo.user = user 
    console.log("Saving todo:" + todo)
    const db = mongo.getDb();
    db.collection("todo").insertOne(todo, function(err,r) {
        if (err != null) {
            res.send(err);
        } else {
            res.status(201).send({msg:"Item salvo"});        
        }
    });
}

function list(req, res) {
    const db = mongo.getDb();
    const user = getUser(req)
    if(!validUser(user, res)){
        return
    }
    db.collection("todo").find({"user": user}).toArray(function(err,docs) {
        if (err != null) {
            res.send(err);
        } else {
            res.status(200).send({todo:docs});  
        }
    });
}

function update(req, res) {
    const db = mongo.getDb();
    const user = getUser(req)
    const todo = req.body
    const id = req.params.id
    todo.user = user
    if(!validUser(user, res)){
        return
    }
    db.collection("todo").findOneAndUpdate({_id: ObjectID(id)}, {$set: todo}, {
        returnOriginal: false
    },function(err,r) {
        if (err != null) {
            res.send(err);
        } else {
            res.status(200).send({msg:"todo atualizad", doc: r.value});  
        }
    });
}

function remove(req, res) {
    const db = mongo.getDb();
    const user = getUser(req)
    const id = req.params.id
    if(!validUser(user, res)){
        return
    }
    db.collection("todo").findOneAndDelete({_id: ObjectID(id), user: user},function(err,r) {
        if (err != null) {
            res.send(err);
        } else {
            console.log(r)
            if (!r.value) {
                res.status(404).send();
            } else {
                res.status(200).send({msg:"Deleted"});
            }
        }
    });
}

function validUser(user, res) {
    if (!user) {
        res.status(400).send({msg: "user is required in header"})
        return false;
    } 
    return true;
}

function getUser(req) {
    return req.get("user")
}

module.exports = {
    list, save, update, remove
}

