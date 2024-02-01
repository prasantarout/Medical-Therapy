import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
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
  } = props;

  return (
    <View style={[css.row, css.aic, css.jcsb]}>
      <View style={[styles.main, style]}>
        <TextInput
          placeholderTextColor={colors.searchPlaceholder}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
        />
        <Image source={icons.searchLens} style={styles.icon} />
      </View>
      <View style={styles.iconContainer}>
        <Image source={icons.filter} style={styles.filterIC} />
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: normalize(26),
    backgroundColor: colors.white,
    paddingLeft: normalize(10),
    paddingRight: normalize(9),
    borderRadius: normalize(2),
    paddingVertical: normalize(3),
    borderWidth: normalize(1),
    borderColor: '#EFEFEF',
  },
  input: {
    height: '100%',
    width: '85%',
    color: colors.primaryTextColor,
    fontSize: normalize(9),
  },
  icon: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: 'contain',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: normalize(1),
    borderColor: '#EFEFEF',
    backgroundColor: colors.white,
    borderRadius: normalize(4),
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(5),
    marginLeft: normalize(3),
  },
  filterIC: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: 'contain',
  },
});
