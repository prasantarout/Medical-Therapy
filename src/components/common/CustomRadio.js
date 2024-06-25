import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import normalize from '../../utils/normalize';

const CustomRadio = ({selected = false, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.radioButton, selected && styles.selected]}>
        {selected && <View style={styles.innerCircle} />}
      </View>
    </TouchableOpacity>
  );
};

export default CustomRadio;

const styles = StyleSheet.create({
  radioButton: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(50),
    borderWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerCircle: {
    width: normalize(5),
    height: normalize(5),
    borderRadius: normalize(6),
    backgroundColor: '#000000',
  },
});
