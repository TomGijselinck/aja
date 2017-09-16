import React from 'react';
import { TabNavigator } from 'react-navigation'

import App from './components/App'
import App2 from './components/Friends'
import CameraScreen from './components/CameraScreen'

const MyApp = TabNavigator({
  Home: {
    screen: App2,
  },
  Notifications: {
    screen: App,
  },
  CameraScreen: {
    screen: CameraScreen,
  }
}, {
  tabBarComponent: () => null,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

export default MyApp