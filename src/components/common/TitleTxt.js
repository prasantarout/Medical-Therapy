import {StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';
import Txt from '../micro/Txt';

const TitleTxt = props => {
  return <Txt style={[styles.txt, props.style]}>{props.title}</Txt>;
};

export default TitleTxt;

const styles = StyleSheet.create({
  txt: {
    fontSize: 30,
    color: colors.primaryTextColor,
    fontFamily: fonts.SemiBold,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
});
