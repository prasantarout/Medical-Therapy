import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import normalize from '../../utils/normalize';
import { colors } from '../../themes/colors';
import Txt from '../micro/Txt';
import css from '../../themes/space';
import { icons } from '../../themes/icons';
import { fonts } from '../../themes/fonts';

const PatientCard = props => {
  const { name, location, date, time, image, Button, onPress, navigateTo, style } =
    props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.mainCard, style]}>
      <ImageBackground resizeMode='stretch' source={image} style={styles.profile} >
        <View style={[styles.newCtn, css.m2]}>
          <Txt
            style={{
              fontSize: 15,
              color: colors.white,
              fontWeight: '500',
            }}>
            New
          </Txt>
        </View>
      </ImageBackground>
      <Txt style={styles.titleTxt}>{name}</Txt>
      <View style={[css.row, css.aic, css.mb1]}>
        <Image source={icons.Location} style={styles.IconStyle} />
        <Txt style={styles.subTxt}>{location}</Txt>
      </View>
      <View style={[css.row, css.aic, css.mb1]}>
        <Image source={icons.Calendar} style={styles.IconStyle} />
        <Txt style={styles.subTxt}>{date}</Txt>
      </View>
      <View style={[css.row, css.aic]}>
        <Image source={icons.Clock} style={styles.IconStyle} />
        <Txt style={styles.subTxt}>{time}</Txt>
      </View>
      {Button && (
        <TouchableOpacity onPress={navigateTo} style={[styles.btn]}>
          <Txt style={[styles.btnTxt]}>Service Enroll now</Txt>
        </TouchableOpacity>
      )}

    </TouchableOpacity>
  );
};

export default PatientCard;

const styles = StyleSheet.create({
  mainCard: {
    justifyContent: 'center',
    marginBottom: normalize(10),
    backgroundColor: colors.white,
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(6),
    borderRadius: normalize(5),
  },
  profile: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    // borderRadius: normalize(5),
  },
  titleTxt: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    paddingTop: normalize(6),
    paddingBottom: normalize(3),
  },
  IconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  subTxt: {
    fontSize: 16,
    marginLeft: normalize(4),
    color: '#444444',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 13,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    marginTop: 16,
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  newCtn: {
    paddingHorizontal: normalize(3),
    paddingVertical: normalize(1),
    backgroundColor: colors.primary,
    borderRadius: normalize(3),
    justifyContent: 'center',
    alignItems: 'center',
    width: normalize(23),
  },
});
