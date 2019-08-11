var Game = require("../model/game-model");
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');

const textToSpeech = new TextToSpeechV1({
  iam_apikey: 'V5Avwuye8DfbxDVWwrxzDcBb43YCT1NL4Q6CSOd0G8b3',
  url: 'https://gateway-lon.watsonplatform.net/text-to-speech/api',
  disable_ssl_verification: true,
});

exports.getVoices = function(req, res) {

	var languages = [];

	textToSpeech.listVoices()
	  .then(voices => {
		voices.voices.forEach(function(element){
			languages.push(element['language']);
		});
		languages = languages.filter((item, index) => languages.indexOf(item) === index);
		res.json(languages)
	})
	.catch(err => {
		console.log('error:', err);
	});
};

exports.addGame = function(req, res) {

	var game = new Game();

	game.laps = req.body.laps;
	game.sentence = req.body.sentence;

	game.save(function(err) {
		if (err) throw err;
		res.send({message:"Game parameters added", data: game});
	});
};

exports.updateGame = function(req, res) {

	Game.updateOne({_id:req.params.ID}, {
		sentence:req.body.sentence,
		laps:req.body.laps
	}, function(err, game) {
		if (err) throw err;
		res.json(game);
	});
};

exports.deleteGame = function(req, res) {

	Game.remove({_id:req.params.ID}, function(err, game) {
		if (err) throw err;
		res.json({message:"game was delete!"});	
	});
};