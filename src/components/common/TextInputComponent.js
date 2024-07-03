import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import normalize from '../../utils/normalize';
import {fonts} from '../../themes/fonts';
import {colors} from '../../themes/colors';

const TextInputComponent = ({question, onChangeText}) => {
  const isImportant = true;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{question.title}</Text>
        {isImportant && <Text style={styles.importantMark}>*</Text>}
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Type..."
        placeholderTextColor={colors.secondaryTextColor}
      />
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(5),
    marginHorizontal: normalize(3),
  },
  title: {
    fontSize: normalize(6),
    color: colors.black,
    fontFamily: fonts.SemiBold,
  },
  input: {
    borderColor: '#ccc',
    // borderRadius: 5,
    padding: normalize(7),
    marginBottom: 10,
    borderBottomWidth: 1,
    fontSize: normalize(7),
    color:colors.secondaryTextColor
  },
  messageBox: {
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  importantMark: {
    fontSize: normalize(6),
    color: 'red',
    marginLeft: 5,
  },

  titleContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
