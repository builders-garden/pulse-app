import 'react-native-gesture-handler';
// organize-imports-disable-next-line
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';

AppRegistry.registerComponent(appName, () => App);
