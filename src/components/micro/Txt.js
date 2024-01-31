import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../themes/colors'
import { fonts } from '../../themes/fonts'

const Txt = (props) => {
  return (  
      <Text style={[styles.defaultStyle, props.style]}>{props.children}</Text>   
  )
}

export default Txt

const styles = StyleSheet.create({
    defaultStyle:{
        color: colors.primaryTextColor,
        fontFamily: fonts.Regular,
    }
})