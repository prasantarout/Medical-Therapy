import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Txt from '../micro/Txt';
import css from '../../themes/space';
import {colors} from '../../themes/colors';

const GeneralInfoCard = props => {
  const {title, value, editable, onChangeText, containerStyle, autoCapitalize} =
    props;

  return (
    <View style={[containerStyle]}>
      <Txt style={[css.textLighte, css.semiBold, css.fs17]}>{title}</Txt>
      <TextInput
        style={[
          css.textLighte,
          css.fs16,
          {
            borderBottomWidth: editable ? 1 : 0,
            borderBottomColor: colors.borderColor,
          },
        ]}
        editable={editable}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

export default GeneralInfoCard;

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    width: '100%',
    fontSize: 18,
    color: colors.ternaryTextColor,
  },
});
