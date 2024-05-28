import {StyleSheet, View} from 'react-native';
import React from 'react';
import css from '../../themes/space';
import Txt from '../micro/Txt';
import {fonts} from '../../themes/fonts';
import useScreenDimension from '../../utils/useScreenDimension';
import CircularProgressBar from './CircularProgressBar';
import normalize from '../../utils/normalize';

const ScoreCard = props => {
  const {screenWidth, screenHeight} = useScreenDimension();

  return (
    <View
      style={[
        css.py8,
        css.bgWhite,
        styles.card,
        props.style,
        css.aic,
        {
          maxWidth: screenWidth / 2.5,
          maxHeight: screenWidth / 2.5,
        },
      ]}>
      <CircularProgressBar
        radius={normalize(40)}
        progress={props?.value}
        strokeWidth={30}
        strokeColor={props?.strokeColor}
      />
      <View style={[css.aic, css.mt3]}>
        <Txt style={styles.titleStyle}>{props.title}</Txt>
      </View>
    </View>
  );
};
// 343286

export default ScoreCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    flexGrow: 1,
  },
  titleStyle: {
    color: '#444444',
    fontFamily: fonts.Bold,
    fontSize: 16,
  },
});
