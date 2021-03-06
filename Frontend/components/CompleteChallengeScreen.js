import React from 'react'
import { Image, View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native'

import { connect } from 'react-redux'
import { Button, Avatar } from 'react-native-elements'

import { REPLY_CHALLENGE } from '../actions'
import Friend from './FriendListItem'
import Screen from './Screen'
import commonStyles from '../styles'
import colors from '../colors'

const {width, height} = Dimensions.get('window')

class PostChallengeScreen extends React.PureComponent {

  constructor (props) {
    super(props)

    let challenge = {}

    if (props.navigation.state.params) {
      challenge = props.navigation.state.params.challenge
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

  onReply () {
    if (this.props.image) {
      this.props.sendReply(this.props.image, this.state.challenge.id)
    } else {
      this.props.navigation.navigate('CameraScreen', {routeTo: 'CompleteChallenge'})
    }
  }

  render () {
    const friend = this.props.friends.filter(({id}) => this.state.challenge.sender_id === id)[0]
    const buttonText = this.props.image ? 'Send reply' : 'Complete Challenge'
    let replyImage
    if (this.state.challenge.state === 'closed') {
      replyImage = this.state.challenge.reply_photo
    } else {
      replyImage = this.props.image
    }
    if (friend) {
      return (
        <Screen>
          <View style={styles.container}>
            <ScrollView horizontal style={styles.imageContainer}>
              <Image resizeMode='contain' style={styles.image}
                     source={{uri: `data:image/jpg;base64,${this.state.challenge.photo}`}}/>
              <Image resizeMode='contain' style={styles.image}
                     source={{uri: `data:image/jpg;base64,${replyImage}`}}/>
            </ScrollView>
            <View style={styles.inputContainer}>
              <Text style={[commonStyles.fontRegular, styles.input]}>{this.state.challenge.comment}</Text>
            </View>
            <Friend friend={friend} avatarProp={friend.image_url}/>
            { this.state.challenge.state !== 'closed'
              ? <Button
                fontFamily={'RobotoSlab-Bold'}
                large
                buttonStyle={styles.button}
                title={buttonText}
                onPress={this.onReply.bind(this)}
              />
              : null
            }
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
    width: width,
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
    backgroundColor: colors.main,
    borderRadius: 8,
  },
  avatar: {
    marginHorizontal: 10,
  },
})

function mapStateToProps (state) {
  return {
    image: state.replyImage,
    friends: state.friends,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sendReply (photo, challenge) {
      dispatch({ type: REPLY_CHALLENGE, payload: {
        photo,
        challenge,
      }})
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostChallengeScreen)
