import React from 'react'
import { Image, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import { connect } from 'react-redux'
import { Button, Avatar } from 'react-native-elements'

import { POST_CHALLENGE } from '../actions'
import Friend from './FriendListItem'
import FriendsPicker from './FriendsModal'
import Screen from './Screen'
import colors from '../colors.js'
import commonStyles from '../styles'

class PostChallengeScreen extends React.PureComponent {

  constructor (props) {
    super(props)

    this.state = {
      selectedFriend: null,
      modalOpen: false,
      comment: ''
    }
  }

  openModal () {
    this.setState({
      modalOpen: true,
    })
  }

  closeModal () {
    this.setState({
      modalOpen: false,
    })
  }

  friendSelected (friend) {
    this.setState({
      selectedFriend: this.props.friends.filter((item) => item.id === friend)[0],
      modalOpen: false,
    })
  }

  onSubmit () {
    if (this.state.selectedFriend && this.props.image) {
      this.props.sendChallenge(this.props.image, this.state.selectedFriend.id, this.state.comment)
    }
  }

  onTextChanged(comment) {
    // code to remove non-numeric characters from text
    this.setState({comment})
  }

  render () {
    return (
      <Screen>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <Image resizeMode='contain' style={styles.image} source={{uri: `data:image/jpg;base64,${this.props.image}`}} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="What's your challenge?"
              placeholderStyle={commonStyles.fontRegular}
              maxLength={50}
              underlineColorAndroid='white'
              onChangeText = {(text)=> this.onTextChanged(text)}
              value = {this.state.comment}
            />
          </View>
          <TouchableOpacity style={styles.friend} onPress={this.openModal.bind(this)}>
            {this.state.selectedFriend
              ? <Friend friend={this.state.selectedFriend} avatarProp={this.state.selectedFriend.image_url}/>
              : <View style={styles.friendContainer}>
                <Avatar containerStyle={styles.avatar}
                        medium
                        rounded
                        title="?"
                        activeOpacity={1}
                />
                <Text style={[commonStyles.fontRegular, styles.input]}>Select a friend...</Text>
              </View>
            }
          </TouchableOpacity>
          <Button
            fontFamily={'RobotoSlab-Bold'}
            large
            buttonStyle={styles.button}
            fontSize={20}
            title='Submit'
            onPress={this.onSubmit.bind(this)}
          />
        </KeyboardAwareScrollView>
        <FriendsPicker
          isOpen={this.state.modalOpen}
          onClosed={this.closeModal.bind(this)}
          friends={this.props.friends}
          onFriendSelected={this.friendSelected.bind(this)}
        />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // paddingHorizontal: 5,
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
    backgroundColor: colors.main,
    borderRadius: 8,
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
    sendChallenge (photo, receiver_id, comment) {
      dispatch({ type: POST_CHALLENGE, payload: {
        comment,
        photo,
        receiver_id,
      }})
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostChallengeScreen)
