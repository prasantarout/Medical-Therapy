import React from 'react';
import {StyleSheet, View} from 'react-native';
import Txt from '../components/micro/Txt';
import LottieView from 'lottie-react-native';
import {icons} from '../themes/icons';
import css from '../themes/space';

const CustomAnimatedInfo = props => {
  const {title, isVisible, icon, style} = props;
  return (
    <View style={[styles.lottieWrap, style]}>
      <LottieView source={icons.waves} style={[styles.lottieW]} autoPlay loop />
      <Txt style={[styles.titleStyle, css.textLighte]}>{title}</Txt>
    </View>
  );
};

export default CustomAnimatedInfo;

const styles = StyleSheet.create({
  lottieWrap: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieW: {
    width: 300,
    height: 300,
    opacity: 0.3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 10,
  },
});
