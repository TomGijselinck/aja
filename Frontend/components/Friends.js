import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import FriendListItem from './FriendListItem.js'
import Header from './Header.js'
import { connect } from 'react-redux'

export class Friends extends React.Component {
  itemSeperator(){
    return (
      <View style={styles.seperator}/>
    )
  }
  render() {
    // const list = [
    //   {
    //     name: 'Amy Farha',
    //     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //     subtitle: 'Vice President'
    //   },
    //   {
    //     name: 'Chris Jacksonsss',
    //     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //     subtitle: 'Vice Chairman'
    //   }
    // ]

    let list = this.props.friends.map((elem) => ({name: elem.name, score: 5, key: elem.id, avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}))

    return ( 
      <View style={{flex: 1}}>
        <Header title='Friends'/>
        <FlatList
          data={list}
          renderItem={({item}) => <FriendListItem name={item.name} score={item.score}></FriendListItem>}
          ItemSeparatorComponent={this.itemSeperator}
        /> 
      </View>
    )
  }
}
// {[{name: 'Xenia', score: 5, key: 1}, {name: 'Bernd', score: -1, key: 2}]}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

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
