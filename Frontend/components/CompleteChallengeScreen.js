import React from 'react'
import { Image, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import { connect } from 'react-redux'
import { Button, Avatar } from 'react-native-elements'

import { POST_CHALLENGE } from '../actions'
import Friend from './FriendListItem'
import Screen from './Screen'
import commonStyles from '../styles'

class PostChallengeScreen extends React.PureComponent {

  constructor (props) {
    super(props)

    let challenge = {}

    if (props.navigation.state.params) {
      challenge = propsnavigation.state.params
    }

    this.state = {
      challenge
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.navigation.state.params) {
      this.setState({
        challenge: nextProps.navigation.state.params.challenge,
      })
    } else {
      this.setState({
        challenge: {},
      })
    }
  }

  onSubmit () {
    if (this.state.selectedFriend && this.props.image) {
      this.props.sendChallenge(this.props.image)
    }
  }

  render () {
    const friend = this.props.friends.filter(({id}) => this.state.challenge.sender_id === id)[0]
    if (friend) {
      return (
        <Screen>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image resizeMode='contain' style={styles.image}
                     source={{uri: `data:image/jpg;base64,${this.state.challenge.photo}`}}/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[commonStyles.fontRegular, styles.input]}>{this.state.challenge.comment}</Text>
            </View>
            <Friend name={friend.name} avatar={friend.image_url}/>
            <Button
              raised
              large
              buttonStyle={styles.button}
              title='Submit'
              onPress={this.onSubmit.bind(this)}
            />
          </View>
        </Screen>
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  imageContainer: {
    flex: 2,
    paddingBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    fontSize: 20,
  },
  text: {

  },
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  friend: {
    // flex: 1,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'lightgray',
  },
  button: {
    backgroundColor: 'lightblue'
  },
  avatar: {
    marginHorizontal: 10,
  },
})

function mapStateToProps (state) {
  return {
    image: state.currentImage,
    friends: state.friends,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sendChallenge (photo) {
      dispatch({ type: POST_CHALLENGE, payload: {
        photo,
        sender_id: 2,
        receiver_id: 1,
      }})
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostChallengeScreen)
