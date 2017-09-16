import React from 'react';
import { TabNavigator } from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import mySaga from './sagas'
import Challenges from './components/Challenges'
import Friends from './components/Friends'
import CameraScreen from './components/CameraScreen'
import PostChallengeScreen from './components/PostChallengeScreen'

const sagaMiddleware = createSagaMiddleware()

const TabNav = TabNavigator({
  Home: {
    screen: Friends,
  },
  Notifications: {
    screen: Challenges,
  },
  CameraScreen: {
    screen: CameraScreen,
  },
  PostChallenge: {
    screen: PostChallengeScreen,
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

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(mySaga)

store.dispatch({type: 'INIT'})

export default function MyApp () {
  return (
    <Provider store={store}>
      <TabNav/>
    </Provider>
  )
}