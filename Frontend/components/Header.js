import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
const myIcon = (<Icon name="trending up" size={30} color="#900" />)
import colors from '../colors.js'
import commonStyles from '../styles'

export default function Header({children, title}) {
  return (
    <View style={styles.container}>
      <Text style={[commonStyles.fontBold, styles.title]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'center'
    flexDirection: 'row',
    backgroundColor: colors.main,
    alignItems: 'center',
    //opacity: 0.3,
    height:60,
    //paddingVertical: 20,
    //justifyContent: 'space-around'
    // justifyContent: 'center',
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 30,
    // fontWeight: 'bold',
    color: 'white',
  },

});
