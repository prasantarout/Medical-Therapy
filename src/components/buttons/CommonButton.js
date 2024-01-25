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

const CommonButton = ({title, onClick, isLoading, isDisabled}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onClick}
      style={styles.button}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={colors.white} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(30),
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: fonts.Regular,
    fontSize: normalize(12),
    fontWeight: '600',
    color: colors.white,
  },
});
