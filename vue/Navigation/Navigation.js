import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomePage from '../Home/HomePage';
import Languages from '../Languages/Languages';
import Game from '../Game/Game';

const Navigation = createStackNavigator(
	{
		HomePage:
		{
			screen: HomePage
		},
		Languages:
		{
			screen: Languages
		},
		Game:
		{
			screen: Game
		}
	},
	{
		initialRouteName: "HomePage"
	}
);

const Nav = createAppContainer(Navigation);

export default Nav;