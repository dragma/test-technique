var Game = require("../model/game-model");
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
var fs = require('fs');

const textToSpeech = new TextToSpeechV1({
  iam_apikey: 'V5Avwuye8DfbxDVWwrxzDcBb43YCT1NL4Q6CSOd0G8b3',
  url: 'https://gateway-lon.watsonplatform.net/text-to-speech/api',
  disable_ssl_verification: true,
});

exports.getVoices = function(req, res) {

	var languages = [];

	textToSpeech.listVoices()
	  .then(voices => {
		voices.voices.forEach(function(element) {
			languages.push(element['name']);
		});
		languages = languages.filter((item, index) => languages.indexOf(item) === index);
		res.json(languages)
	})
	.catch(err => {
		console.log('error:', err);
	});
};

exports.getNewText = function (req, res) {
	
	var paramsSynthese = {};
	
	Game.find({_id:req.params.ID}, function(err, game) {
		paramsSynthese = {};
		if (err) throw err;
		game.forEach(function(element) {
			paramsSynthese = {
				text: element.text,
				accept: 'audio/wav',
				voice: element.voice
			};
		});
	});

	/*textToSpeech.synthesize(paramsSynthese)
	.then(audio => {
		audio.pipe(fs.createWriteStream('test.wav'));
	})
	.catch(err => {
		console.log('error:', err);
	});*/
}

exports.setVoice = function(req, res) {
	Game.updateOne({_id:req.params.ID}, {
		voice: req.body.voice
	}, function(err, game) {
		if (err) throw err;
		res.json(game);
	});
}

exports.getLaps = function(req, res) {

	Game.find({_id:req.params.ID}, function(err, game) {
		if (err) throw err;
		var laps;
		game.forEach(function(element) {
			laps = element.laps;
		});
		res.json(laps);
	});

}

exports.setLaps = function(req, res) {

	Game.updateOne({_id:req.params.ID}, {
		$inc: {
			laps: -1
		}
	}, function(err, game) {
		if (err) throw err;
		res.json(game);
	});
}

exports.addGame = function(req, res) {

	var game = new Game();

	game.laps = req.body.laps;
	game.startSentence = req.body.startSentence;

	game.save(function(err) {
		if (err) throw err;
		res.send({message:"Game parameters added", data: game});
	});
};

exports.updateGame = function(req, res) {

	Game.updateOne({_id:req.params.ID}, {
		laps: req.body.laps,
		startSentence: req.body.startSentence
	}, function (err, game) {
		if (err) throw err;
		res.json(game);
	});

	/*Game.updateOne({_id:req.params.ID}, {
		$set: {
				1: {
					sentence: req.body.sentence,
					note: req.body.note
				}
		}
	}, function(err, game) {
		if (err) throw err;
		res.json(game);
	});*/
};

exports.deleteGame = function(req, res) {

	Game.remove({_id:req.params.ID}, function(err, game) {
		if (err) throw err;
		res.json({message:"game was delete!"});	
	});
};