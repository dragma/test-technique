import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
import axios from 'axios';

axios.defaults.baseURL = "http://10.0.2.2:4000";

export default class HomePage extends Component {

	constructor() {
		super();
		this.state = {
			play: "Play",
			laps: 1,
			_id: 0
		};
		this.newGame = this.newGame.bind(this);
		this.onPressPlay = this.onPressPlay.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
	}

	async newGame() {
		await axios.post("/addGame", {laps: this.state.laps}).then(res => {
			console.log(res.data);
			//this.setState({_id: res.data._id});
		})
		.catch(function(err) {	
			throw err;
		});
	}

	onChangeText = (number) => {
		this.setState({laps: number});
	}

	onPressPlay = () => {
		this.newGame();
		this.props.navigation.navigate('Languages', {navigation: this.props.navigation, _id: this.state._id});
	}

  render() {
	return (
      <View style={styles.container}>
		<TextInput placeholder="Enter a number of laps" onChangeText={(number) => this.onChangeText} keyboardType={'numeric'} style={styles.textInput}/>
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