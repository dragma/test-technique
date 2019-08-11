import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
import axios from 'axios';

axios.defaults.baseURL = "http://10.0.2.2:4000";

export default class HomePage extends Component {

	constructor() {
		super();
		this.state = {
			play: "Play",
			number: 1
		};
		this.newGame = this.newGame.bind(this);
		this.onPressPlay = this.onPressPlay.bind(this);
	}

	async newGame() {
		await axios.post("/addGame", {laps: this.state.number}).then(res => {
			console.log(res.data);
		})
		.catch(function(err) {	
			throw err;
		});
	}

	onPressPlay = () => {
		this.newGame();
		this.props.navigation.navigate('Languages', {navigation: this.props.navigation, number: this.state.number});
	}

  render() {
	return (
      <View style={styles.container}>
		<TextInput placeholder="Enter a number of laps" keyboardType={'numeric'} style={styles.textInput}/>
		<TouchableHighlight onPress={this.onPressPlay} style={styles.play}>
			<View>
				<Text style={styles.Text}>{this.state.play}</Text>
			</View>
		</TouchableHighlight>
		</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	alignItems: 'center',
	justifyContent: 'center'
  },
  play: {
	width: 100,
	justifyContent: 'center',
	backgroundColor: '#1E90FF'
  },
  textInput: {
	textAlign: 'center',
	fontSize: 30,
	marginBottom: 50
  },
  Text: {
	height: 50,
	fontSize: 30,
	textAlign: 'center'
  }
});