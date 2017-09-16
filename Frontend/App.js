import React from 'react';
import { TabNavigator } from 'react-navigation'

import Challenges from './components/Challenges'
import Friends from './components/Friends'
import CameraScreen from './components/CameraScreen'

const MyApp = TabNavigator({
  Home: {
    screen: Friends,
  },
  Notifications: {
    screen: Challenges,
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