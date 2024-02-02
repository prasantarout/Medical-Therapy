import {StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';
import Txt from '../micro/Txt';

const HeaderTitle = props => {
  return <Txt style={styles.txt}>{props.title}</Txt>;
};

export default HeaderTitle;

const styles = StyleSheet.create({
  txt: {
    fontSize: 45,
    color: colors.primaryTextColor,
    fontFamily: fonts.Bold,
  },
});
