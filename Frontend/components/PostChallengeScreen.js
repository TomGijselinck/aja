import React from 'react'
import { Image, TextInput, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

import Friend from './FriendListItem'
import FriendsPicker from './FriendsModal'
import Screen from './Screen'

class PostChallengeScreen extends React.PureComponent {

  constructor (props) {
    super(props)

    this.state = {
      modalOpen: false,
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

  render () {
    return (
      <Screen>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <Image resizeMode='contain' style={styles.image} source={{uri: `data:image/jpg;base64,${this.props.image}`}} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput placeholder='Challenge' />
          </View>
          <Friend containerStyle={styles.friend} />
          <Button
            raised
            large
            buttonStyle={styles.button}
            title='Submit'
          />
        </KeyboardAwareScrollView>
        <FriendsPicker
          isOpen={this.state.modalOpen}
          onClosed={this.closeModal.bind(this)}
          friends={this.props.friends}
        />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  imageContainer: {
    flex: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    flex: 1,
  },
  text: {

  },
  friend: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'lightgray',
  },
  button: {
    backgroundColor: 'lightblue'
  },
})

function mapStateToProps (state) {
  return {
    image: state.currentImage,
    friends: state.friends,
  }
}

export default connect(
  mapStateToProps,
  null,
)(PostChallengeScreen)
