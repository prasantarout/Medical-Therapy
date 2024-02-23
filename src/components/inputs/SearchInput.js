import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';
import {icons} from '../../themes/icons';
import css from '../../themes/space';

const SearchInput = props => {
  const {
    title,
    placeholder,
    value,
    onChangeText,
    style,
    onPressIcon,
    autoCapitalize,
    onPressFilter
  } = props;

  return (
    <View style={[css.row, css.aic, css.jcsb]}>
      <View style={[styles.main, style]}>
        <TextInput
          placeholderTextColor={colors.searchPlaceholder}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, css.p0]}
        />
        <Image source={icons.searchLens} style={styles.icon} />
      </View>
      <TouchableOpacity onPress={onPressFilter} style={styles.iconContainer}>
        <Image source={icons.filter} style={styles.filterIC} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: colors.white,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: '#EFEFEF',
    flex: 1
  },
  input: {
    flex: 1,
    color: colors.primaryTextColor,
    fontSize: 16,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    backgroundColor: colors.white,
    borderRadius: 8,
    marginLeft: normalize(3),
    padding:14,
    height: 50,
    width: 50,
  },
  filterIC: {
    height: "100%",
    width: "100%",
    resizeMode: 'contain',
  },
});
