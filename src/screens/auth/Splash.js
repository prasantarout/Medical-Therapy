import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getTokenRequest} from '../../redux/reducer/AuthReducer';
import {images} from '../../themes/images';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';

const Splash = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image source={images.logo} style={styles.logo} />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  logo: {
    resizeMode: 'contain',
    width: normalize(200),
    height: normalize(200),
  },
});
