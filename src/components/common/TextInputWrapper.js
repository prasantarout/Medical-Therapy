import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import normalize from '../../utils/normalize';
import {fonts} from '../../themes/fonts';
import {colors} from '../../themes/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TextInputWrapper = ({
  title,
  onChangeText,
  value,
  isDateInput,
  dateIcon,
  dateIconPress,
  showDatePicker,
  hideDatePicker,
  handleConfirm,
  isDisable
}) => {

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          style={[styles.input,]}
          onChangeText={onChangeText} // Handles text input changes uniquely
          placeholder={isDateInput ? 'Select a date' : 'Enter text...'} // Custom placeholders
          placeholderTextColor={colors.secondaryTextColor}
          editable={isDisable ? false:true} 
        />
          <TouchableOpacity
            onPress={dateIconPress || showDatePicker}
            style={styles.iconWrapper}
            disabled={isDisable}
            >
            <Image source={dateIcon} style={styles.dateIcon} />
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextInputWrapper;

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(5),
    marginHorizontal: normalize(3),
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: normalize(8),
    fontSize: normalize(8),
    color: colors.secondaryTextColor,
    paddingRight: normalize(40),
  },
  inputWithIcon: {
    paddingRight: normalize(40), // Icon padding
  },
  iconWrapper: {
    position: 'absolute',
    right: normalize(10),
    top: normalize(8),
  },
  dateIcon: {
    width: 24,
    height: 24,
  },
});
