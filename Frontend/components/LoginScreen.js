import React from 'react'
import { connect } from 'react-redux'
import { TextInput } from 'react-native'
import { Button } from 'react-native-elements'

import Screen from './Screen'
import { LOGIN } from '../actions'

class LoginScreen extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      user: ''
    }
  }

  onTextChanged(user) {
    // code to remove non-numeric characters from text
    this.setState({user})
  }

  login () {
    this.props.login(this.state.user)
  }

  render () {
    return (
      <Screen>
        <TextInput
          keyboardType = 'numeric'
          onChangeText = {(text)=> this.onTextChanged(text)}
          value = {this.state.user}
        />
        <Button
          onPress={this.login.bind(this)}
          title='login'
        />
      </Screen>
    )
  }
}

function mapStateToProps (state) {
  return {
    error: state.loginError,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login (user) {
      dispatch({type: LOGIN, payload: {user}})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen)