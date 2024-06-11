import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import css from '../../themes/space';
import Txt from '../micro/Txt';
import {fonts} from '../../themes/fonts';
import normalize from '../../utils/normalize';

const QuickCounter = ({
  pressable,
  containerStyle,
  value,
  color,
  onPress,
  icon,
  iconTintColor,
  title,
}) => {
  return pressable ? (
    <TouchableOpacity
      style={[
        css.bgWhite,
        styles.card,
        css.p4,
        containerStyle,
        {borderColor: color},
      ]}
      onPress={onPress}>
      <View style={[css.row, css.aic, css.jcsb]}>
        <Txt style={[styles.valueStyle]}>{value || 0}</Txt>
        <Image
          style={[styles.cardIcon, {tintColor: iconTintColor}]}
          source={icon}
        />
      </View>
      <Txt style={[styles.titleStyle]}>{title}</Txt>
    </TouchableOpacity>
  ) : (
    <View
      style={[
        css.bgWhite,
        styles.card,
        css.p4,
        containerStyle,
        {borderColor: color},
      ]}>
      <View style={[css.row, css.aic, css.jcsb]}>
        <Txt style={[styles.valueStyle]}>{value}</Txt>
        <Image
          style={[styles.cardIcon, {tintColor: iconTintColor}]}
          source={icon}
        />
      </View>
      <Txt style={[styles.titleStyle]}>{title}</Txt>
    </View>
  );
};

export default QuickCounter;

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 3,
    height: '100%',
  },
  valueStyle: {
    fontFamily: fonts.Bold,
    fontSize: normalize(12),
    color: '#144067',
    lineHeight: normalize(14),
  },
  titleStyle: {
    color: '#444444',
    fontFamily: fonts.Medium,
    fontSize: 20,
    marginTop: 10,
  },
  cardIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
