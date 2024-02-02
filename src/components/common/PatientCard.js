import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';
import Txt from '../micro/Txt';
import css from '../../themes/space';
import {icons} from '../../themes/icons';

const PatientCard = props => {
  const {name, location, date, time, image, Button, onPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.mainCard]}>
      <Image source={image} style={styles.profile} />
      <Txt style={styles.titleTxt}>{name}</Txt>
      <View style={[css.row, css.aic]}>
        <Image source={icons.Location} style={styles.IconStyle} />
        <Txt style={styles.subTxt}>{location}</Txt>
      </View>
      <View style={[css.row, css.aic]}>
        <Image source={icons.Calendar} style={styles.IconStyle} />
        <Txt style={styles.subTxt}>{date}</Txt>
      </View>
      <View style={[css.row, css.aic]}>
        <Image source={icons.Clock} style={styles.IconStyle} />
        <Txt style={styles.subTxt}>{time}</Txt>
      </View>
      {Button && (
        <TouchableOpacity style={[styles.btn]}>
          <Txt style={[styles.btnTxt]}>Service Enroll now</Txt>
        </TouchableOpacity>
      )}
      <View style={styles.newCtn}>
        <Txt
          style={{
            fontSize: normalize(6),
            color: colors.white,
            fontWeight: '500',
          }}>
          New
        </Txt>
      </View>
    </TouchableOpacity>
  );
};

export default PatientCard;

const styles = StyleSheet.create({
  mainCard: {
    width: '31%',
    justifyContent: 'center',
    marginBottom: normalize(10),
    backgroundColor: colors.white,
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(6),
    borderRadius: normalize(5),
  },
  profile: {
    width: '100%',
    height: normalize(54),
    resizeMode: 'contain',
    borderRadius: normalize(5),
  },
  titleTxt: {
    fontSize: normalize(8),
    fontWeight: '600',
    paddingTop: normalize(6),
    paddingBottom: normalize(3),
  },
  IconStyle: {
    height: normalize(11),
    width: normalize(8),
    resizeMode: 'contain',
  },
  subTxt: {
    fontSize: normalize(6),
    marginLeft: normalize(4),
    color: '#444444',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: normalize(6),
    borderWidth: normalize(1),
    borderColor: '#E0E0E0',
    borderRadius: normalize(4),
    marginTop: normalize(6),
  },
  btnTxt: {
    fontSize: normalize(7),
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
    position: 'absolute',
    top: normalize(14),
    left: normalize(11),
  },
});
