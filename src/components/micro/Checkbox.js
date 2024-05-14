import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {icons} from '../../themes/icons';
import {colors} from '../../themes/colors';

const Checkbox = props => {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={[
        styles.checkBoxStyle,
        {
          borderColor: props.isChecked ? colors.primary : colors.borderColor,
          backgroundColor: props.isChecked ? colors.primary : 'transparent',
        },
      ]}>
      {props.isChecked ? (
        <Image source={icons.check} style={[styles.checkIcon]} />
      ) : null}
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkIcon: {
    width: 14,
    height: 14,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  checkBoxStyle: {
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
