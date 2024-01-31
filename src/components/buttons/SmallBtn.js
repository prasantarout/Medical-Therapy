import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import normalize from '../../utils/normalize';
import Txt from '../micro/Txt';

const SmallBtn = props => {
  const {style, title, btnStyle} = props;
  return (
    <TouchableOpacity style={[styles.btn, style]}>
      <Txt style={btnStyle}>{title}</Txt>
    </TouchableOpacity>
  );
};

export default SmallBtn;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
