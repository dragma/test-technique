var mongoose = require("mongoose");

var Game = mongoose.Schema({
	laps: {
		type: Number,
		default: 1,
		require: true
	},
	sentence: {
		type: String,
		default: "",
		require: true
	}
});

module.exports = mongoose.model("Game", Game);