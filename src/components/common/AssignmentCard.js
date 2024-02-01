import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';
import Txt from '../micro/Txt';
import {fonts} from '../../themes/fonts';
import css from '../../themes/space';
import {icons} from '../../themes/icons';

const AssignmentCard = props => {
  const {detail, time, date} = props;
  return (
    <View style={[styles.mainCard]}>
      <View style={{width: '65%'}}>
        <Txt style={[styles.mainText]}>{detail}</Txt>
        <View style={[css.row, css.jcsb, css.mt4]}>
          <View style={[css.row, css.aic]}>
            <Image
              source={icons.loader}
              style={{
                height: normalize(8),
                width: normalize(8),
                resizeMode: 'contain',
              }}
            />
            <Txt style={[styles.smallTxt]}>In Process</Txt>
          </View>
          <View style={[css.row, css.aic]}>
            <Image
              source={icons.Calendar}
              style={{
                height: normalize(8),
                width: normalize(8),
                resizeMode: 'contain',
              }}
            />
            <Txt style={[styles.smallTxt]}>{date}</Txt>
          </View>
          <View style={[css.row, css.aic]}>
            <Image
              source={icons.Clock}
              style={{
                height: normalize(8),
                width: normalize(8),
                resizeMode: 'contain',
              }}
            />
            <Txt style={[styles.smallTxt]}>{time}</Txt>
          </View>
        </View>
      </View>
      <TouchableOpacity style={[styles.btn]} activeOpacity={0.7}>
        <Txt style={[styles.btnTxt]}>View</Txt>
      </TouchableOpacity>
    </View>
  );
};

export default AssignmentCard;

const styles = StyleSheet.create({
  mainCard: {
    width: '100%',
    paddingVertical: normalize(10),
    backgroundColor: colors.white,
    borderColor: colors.placeholder,
    marginBottom: normalize(10),
    borderRadius: normalize(4),
    paddingHorizontal: normalize(12),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  mainText: {
    fontFamily: fonts.Regular,
    fontSize: normalize(6),
    color: '#1D2C42',
  },
  smallTxt: {
    fontFamily: fonts.Regular,
    fontSize: normalize(6),
    color: colors.primaryTextColor,
    marginLeft: normalize(3),
    fontWeight: '400',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(3),
    backgroundColor: '#E9EBF3',
    height: normalize(16),
    paddingHorizontal: normalize(10),
  },
  btnTxt: {
    fontFamily: fonts.Regular,
    fontSize: normalize(7),
    color: colors.primary,
    fontWeight: '600',
  },
});
