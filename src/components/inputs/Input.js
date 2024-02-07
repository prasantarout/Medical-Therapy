import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import css from '../../themes/space';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';
import Txt from '../micro/Txt';

const Input = props => {
  const [active, setActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const {
    title,
    placeholder,
    value,
    onChangeText,
    rightIcon,
    secure,
    style,
    secureTextEntry,
    onPressIcon,
    maxLength,
    keyboardType,
    autoCapitalize,
  } = props;

  return (
    <View
      style={[
        isFocused && styles.focusedStyle,
        styles.bbw1,
        css.px2,
        css.row,
        css.aic,
        style,
      ]}>
      <View style={[css.f1]}>
        <Txt style={[styles.titleStyle, css.fs20, css.medium]}>{title}</Txt>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[styles.textInput]}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
      <TouchableOpacity
        activeOpacity={secure ? 0.5 : 1}
        style={[]}
        onPress={onPressIcon}>
        {rightIcon && (
          <Image style={[styles.inputIconStyle]} source={rightIcon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  titleStyle: {
    color: colors.primaryTextColor,
    fontFamily: fonts.Regular,
  },
  bbw1: {
    borderBottomWidth: 1,
  },
  focusedStyle: {
    borderBottomColor: colors.secondary,
    backgroundColor: colors.white,
    shadowColor: 'rgb(20, 189, 240)',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 34,
  },
  textInput: {
    height: 50,
    fontSize: 16,
    color: colors.primaryTextColor,
  },
  inputIconStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    opacity: 0.6,
  },
});
