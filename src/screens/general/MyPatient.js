import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TitleTxt from '../../components/common/TitleTxt';
import css from '../../themes/space';
import SearchInput from '../../components/inputs/SearchInput';
import SmallBtn from '../../components/buttons/SmallBtn';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';

const MyPatient = () => {
  return (
    <View style={[css.f1, css.py20, css.px5]}>
      <TitleTxt title={'My Patients'} />
      <View style={[css.py5, css.row, css.aic]}>
        <SearchInput
          style={{width: normalize(120)}}
          placeholder={'Search here...'}
        />
        <SmallBtn
          title={'Enrollment queue'}
          style={styles.Button}
          btnStyle={styles.btnTxt}
        />
        <SmallBtn
          title={'Add new patient'}
          style={styles.Button2}
          btnStyle={styles.btnTxt2}
        />
      </View>
    </View>
  );
};

export default MyPatient;

const styles = StyleSheet.create({
  Button: {
    backgroundColor: colors.white,
    width: normalize(72),
    marginLeft: normalize(4),
    height: normalize(23),
    borderRadius: normalize(4),
    borderWidth: normalize(1),
    borderColor: colors.primary,
  },
  btnTxt: {
    fontSize: 19,
    color: colors.primary,
    fontWeight: '500',
  },
  Button2: {
    backgroundColor: colors.primary,
    width: normalize(70),
    marginLeft: normalize(4),
    height: normalize(23),
    borderRadius: normalize(4),
  },
  btnTxt2: {
    fontSize: 19,
    color: '#fff',
    fontWeight: '500',
  },
});
