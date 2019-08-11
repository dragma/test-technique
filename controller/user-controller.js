var User = require("../model/user-model");

exports.getUser = function(req, res) {

	User.find({_id:req.params.ID}, function(err, user) {
		
		if (err) throw err;
		res.json(user);

	});
};

exports.getUsers = function(req, res) {
	
	User.find({Id:req.params.ID}, function(err, user) {
	
		if (err) throw err;
		res.json(user);

	});

};

exports.addUser = function(req, res) {

	var user = new User();

	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;

	user.save(function(err) {
		if (err) throw err;

		res.send({message:"User added", data: user});
	});
};

exports.updateUser = function(req, res) {

	User.updateOne({_id:req.params.ID}, {
		fisrtName:req.body.fisrtName,
		lastName:req.body.lastName
	}, function(err, user) {
		
		if (err) throw err;
		res.json(user);
	});
};

exports.deleteUser = function(req, res) {

	User.remove({_id:req.params.ID}, function(err, user) {
		if (err) throw err;
		res.json({message:"user was delete!"});	
	});

};