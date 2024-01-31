import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';
import Txt from '../micro/Txt';

const TitleTxt = props => {
  return <Txt style={styles.txt}>{props.title}</Txt>;
};

export default TitleTxt;

const styles = StyleSheet.create({
  txt: {
    fontSize: normalize(17),
    color: colors.primaryTextColor,
    fontFamily: fonts.Regular,
    fontWeight: '600',
  },
});
