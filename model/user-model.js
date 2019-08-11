var mongoose = require("mongoose");

var User = mongoose.Schema({
	firstName: {
		type: String,
		require: true
	},
	lastName: {
		type: String,
		require: true
	}
});

module.exports = mongoose.model("User", User);