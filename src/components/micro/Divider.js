import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Divider = (props) => {
    
    const { style } = props
  return (
      <View style={[styles.borderStyle, style]} />
  )
}

export default Divider

const styles = StyleSheet.create({
    borderStyle:{
        borderBottomWidth: 1,
        borderBottomColor: "#edf1f8",
        width: '100%',
    }
})