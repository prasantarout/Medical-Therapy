import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import normalize from '../../utils/normalize';
import Txt from '../micro/Txt';
import {useNavigation} from '@react-navigation/native';

const SmallBtn = props => {
  const navigation = useNavigation();
  const {style, title, btnStyle, onPress} = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(onPress)}
      style={[styles.btn, style]}>
      <Txt style={btnStyle}>{title}</Txt>
    </TouchableOpacity>
  );
};

export default SmallBtn;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: normalize(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
