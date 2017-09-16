import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import FriendListItem from './FriendListItem.js'


export default class App extends React.Component {
  itemSeperator(){
    return (
      <View style={styles.seperator}/>
    )
  }
  render() {
    const list = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
      },
      {
        name: 'Chris Jacksonsss',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
      }
    ]

    /* <FlatList
          data={[{name: 'Xenia', score: 5, key: 1}, {name: 'Bernd', score: -1, key: 2}]}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
      </View> */

      /*
      <ListItem
                roundAvatar
                avatar={{uri:l.avatar_url}}
                key={i}
                title={l.name}
                subtitle={l.subtitle}
              />
      */

    return ( 
      <FlatList
          data={[{name: 'Xenia', score: 5, key: 1}, {name: 'Bernd', score: -1, key: 2}]}
          renderItem={({item}) => <FriendListItem name={item.name} score={item.score}></FriendListItem>}
          ItemSeparatorComponent={this.itemSeperator}
        /> 
    )
  }
}

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
