let db = require("./db/db.json");
let express = require("express");
let path = require("path");
let fs = require("fs");

// Tells node we are creating an express server
let app = express();

// Sets an initial port. This also ensure's that it will be compatable with Heroku
let PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allows express to access static files in "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic route that sends the user first to the AJAX Pages
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// API to store objects as JSON 
app.get("/api/notes", function(req, res){
   return res.json(db)
})


//POST New note to server
app.post("/api/notes", function(req, res){
    const createdNote = {
        title: req.body.title,
        text: req.body.text,
        id: db.length + 1
    };

    db.push(createdNote)
    res.json(createdNote) 
});


app.delete("/api/notes/:id", function(req, res){
    db = db.filter(note => note.id !== parseInt(req.params.id))
    console.log(db)
    res.json(db)
})


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});