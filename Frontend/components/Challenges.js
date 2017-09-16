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

  renderChallengeItem({item}, navigation){
    console.log('le item')
    console.log(item)

    let state
    if (item.state === 'open'){
      if (item.sender_id === 1){
        state = 'pending'
      }
      else {
        state = 'incoming'
      }
    }
    else {
      state = 'completed'
    }

    return <ChallengeListItem navigation={navigation} avatar={item.avatar_url} title={item.title} clock={item.clock} state={state}></ChallengeListItem>
  }

  render() {
    const list = [
      {
        key: 1,
        name: 'Xenia',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        title: 'Eat an apple asap',
        clock: '01:23:12',
        state: 'open',
        sender_id: 1,
        receiver_id: 2,
      },
      {
        key: 2,
        name: 'Bernd',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        title: 'Go for a run you lazy old man',
        clock: '12:24:47',
        state: 'open',
        sender_id: 3,
        receiver_id: 1,
      },
      {
        key: 3,
        name: 'Tom',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        title: 'cook something nice',
        clock: '12:24:47',
        state: 'closed',
        sender_id: 4,
        receiver_id: 1,
      },
    ]

    return ( 
      <View style={{flex: 1}}>
        <Header title='Challenges'/>
        <FlatList
          data={list}
          renderItem={(item) => this.renderChallengeItem(item, this.props.navigation)}
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
