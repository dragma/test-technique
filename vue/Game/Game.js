import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, TextInput, Picker} from 'react-native';
import axios from 'axios';

axios.defaults.baseURL = "http://10.0.2.2:4000";

export default class Languages extends Component {

	constructor() {
		super();
		this.state = {
			next: "Next",
			laps: 0,
			previousText: "",
			currentText: ""
		};
		this.onPressNext = this.onPressNext.bind(this);
		this.getPreviousText = this.getPreviousText.bind(this);
		this.getCurrentText = this.getCurrentText.bind(this);
	}
	
	onPressNext = () => {
		this.setLaps();
		this.props.navigation.state.params.navigation.navigate('Game');
	}
	getPreviousText() {
		this.setState({previousText:"lololo"});
	}

	getcurrentText() {
		this.setState({currentText:"bfubefubre"});
	}

	async setLaps() {
		await axios.get("/setLaps/" + this.props._id).then(res => {
			this.setState({laps: res});
		})
		.catch(function(err) {	
			throw err;
		});
	}

	async getLaps() {
		await axios.get("/getLaps/" + this.props._id).then(res => {
			this.setState({laps: res});
		})
		.catch(function(err) {	
			throw err;
		});
	}
	/*
	async getPreviousText() {
		await axios.get("/getPreviousText/" + this.props._id).then(res => {
			this.setState({previousText: res})
		})
		.catch(function(err) {	
			throw err;
		});
	}

	async getCurrentText() {
		await axios.get("/getCurrentText/" + this.props._id).then(res => {
			this.setState({currentText: res})
		})
		.catch(function(err) {	
			throw err;
		});
	}*/

  render() {
	this.getLaps();
	if (this.state.laps == 0) {
		return (
			<ScrollView>
				<View style={styles.container}>
				</View>
			</ScrollView>
		)
	}
    return (
      <ScrollView>
			<View style={styles.container}>
			<Text style={styles.text}>
				{this.getPreviousText}
			</Text>
			<Text style={styles.text}>
				{this.getCurrentText}
			</Text>
			<TouchableHighlight onPress={this.onPressNext} style={styles.next}>
				<View>
					<Text style={styles.Text}>{this.state.next}</Text>
				</View>
			</TouchableHighlight>
			</View>
		</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	alignItems: 'center',
	justifyContent: 'center'
  },
  next: {
	width: 100,
	justifyContent: 'center',
	backgroundColor: 'grey'
  },
  text: {
	height: 50,
	fontSize: 30,
	textAlign: 'center'
  }
});