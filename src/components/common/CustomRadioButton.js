import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import normalize from '../../utils/normalize';

const CustomRadioButton = ({selected}) => {
  return (
    <>
      <View
        style={[styles.radioButton, selected && styles.selectedRadioButton]}>
        {selected && <View style={styles.radioButtonInner} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    height: normalize(7),
    width: normalize(7),
    borderRadius: normalize(10),
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    borderColor: '#000',
  },
  radioButtonInner: {
    height: normalize(3.5),
    width: normalize(3.5),
    borderRadius: 5,
    backgroundColor: '#000',
  },
});

export default CustomRadioButton;
