import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts } from '../../themes/fonts'
import normalize from '../../utils/normalize'
import { colors } from '../../themes/colors'
import css from '../../themes/space'
import Logo from './Logo'

const AuthHeader = (props) => {
  return (
    <>
          <Logo />
    <View style={[css.aic]}>
        <Text style={styles.headerText}>{props?.headerText}</Text>
        <Text style={[styles.subHeaderText, css.mt5]}>{props?.subHeaderText}</Text>
    </View>
    </>
  )
}

export default AuthHeader

const styles = StyleSheet.create({
    headerText: {
        fontFamily: fonts.Medium,
        fontSize: normalize(18),
        color: colors.primaryTextColor,
      },
      subHeaderText: {
        fontFamily: fonts.Regular,
        fontSize: normalize(9),
        color: colors.secondaryTextColor,
    },
})