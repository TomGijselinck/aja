import React from 'react'
import {StyleSheet, TouchableHighlight, Text} from 'react-native'

export default function ({containerStyle}) {
  return (
    <TouchableHighlight style={[styles.container, containerStyle]}>
      <Text style={styles.text}>Submit</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  }
})