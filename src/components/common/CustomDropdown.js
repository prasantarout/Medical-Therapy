import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../themes/colors';

const CustomDropdown = props => {
  const [isFocus, setIsFocus] = useState(false);

  const {
    placeholderStyle,
    selectedTextStyle,
    inputSearchStyle,
    dropdownStyle,
    labelField,
    valueField,
    placeholder,
    onChange,
    data,
    value,
    itemTextStyle,
  } = props;

  return (
    <Dropdown
      style={[styles.dropdownStyle, dropdownStyle]}
      placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
      selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
      inputSearchStyle={[styles.inputSearchStyle, inputSearchStyle]}
      itemTextStyle={[styles.itemTextStyle, itemTextStyle]}
      data={data}
      maxHeight={300}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={onChange}
    />
  );
};
// setValue(item.value);
export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdownStyle: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    minWidth: 150,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.primaryTextColor,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.primaryTextColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemTextStyle: {
    color: colors.primaryTextColor,
  },
});
