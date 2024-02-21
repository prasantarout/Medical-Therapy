import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { colors } from '../../themes/colors';
import { fonts } from '../../themes/fonts';

const Button = ({ title, onPress, isLoading, isDisabled, style }) => {

  const btnBg = isLoading ? "#5b5b5c" : colors.primary

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isLoading}
      onPress={onPress}
      style={[styles.button, style, {
        backgroundColor: btnBg
      }]}>
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
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  buttonText: {
    fontFamily: fonts.Medium,
    fontSize: 16,
    color: colors.white,
  },
});
