import React from 'react'
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Modal from 'react-native-modalbox'

class FriendPicker extends React.PureComponent {
  render () {
    const {isOpen, onClosed, friends} = this.props

    return (
      <Modal
        style={style.modal}
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
      <TouchableWithoutFeedback last onPress={() => { this.props.onOptionsSelection(item.id) }}>
        <Text> {item.name} </Text>
      </TouchableWithoutFeedback>
    )
  }
}

const style = StyleSheet.create({
  modal: {
    height: 'auto',
    maxHeight: '90%',
    width: '85%',
    borderRadius: 3,
  },
})

export default FriendPicker
