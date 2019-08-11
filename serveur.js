var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var router = express.Router();

var User = require("./controller/user-controller");
var Game = require("./controller/game-controller");


mongoose.connect('mongodb://localhost:27017/boucheAOreille', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", router);

//User
router.route("/user/:ID").get(User.getUser);

router.route("/addUser").post(User.addUser);

router.route("/updateUser/:ID").put(User.updateUser);

router.route("/deleteUser/:ID").delete(User.deleteUser);

//Game
router.route("/getVoices").get(Game.getVoices);

router.route("/addGame").post(Game.addGame);

router.route("/updateGame/:ID").put(Game.updateGame);

router.route("deleteGame/:ID").delete(Game.deleteGame);


app.listen(4000);