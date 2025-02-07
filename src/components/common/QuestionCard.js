import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {fonts} from '../../themes/fonts';
import {colors} from '../../themes/colors';
import normalize from '../../utils/normalize';

const QuestionCard = props => {
  const [showAnswer, setShowAnswer] = useState(false);
  const {title, value} = props;

  return (
    <View style={styles.questionStyle}>
      <TouchableOpacity
        onPress={() => setShowAnswer(!showAnswer)}
        activeOpacity={0.7}>
        <Text style={styles.question}>Q. {title}</Text>
      </TouchableOpacity>
      {showAnswer && (
        <View style={{marginTop: normalize(5)}}>
          <Text style={styles.answer}>{value}</Text>
        </View>
      )}
    </View>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  question: {
    fontFamily: fonts.Regular,
    color: '#144067',
    fontSize: 18,
    fontWeight: '500',
  },
  answer: {
    fontFamily: fonts.Regular,
    color: colors.secondaryTextColor,
    fontSize: 18,
    fontWeight: '500',
  },
  questionStyle: {
    paddingBottom: 20,
    borderBottomWidth: 1.5,
    marginBottom: 20,
    borderColor: '#E6E6E6',
  },
});
