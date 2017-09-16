import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
const myIcon = (<Icon name="trending up" size={30} color="#900" />)
import colors from '../colors.js'

export default function FriendListItem({children, friend}) {
  const {
    name,
    score,
    number_of_received_challenges_completed,
    number_of_received_challenges_failed,
    number_of_send_challenges_completed,
    number_of_send_challenges_failed,
    avatar
  } = friend
  let scoreSpecific 
  if (score >= 0) {
    scoreSpecific = styles.scorePositive
  }
  else {
    scoreSpecific = styles.scoreNegative
  }

  return (
    <View style={styles.container}>
      <Avatar containerStyle={styles.avatar}
        /* small */
        medium
        rounded
        source={{uri: avatar}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
      <Text style={styles.textname}>{name}</Text>
      <Text style={[styles.textscore, scoreSpecific]}>{number_of_received_challenges_completed - number_of_received_challenges_failed} : {number_of_send_challenges_completed - number_of_send_challenges_failed}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingVertical: 20,
    //justifyContent: 'space-around'
    // justifyContent: 'center',
  },
  avatar: {
    marginLeft: 10,
  },

  textname: {
    flex: 1,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text
  },

  textscore: {
    marginHorizontal: 10,
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  scorePositive:{
    color: colors.darkGreen,
  },

  scoreNegative:{
    color: colors.darkRed,
  },
});
