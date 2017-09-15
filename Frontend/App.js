import React from 'react';
import { TabNavigator } from 'react-navigation'

import App from './components/App'
import App2 from './components/App2'

const MyApp = TabNavigator({
  Home: {
    screen: App,
  },
  Notifications: {
    screen: App2,
  },
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