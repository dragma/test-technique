var mongoose = require("mongoose");

var Game = mongoose.Schema({
	laps: {
		type: Number,
		default: 1,
		require: true
	},
	startSentence: {
		type: String,
		default: "",
		require: true
	},
	text: {
		type: String,
		default: "",
		require: true
	},
	voice: {
		type: String,
		dafault: "",
		require: true
	}
});

module.exports = mongoose.model("Game", Game);