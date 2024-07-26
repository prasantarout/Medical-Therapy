import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CustomRadioButton from './CustomRadioButton';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';

const QuestionComponent = ({question, selectedValue, onSelect}) => {
  const options = ['1', '2', '3', '4'];
  const isImportant = true;
  const tags = ['Not Satisfied', 'Need Improvement', 'Satisfied', 'Great'];

  return (
    <>
      <View style={styles.questionWrapper}>
        <View style={styles.questionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{question.title}</Text>
            {isImportant && <Text style={styles.importantMark}>*</Text>}
          </View>
          <View style={styles.radioContainer}>
            {options.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.radioButton}
                onPress={() => onSelect(question.id, option)}>
                <CustomRadioButton selected={selectedValue === option} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

export default QuestionComponent;

const styles = StyleSheet.create({
  questionWrapper: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  // tagsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   marginBottom: normalize(5),
  // },
  tag: {
    fontSize: normalize(5),
    fontFamily: fonts.Regular,
    color: '#000000',
    textAlign: 'center',
    flex: 1,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: normalize(6),
    color: colors.black,
    fontFamily: fonts.SemiBold,
  },
  importantMark: {
    fontSize: normalize(6),
    color: 'red',
    marginLeft:5,
  },
  radioContainer: {
    flex:2.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  optionText: {
    marginLeft: 5,
    fontSize: normalize(5),
  },
});
