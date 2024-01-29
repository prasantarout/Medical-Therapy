import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '../../themes/images';
import css from '../../themes/space';
import normalize from '../../utils/normalize';

const Logo = () => {
  return (
    <View style={[css.mt4, styles.logoContainer]}>
      <Image style={[styles.logo]} source={images.logo} />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    paddingTop: normalize(30),
    paddingBottom: normalize(10),
  },
  logo: {
    resizeMode: 'contain',
    width: normalize(160),
    height: normalize(40),
  },
});
