import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';

const Button = ({ title, onClick, isLoading, isDisabled, style }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isLoading}
      onPress={onClick}
      style={[styles.button,style]}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={colors.white} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(25),
    backgroundColor: colors.primary,
    borderRadius: normalize(5),
    marginTop: normalize(15),
  },
  buttonText: {
    fontFamily: fonts.Regular,
    fontSize: normalize(12),
    fontWeight: '600',
    color: colors.white,
  },
});
