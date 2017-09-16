import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import FriendListItem from './FriendListItem.js'
import Header from './Header.js'
import { connect } from 'react-redux'
import Screen from './Screen.js'

export class Friends extends React.Component {
  itemSeperator(){
    return (
      <View style={styles.seperator}/>
    )
  }
  render() {
    let list = this.props.friends.map((elem) => ({name: elem.name, score: elem.score, key: elem.id, number_of_send_challenges_completed: elem.number_of_send_challenges_completed, number_of_send_challenges_failed: elem.number_of_send_challenges_failed, number_of_received_challenges_completed: elem.number_of_received_challenges_completed, number_of_received_challenges_failed: elem.number_of_received_challenges_failed, avatar: elem.image_url}))

    return ( 
      <Screen>
        <Header title='Friends' icon='user-plus'/>
        <FlatList
          data={list}
          renderItem={({item}) => <FriendListItem friend={item}></FriendListItem>}
          ItemSeparatorComponent={this.itemSeperator}
        /> 
      </Screen>
    )
  }
}
// {[{name: 'Xenia', score: 5, key: 1}, {name: 'Bernd', score: -1, key: 2}]}
const styles = StyleSheet.create({
  seperator: {
    height: 1,
    flex: 1,
    backgroundColor: 'grey',
    opacity: 0.5,
    marginLeft: 70
  }
});

function mapStateToProps (state) {
  return {
    friends: state.friends,
  }
}

export default connect(
  mapStateToProps,
  null,
)(Friends)
