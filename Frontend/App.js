import React from 'react';
import { TabNavigator } from 'react-navigation'

import App from './components/App'
import App2 from './components/Friends'

const MyApp = TabNavigator({
  Home: {
    screen: App2,
  },
  Notifications: {
    screen: App,
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