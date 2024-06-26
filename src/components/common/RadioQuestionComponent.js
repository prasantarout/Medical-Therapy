import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import normalize from '../../utils/normalize';
import {fonts} from '../../themes/fonts';
import CustomRadio from './CustomRadio';

const RadioQuestionComponent = ({question, selectedValue, onSelect}) => {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const isImportant = true;

  const handleRadioSelect = (questionId, option) => {
    const selectedOptionIndex = options.indexOf(option);
    const selectedOptions = options.slice(0, selectedOptionIndex + 1);
    onSelect(questionId, selectedOptions);
  };
  const selectedOptions = Array.isArray(selectedValue) ? selectedValue : [];

  return (
    <View style={styles.questionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{question.title}</Text>
        {isImportant && <Text style={styles.importantMark}>*</Text>}
      </View>
      <View style={styles.radioContainer}>
        {options.map((option, index) => (
          <TouchableOpacity key={option} style={styles.radioButton}>
            <CustomRadio
              selected={selectedValue?.includes(option)}
              initialSelected={index === 0}
              onPress={() => handleRadioSelect(question.id, option)}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RadioQuestionComponent;

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: normalize(10),
    marginHorizontal: normalize(3),
    marginTop: normalize(1),
  },
  titleContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(7),
  },
  title: {
    fontSize: normalize(6),
    fontFamily: fonts.SemiBold,
    color: '#000000',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: normalize(17),
  },
  radioButton: {
    alignItems: 'center',
  },
  importantMark: {
    fontSize: normalize(6),
    color: 'red',
    marginLeft: 5,
  },
});
