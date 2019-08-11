import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, TextInput, Picker} from 'react-native';
import axios from 'axios';

axios.defaults.baseURL = "http://10.0.2.2:4000";

export default class Languages extends Component {

	constructor() {
		super();
		this.state = {
			run: "Run",
			text: "",
			languages: [],
			language: ""
			//navigation: this.props.navigation.state.params.navigation
		};
		this.onPressRun = this.onPressRun.bind(this);
		this.updateLanguage = this.updateLanguage.bind(this);
		this.updateText = this.updateText.bind(this);
	}

	onPressRun = () => {
		this.props.navigation.state.params.navigation.navigate('HomePage');
	}

	updateLanguage = (lang) => {
		this.setState({language: lang});
		console.log(this.state.language);
	}

	updateText = (textInput) => {
		this.setState({text: textInput});
	}

	async getLang() {
		await axios.get("/getVoices").then(voices => {
			this.setState({languages: voices});
		})
		.catch(function(err) {	
			throw err;
		});
	}

  render() {
	if (this.state.language == "") {
		this.getLang();
		this.state.language = this.state.languages[0];
	}
	this.state.languages.forEach( (v) => {
		console.log(v);
	});
    return (
      <ScrollView>
		<TextInput placeholder="Enter a sentence" style={styles.textInput} onChangeText={this.updateText} value={this.state.text} multiline={true}/>
			<View style={styles.container}>
			<Picker selectedValue = {this.state.language} onValueChange = {(lang) => this.updateLanguage(lang)} style = {styles.selection}>
				{
					this.state.languages.forEach( (v) => {
						return <Picker.Item label={v} value={v} />
					})
				}
			</Picker>
			<TouchableHighlight onPress={this.onPressRun} style={styles.run}>
				<View>
					<Text style={styles.Text}>{this.state.run}</Text>
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
  run: {
	width: 100,
	justifyContent: 'center',
	backgroundColor: 'grey'
  },
  textInput: {
	textAlign: 'center',
	fontSize: 30,
	marginBottom: 50
  },
  selection: {
	width: 200,
	marginBottom: 50
  },
  Text: {
	height: 50,
	fontSize: 30,
	textAlign: 'center'
  }
});