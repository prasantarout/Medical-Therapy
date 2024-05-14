import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {fonts} from '../../themes/fonts';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';
import css from '../../themes/space';
import {images} from '../../themes/images';
import Txt from '../micro/Txt';
import useScreenDimension from '../../utils/useScreenDimension';

const AuthHeader = props => {
  const {screenWidth, screenHeight} = useScreenDimension();

  return (
    <View style={[css.aic, css.jcc]}>
      <View
        style={[
          css.mt4,
          styles.logoContainer,
          {
            width: screenWidth / 3.6,
            maxHeight: 120,
          },
        ]}>
        <Image style={[styles.logo]} source={images.logo} />
      </View>
      <Txt style={styles.headerText}>{props?.headerText}</Txt>
      <Txt style={[styles.subHeaderText]}>{props?.subHeaderText}</Txt>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: fonts.SemiBold,
    fontSize: 40,
    color: colors.primaryTextColor,
  },
  subHeaderText: {
    fontFamily: fonts.Regular,
    fontSize: 25,
    color: colors.secondaryTextColor,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  logo: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    maxHeight: 120,
  },
});
