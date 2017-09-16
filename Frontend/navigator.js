import React from 'react'
import { TabNavigator, addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
import Challenges from './components/Challenges'
import Friends from './components/Friends'
import CameraScreen from './components/CameraScreen'
import PostChallengeScreen from './components/PostChallengeScreen'
import CompleteChallengeScreen from './components/CompleteChallengeScreen'
import LoginScreen from './components/LoginScreen'

export const Navigator = TabNavigator({
  Home: {
    screen: Friends,
  },
  Challenges: {
    screen: Challenges,
  },
  CameraScreen: {
    screen: CameraScreen,
  },
  PostChallenge: {
    screen: PostChallengeScreen,
  },
  CompleteChallenge: {
    screen: CompleteChallengeScreen
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

class App extends React.Component {
  render () {
    const {dispatch, nav} = this.props
    if (this.props.user) {
      return (
        <Navigator
          navigation={addNavigationHelpers({
            dispatch,
            state: nav,
          })}
        />
      )
    } else {
      return (
        <LoginScreen/>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    nav: state.nav,
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  null
)(App)