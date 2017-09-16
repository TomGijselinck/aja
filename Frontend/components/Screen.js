import React from 'react'
import { View } from 'react-native'

export default function Screen ({children}) {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {children}
    </View>
  )
}