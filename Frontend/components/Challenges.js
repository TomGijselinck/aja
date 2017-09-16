import React from 'react';
import { StyleSheet, Text, View, FlatList, SectionList } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import Header from './Header.js'
import { connect } from 'react-redux'
import Screen from './Screen.js'

import ChallengeListItem from './ChallengeListItem.js'

export class Challenges extends React.Component {

  itemSeperator(){
    return (
      <View style={styles.seperator}/>
    )
  }

  renderChallengeItem({item}, navigation, user_id, friends){
    let avatar_url = user_id === item.sender_id ? friends.find((friend) => friend.id === item.receiver_id).image_url : friends.find((friend) => friend.id === item.sender_id).image_url

    return <ChallengeListItem challenge={item} key={item.key} navigation={navigation} avatar={avatar_url} title={item.comment} clock={item.updated_at} state={item.relativeState}/>
  }

  render() {
    const user_id = this.props.user_id

    let list = this.props.challenges.map((elem) => ({...elem, key: elem.id}))
    list = list.map((item) => {
      let relativeState
      if (item.state === 'open'){
        if (item.sender_id === user_id){
          relativeState = 'pending'
        }
        else {
          relativeState = 'incoming'
        }
      }
      else {
        relativeState = 'completed'
      }

      return {...item, relativeState}
    })

    const listPending = list.filter((elem) => elem.relativeState === 'pending')
    const listIncoming = list.filter((elem) => elem.relativeState === 'incoming')
    const listCompleted = list.filter((elem) => elem.relativeState === 'completed')

    const orderedList = [...listIncoming, ...listPending, ...listCompleted]

    // data={orderedList}
    return ( 
      <Screen>
        <Header title='Challenges'/>
        <SectionList
          renderSectionHeader={({section}) => <Text style={styles.sectionListHeader}>{section.title}</Text>}
          sections={[ // homogenous rendering between sections
            {data: listIncoming, title: 'Incoming'},
            {data: listPending, title: 'Pending'},
            {data: listCompleted, title: 'Completed'},
          ]}
          renderItem={(item) => this.renderChallengeItem(item, this.props.navigation, user_id, this.props.friends)}
          ItemSeparatorComponent={this.itemSeperator}
        /> 
      </Screen>
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
  },

  sectionListHeader: {
    fontSize: 18,
    backgroundColor: 'lightgray',
    padding: 6,
  },
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

