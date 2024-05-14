import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';

const RadioButton = props => {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={[
        styles.checkBoxStyle,
        props.style,
        {
          borderColor: props.isChecked ? colors.primary : colors.borderColor,
        },
      ]}>
      {props.isChecked ? <View style={[styles.checkIcon]} /> : null}
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  checkIcon: {
    width: 14,
    height: 14,
    backgroundColor: colors.primary,
    borderRadius: 100,
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
