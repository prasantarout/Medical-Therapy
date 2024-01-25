import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '../../themes/images';
import css from '../../themes/space';
import normalize from '../../utils/normalize';

const Logo = () => {
  return (
    <View style={[css.mt5, styles.logoContainer]}>
      <Image style={[styles.logo]} source={images.logo} />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: normalize(100),
    height: normalize(100),
  },
});
