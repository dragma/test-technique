import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomePage from '../Home/HomePage';
import Languages from '../Languages/Languages';

const Navigation = createStackNavigator(
	{
		HomePage:
		{
			screen: HomePage
		},
		Languages:
		{
			screen: Languages
		}
	},
	{
		initialRouteName: "HomePage"
	}
);

const Nav = createAppContainer(Navigation);

export default Nav;