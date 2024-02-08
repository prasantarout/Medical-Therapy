import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import normalize from '../../utils/normalize';
import Txt from '../micro/Txt';
import {useNavigation} from '@react-navigation/native';
import useOrientation from '../../utils/useOrientation';

const SmallBtn = props => {
  const navigation = useNavigation();
  const {style, title, btnStyle, onPress} = props;

  const orientation = useOrientation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(onPress)}
      style={[styles.btn, style,{
        // paddingHorizontal: orientation == 'PORTRAIT' ? 8 : 25
      }]}>
      <Txt style={btnStyle}>{title}</Txt>
    </TouchableOpacity>
  );
};

export default SmallBtn;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
