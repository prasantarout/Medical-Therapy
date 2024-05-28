/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {fonts} from '../../themes/fonts';

const CircularProgressBar = ({
  radius,
  strokeWidth,
  progress,
  strokeColor = '#3D2578',
}) => {
  const diameter = radius * 2;
  const circumference = Math.PI * diameter;

  const progressValue =
    progress >= 100 ? 100 : progress <= 0 ? 0 : 105 - progress;
  const progressOffset = (progressValue / 100) * circumference;

  const styles = customStyles({radius, strokeWidth});

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backgroundContainer} />
      <View style={[styles.progressContainer, {transform: 'rotate(123deg)'}]}>
        <Svg height={diameter} width={diameter}>
          <Circle
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeDashoffset={progressOffset + 40}
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
          />
        </Svg>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{progress}</Text>
      </View>
    </View>
  );
};

const customStyles = ({radius, strokeWidth}) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundContainer: {
      height: (radius - 5) * 2,
      width: (radius - 5) * 2,
      borderRadius: radius,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    textContainer: {
      height: (radius - strokeWidth + 4) * 2,
      width: (radius - strokeWidth + 4) * 2,
      borderRadius: radius,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    text: {
      color: '#1D2C42',
      fontFamily: fonts.Bold,
      fontSize: 50,
    },
  });

export default CircularProgressBar;

export const AnimatedCircularProgress = ({
  size,
  strokeWidth,
  color,
  progress,
}) => {
  const progressValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateProgress();
  }, [progress]);

  const animateProgress = () => {
    Animated.timing(progressValue, {
      toValue: progress,
      duration: 1000, // Adjust duration as needed
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const interpolatedProgress = progressValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circumference],
  });
  return (
    <View style={styles.container}>
      <View style={{width: size, height: size}}>
        <Animated.View
          style={[
            styles.progressCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderColor: color,
              borderWidth: strokeWidth,
              transform: [{rotate: '-90deg'}],
            },
          ]}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderColor: color,
                borderWidth: strokeWidth,
                borderLeftColor: 'transparent',
                borderLeftWidth: size / 2,
                borderTopColor: 'transparent',
                borderTopWidth: size / 2,
                transform: [{translateX: radius}, {rotate: '90deg'}],
                borderBottomColor: 'transparent',
                borderBottomWidth: size / 2,
                borderRightColor: 'transparent',
                borderRightWidth: size / 2,
                borderTopRightRadius: radius,
                borderBottomRightRadius: radius,
              },
              {borderRightColor: 'transparent'},
              {transform: [{rotate: interpolatedProgress + 'deg'}]},
            ]}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    position: 'absolute',
  },
});
