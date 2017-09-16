import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';
const myIcon = (<Icon name="trending up" size={30} color="#900" />)



export default function ChallengeListItem({children, avatar, title, clock}) {
  
  return (
    <View style={styles.parentContainer}>
      <View style={styles.avatarContainer}>
        <Avatar containerStyle={styles.avatar}
          /* small */
          medium
          rounded
          source={{uri: avatar}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
      </View>
      <View style={styles.container2}>
        <Text style={styles.texttitle}>{title}</Text>
        <Text style={styles.clock}>{clock}</Text>
      </View>
      <View style={styles.container3}>
        <Icon name="arrow-bold-right" size={60} color="grey"/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  parentContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    //alignItems: 'center',
    paddingVertical: 20,
    //justifyContent: 'space-around'
    // justifyContent: 'center',
  },

  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 20,
    //justifyContent: 'space-around'
    // justifyContent: 'center',
  },

  container2: {
    flex: 1,
    //flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    paddingVertical: 20,
    //justifyContent: 'space-around'
    // justifyContent: 'center',
  },

  container3: {
    //flex: 1,
    //flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    paddingVertical: 20,
    marginRight: 10,
    //justifyContent: 'space-around'
    // justifyContent: 'center',
  },


  avatar: {
    marginLeft: 10,
  },

  texttitle: {
    flex: 1,
    //marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },

  clock: {
    //marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    //alignSelf: 'center'
  },

  scorePositive:{
    color: 'green',
  },

  scoreNegative:{
    color: 'red',
  },
});
