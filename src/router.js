import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoadingScreen from './screens/LoadingScreen';
import PlayList from './screens/PlayList';
import Tracks from './screens/Tracks';
import TrackDetail from './screens/TrackDetail';

const MainApp = createStackNavigator(
  {
    playlist: {
      screen: PlayList,
      navigationOptions: () => ({
        title: 'PlayList',
      }),
    },
    tracks: {
      screen: Tracks,
      navigationOptions: () => ({
        title: 'Tracks',
      }),
    },
    trackDetail: {
      screen: TrackDetail,
    },
  },
  {
    initialRouteName: 'playlist',
    defaultNavigationOptions: () => ({
      headerStyle: {
        backgroundColor: 'pink',
      },
    }),
  },
);

const App = createSwitchNavigator(
  {
    loading: LoadingScreen,
    app: MainApp,
  },
  {
    initialRouteName: 'loading',
  },
);

const AppContainer = createAppContainer(App);

export default AppContainer;
