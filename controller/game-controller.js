var Game = require("../model/game-model");
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
var fs = require('fs');

const speechToText = new SpeechToTextV1({
  iam_apikey: '299x-3QplpAxpSWyw6Q9Cyuhnt5jp83767LThrBkyzOK',
  url: 'https://gateway-lon.watsonplatform.net/speech-to-text/api',
  disable_ssl_verification: true,
});

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

exports.setNewText = function (req, res) {
	
	var paramsSyntheseTextToSpeech = {
		text:"",
		accept: "",
		voice: ""
	};
	
	Game.find({_id:req.params.ID}, function(err, game) {
		if (err) throw err;
		game.forEach(function(element) {
			paramsSyntheseTextToSpeech.text = element.text;
			paramsSyntheseTextToSpeech.accept = "audio/wav";
			paramsSyntheseTextToSpeech.voice = element.voice;
		});
	}).then(function(res) {
		textToSpeech.synthesize(paramsSyntheseTextToSpeech)
		.then(function (audio) {
			audio.pipe(fs.createWriteStream('./test-technique-audio.wav'));
		})
		.catch(function(err) {
			console.log('error:', err);
		});
	}).then(function() {
		res.json("OK");
	});
}

exports.getNewText = function(req, res) {

	var paramsSyntheseSpeechToText = {
		audio: "",
		content_type: "audio/wav",
		model: ""
	};
	
	var newText = "";

	paramsSyntheseSpeechToText.audio = fs.createReadStream('./test-technique-audio.wav');
	paramsSyntheseSpeechToText.model = "es-ES_BroadbandModel";

	speechToText.recognize(paramsSyntheseSpeechToText)
	.then(function(speechRecognition) {
		newText = speechRecognition.results[0].alternatives[0].transcript;
	})
	.catch(function(err) {
		console.log('error:', err);
	}).then(function() {
		res.json(newText);
	});
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