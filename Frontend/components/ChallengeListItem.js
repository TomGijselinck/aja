import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';
const myIcon = (<Icon name="trending up" size={30} color="#900" />)

function pressArrowHandler(navigation){
  navigation.navigate('CameraScreen')
}

export default function ChallengeListItem({children, navigation, avatar, title, clock, state}) {
  let stateIcon
  if (state === 'incoming'){
    stateIcon = <Icon name="arrow-bold-right" size={60} color="grey"/>
  }
  else if (state === 'pending'){
    stateIcon = <Icon name="dots-three-horizontal" size={60} color="grey"/>
  }
  else{
    stateIcon = <Icon name="check" size={60} color="grey"/>
  }

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

      <TouchableHighlight style={styles.container3} onPress={() => pressArrowHandler(navigation)}>
        {stateIcon}
      </TouchableHighlight>
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
    //flex: 1,
    //flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 20,
    //justifyContent: 'space-around'
    justifyContent: 'center',
  },

  container2: {
    flex: 1,
    //flexDirection: 'row',
    backgroundColor: 'white',
    //alignItems: 'flex-start',
    paddingVertical: 20,
    marginLeft: 20,
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
    justifyContent: 'center',
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