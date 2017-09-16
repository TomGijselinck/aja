import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import ChallengeListItem from './ChallengeListItem.js'
import Header from './Header.js'


export default class Challenges extends React.Component {
  itemSeperator(){
    return (
      <View style={styles.seperator}/>
    )
  }
  render() {
    const list = [
      {
        key: 1,
        name: 'Xenia',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        title: 'Eat an apple asap',
        clock: '01:23:12',
      },
      {
        key: 2,
        name: 'Bernd',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        title: 'Go for a run you lazy old man',
        clock: '12:24:47',
      }
    ]

    return ( 
      <View style={{flex: 1}}>
        <Header title='Challenges'/>
        <FlatList
          data={list}
          renderItem={({item}) => <ChallengeListItem navigation={this.props.navigation} avatar={item.avatar_url} title={item.title} clock={item.clock}></ChallengeListItem>}
          ItemSeparatorComponent={this.itemSeperator}
        /> 
      </View>
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
