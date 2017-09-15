import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements'



export default function FriendListItem({children, name, score}) {
  return (
    <View style={styles.container}>
      <Avatar
        small
        rounded
        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
      <Text>{name}</Text>
      <Text>{score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-around'
    // justifyContent: 'center',
  },
});
