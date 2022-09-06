const express = require("express");
const app = express();

app.use(express.static("../GameOfLiveSpellLight"));

app.get("/", function(req, res){res.redirect("index.html")});

app.get("/name/:name", function(req,res){
    let name = req.params.name;
    res.send("<h1>Hello " + name + "</h1>");
});

app.get("/google/:item", function(req, res){
    res.redirect("https://www.google.com/search?q=" + req.params.item);
})

app.get("/*", function(req, res){
    res.status(404).send("Funktion not implamented yet");
})

app.listen(3000, function(){console.log("Server listen port on 3000");});

