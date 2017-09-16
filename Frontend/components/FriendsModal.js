import React from 'react'
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Modal from 'react-native-modalbox'
import { Avatar } from 'react-native-elements'

class FriendPicker extends React.PureComponent {
  render () {
    const {isOpen, onClosed, friends} = this.props

    return (
      <Modal
        style={styles.modal}
        isOpen={isOpen}
        onClosed={onClosed}
        coverScreen
      >
        <View>
          <FlatList
            data={friends}
            renderItem={this.renderRow.bind(this)}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Modal>
    )
  }

  renderRow ({item, index}) {
    return (
      <TouchableWithoutFeedback onPress={() => { this.props.onFriendSelected(item.id) }}>
        <View style={styles.friend} >
          <Avatar containerStyle={styles.avatar}
                  small
                  rounded
                  source={{uri: item.image_url}}
                  activeOpacity={1}
          />
          <Text> {item.name} </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    height: 'auto',
    maxHeight: '90%',
    width: '85%',
    borderRadius: 3,
  },
  friend: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center'
  },
  avatar: {
    marginHorizontal: 10,
  },
})

export default FriendPicker
