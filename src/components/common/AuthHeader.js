import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { fonts } from '../../themes/fonts'
import normalize from '../../utils/normalize'
import { colors } from '../../themes/colors'
import css from '../../themes/space'
import { images } from '../../themes/images'
import Txt from '../micro/Txt'

const AuthHeader = (props) => {
  return (
    <View style={[css.aic, css.jcc]}>
      <View style={[css.mt4, styles.logoContainer]}>
        <Image style={[styles.logo]} source={images.logo} />
      </View>
      <Txt style={styles.headerText}>{props?.headerText}</Txt>
      <Txt style={[styles.subHeaderText, css.mt5]}>{props?.subHeaderText}</Txt>
    </View>
  )
}

export default AuthHeader

const styles = StyleSheet.create({
  headerText: {
    fontFamily: fonts.Medium,
    fontSize: normalize(12),
    color: colors.primaryTextColor,
  },
  subHeaderText: {
    fontFamily: fonts.Regular,
    fontSize: normalize(8),
    color: colors.secondaryTextColor,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: normalize(30),
    paddingBottom: normalize(10),
  },
  logo: {
    resizeMode: 'contain',
    width: normalize(120),
    height: normalize(40),
  },
})