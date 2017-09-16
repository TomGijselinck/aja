import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import Header from './Header.js'
import { connect } from 'react-redux'

import ChallengeListItem from './ChallengeListItem.js'

export class Challenges extends React.Component {

  itemSeperator(){
    return (
      <View style={styles.seperator}/>
    )
  }

  renderChallengeItem({item}, navigation, user_id, friends){
    console.log('le item')
    console.log(item)
    console.log('something else')

    let state
    if (item.state === 'open'){
      if (item.sender_id === user_id){
        state = 'pending'
      }
      else {
        state = 'incoming'
      }
    }
    else {
      state = 'completed'
    }

    // let avatar_url = user_id === item.sender_id ? friends.filter((friend) => friend.id === elem.receiver_id).image : friends.filter((friend) => friend.id === elem.sender_id).image
    avatar_url = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'

    return <ChallengeListItem navigation={navigation} avatar={avatar_url} title={item.comment} clock={item.updated_at} state={state}></ChallengeListItem>
  }

  render() {
    // const list = [
    //   {
    //     key: 1,
    //     name: 'Xenia',
    //     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //     title: 'Eat an apple asap',
    //     clock: '01:23:12',
    //     state: 'open',
    //     sender_id: 1,
    //     receiver_id: 2,
    //   },
    //   {
    //     key: 2,
    //     name: 'Bernd',
    //     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //     title: 'Go for a run you lazy old man',
    //     clock: '12:24:47',
    //     state: 'open',
    //     sender_id: 3,
    //     receiver_id: 1,
    //   },
    //   {
    //     key: 3,
    //     name: 'Tom',
    //     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //     title: 'cook something nice',
    //     clock: '12:24:47',
    //     state: 'closed',
    //     sender_id: 4,
    //     receiver_id: 1,
    //   },
    // ]
    const list = this.props.challenges.map((elem) => ({...elem, key: elem.id}))

    return ( 
      <View style={{flex: 1}}>
        <Header title='Challenges'/>
        <FlatList
          data={list}
          renderItem={(item) => this.renderChallengeItem(item, this.props.navigation, this.props.user_id, this.props.friends)}
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

function mapStateToProps (state) {
  return {
    user_id: state.user,
    challenges: state.challenges,
    friends: state.friends,
  }
}

export default connect(
  mapStateToProps,
  null,
)(Challenges)

