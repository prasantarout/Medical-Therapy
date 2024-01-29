import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import css from '../../themes/space';
import {icons} from '../../themes/icons';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';

const CommonInput = ({children, title, placeholder}) => {
  const [active, setActive] = useState(false);
  return (
    <View
      style={[
        styles.container,
        active && {
          backgroundColor: '#ffffff',
          borderBottomColor: colors.secondary,
          borderBottomWidth: 3,
          shadowColor: colors.secondary,
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.44,
          shadowRadius: 0,

          elevation: 16,
        },
        ,
        !active && {
          borderBottomWidth: 2,
          borderBottomColor: colors.placeholder,
        },
      ]}>
      <View style={[css.jcsb, css.f1]}>
        <Text style={[styles.text]}>{title}</Text>
        <TextInput
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          style={[styles.textInput]}
        />
      </View>
      {children}
    </View>
  );
};

export default CommonInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(10),
    height: normalize(38),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(12),
  },
  ClosedEye: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
  },
  textInput: {
    height: normalize(20),
    fontSize: normalize(9),
    color: colors.primaryTextColor,
  },
  text: {
    color: colors.primaryTextColor,
    fontFamily: fonts.Regular,
    fontSize: normalize(10),
    fontWeight: '400',
  },
});
