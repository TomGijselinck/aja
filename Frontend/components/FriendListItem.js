import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
const myIcon = (<Icon name="trending up" size={30} color="#900" />)



export default function FriendListItem({children, name, score}) {
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
        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
      <Text style={styles.textname}>{name}</Text>
      <Icon name="trending-up" size={30} color="grey"/>
      <Text style={[styles.textscore, scoreSpecific]}>{score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
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
  },

  textscore: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },

  scorePositive:{
    color: 'green',
  },

  scoreNegative:{
    color: 'red',
  },
});
