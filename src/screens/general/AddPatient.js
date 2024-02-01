import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/common/SafeView';
import NavBar from '../../components/common/NavBar';
import css from '../../themes/space';
import TitleTxt from '../../components/common/TitleTxt';
import {colors} from '../../themes/colors';
import normalize from '../../utils/normalize';
import Txt from '../../components/micro/Txt';
import {fonts} from '../../themes/fonts';

const AddPatient = () => {
  const InputField = () => {
    return (
      <View style={[styles.InputField]}>
        <Txt style={styles.fieldTitle}>Name</Txt>
        <TextInput value="Jhon" style={styles.input} />
      </View>
    );
  };
  return (
    <SafeView>
      <NavBar />
      <View style={[css.px5, css.f1, css.bgColor, css.py9]}>
        <TitleTxt title={'Add New Patient'} />
        <View style={styles.container}>
          <View style={[css.row, css.jcsb]}>
            <InputField />
            <InputField />
          </View>
          <View style={[css.row, css.jcsb]}>
            <InputField />
            <InputField />
          </View>
          <View style={[css.row, css.jcsb]}>
            <InputField />
            <InputField />
          </View>
        </View>
      </View>
    </SafeView>
  );
};

export default AddPatient;

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(8),
    backgroundColor: colors.white,
    marginTop: normalize(12),
    borderRadius: normalize(5),
  },
  InputField: {
    width: '50%',
    padding: normalize(10),
  },
  fieldTitle: {
    fontFamily: fonts.Regular,
    fontSize: normalize(9),
    color: colors.primary,
  },
  input: {
    height: normalize(30),
    width: '100%',
    fontFamily: fonts.Regular,
    fontSize: normalize(10),
    color: colors.secondaryTextColor,
    borderBottomWidth: normalize(1),
    borderColor: '#E5E5E5',
    fontWeight: '500',
    paddingBottom: normalize(3),
  },
});
