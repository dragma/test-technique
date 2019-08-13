var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var ip = require('ip');
var morgan = require('morgan');

var router = express.Router();

var User = require("./controller/user-controller");
var Game = require("./controller/game-controller");


mongoose.connect('mongodb://localhost:27017/boucheAOreille', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", router);

app.use(morgan('dev'));

//User
router.route("/user/:ID").get(User.getUser);

router.route("/addUser").post(User.addUser);

router.route("/updateUser/:ID").put(User.updateUser);

router.route("/deleteUser/:ID").delete(User.deleteUser);

//Game
router.route("/setNewText/:ID").put(Game.setNewText);

router.route("/getNewText/:ID").get(Game.getNewText);

router.route("/getVoices").get(Game.getVoices);

router.route("/setVoice/:ID").put(Game.setVoice);

router.route("/getLaps/:ID").get(Game.getLaps);

router.route("/setLaps/:ID").put(Game.setLaps);

router.route("/addGame").post(Game.addGame);

router.route("/updateGame/:ID").put(Game.updateGame);

router.route("/getPrevioustext/:ID").get(Game.getPreviousText);

router.route("/getCurrentText/:ID").get(Game.getCurrentText);

router.route("/getNote/:ID").get(Game.getNote);

router.route("/setText/:ID").put(Game.setText);

router.route("deleteGame/:ID").delete(Game.deleteGame);


app.listen(4000, () => console.log(`Server started. Pleas start app with 'SERVER_HOST=http://${ip.address()} SERVER_PORT=4000 yarn start'.`));