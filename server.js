var http = require("http");
var fs = require("fs");
var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var friends = 
    [{
        name: "Johnny Bravo",
        photo: "https://www.turner.com/s3fs-public/image_u/img_johnny-bravo-flexing-2.jpg",
        scores: [5, 1, 3, 4, 5, 2, 2, 5, 4, 1]
    },
    {
        name: "Samurai Jack",
        photo: "http://media.comicbook.com/2017/10/36190303uan-samuraijack-1449189177030-1280w-skmh-1038393.jpg",
        scores: [1, 3, 4, 5, 2, 2, 5, 4, 1, 4]
    },
    {
        name: "Dexter",
        photo: "https://media.proprofs.com/images/QM/user_images/1454808/1462530414.jpg",
        scores: [3, 4, 2, 1, 2, 5, 5, 3, 2, 3]
    },
    {
        name: "Archer",
        photo: "https://www.thoughtco.com/thmb/0fESXCjKOtsRyCvQ602kQSjEpjU=/1200x800/filters:no_upscale()/archer_closeup-56a00f9f3df78cafda9fde1c.png",
        scores: [2, 1, 2, 5, 5, 3, 2, 3, 5, 4]
    },
    {
        name: "Mr. Bean",
        photo: "https://www.capitalfm.co.ke/lifestyle/files/mobile/2018/10/web-mr-bean-atkinson-bbc-uk-600x400.jpg",
        scores: [4, 2, 1, 2, 2, 5, 3, 2, 3, 1]
    } 
]  

app.use(express.static("app/public"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

app.get("/api/friends/:friend", function(req, res) {
    var chosen = req.params.friend;
    console.log(chosen);
    for (var i = 0; i < friends.length; i++) {
        if (chosen === friends[i].name) {
        return res.json(friends[i]);
        }
    }
    return res.json(false);
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.post("/api/friends", function(req, res) {
    var newFriend = req.body;
  
    newFriend.name = newFriend.name.replace(/\s+/g, "").toLowerCase();
    
    console.log(newFriend);
    friends.push(newFriend);
    res.json(newFriend);
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });