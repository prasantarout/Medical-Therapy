import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Txt from '../micro/Txt';
import css from '../../themes/space';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../themes/colors';

const SimpleDropDown = props => {
  const [isFocus, setIsFocus] = useState(false);

  const {style, value, placeholder, title, onChange, data} = props;

  return (
    <View style={[style, styles.contianerStyle]}>
      <Txt style={[css.fs20]}>{title}</Txt>
      <Dropdown
        style={[styles.dropdownStyle, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data ? data : []}
        value={value}
        placeholder={placeholder}
        maxHeight={280}
        labelField="label"
        valueField="value"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
      />
    </View>
  );
};

export default SimpleDropDown;

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 18,
    color: colors.placeholder,
  },
  selectedTextStyle: {
    fontSize: 18,
    color: colors.primaryTextColor,
  },
  contianerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingBottom: 16,
  },
  dropdownStyle: {},
});
