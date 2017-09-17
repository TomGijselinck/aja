import React from 'react'
import { View } from 'react-native'
import colors from '../colors.js'

export default function Screen ({children}) {
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      {children}
    </View>
  )
}