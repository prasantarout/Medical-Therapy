import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import css from '../../themes/space';
import Txt from '../micro/Txt';
import {fonts} from '../../themes/fonts';
import normalize from '../../utils/normalize';

const QuickCounter = props => {
  return (
    <View
      style={[
        css.bgWhite,
        styles.card,
        css.p4,
        props.style,
        {borderColor: props.color},
      ]}>
      <View style={[css.row, css.aic, css.jcsb]}>
        <Txt style={[styles.valueStyle]}>{props?.value}</Txt>
        <Image style={[styles.cardIcon]} source={props?.icon} />
      </View>
      <Txt style={[styles.titleStyle]}>{props?.title}</Txt>
    </View>
  );
};

export default QuickCounter;

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 3,
    // flex:1
    height: '100%',
  },
  valueStyle: {
    color: '#444444',
    fontFamily: fonts.Bold,
    fontSize: normalize(12),
    color: '#144067',
    lineHeight: normalize(14),
  },
  titleStyle: {
    color: '#444444',
    fontFamily: fonts.Medium,
    fontSize: 20,
    color: '#144067',
    marginTop: 10,
  },
  cardIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
