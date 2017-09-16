import React from 'react'
import { Image, TextInput, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import { connect } from 'react-redux'

import SubmitButton from './SubmitButton'
import Friend from './FriendListItem'

class PostChallengeScreen extends React.PureComponent {
  render () {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image resizeMode='contain' style={styles.image} source={{uri: `data:image/jpg;base64,${this.props.image}`}} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Challenge' />
        </View>
        <Friend containerStyle={styles.friend} />
        <SubmitButton containerStyle={styles.submit}/>
      </KeyboardAwareScrollView>
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
  submit: {

  },
})

function mapStateToProps (state) {
  return {
    image: state.currentImage,
  }
}

export default connect(
  mapStateToProps,
  null,
)(PostChallengeScreen)
