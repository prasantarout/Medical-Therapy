/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useEffect} from 'react';
import {View, Text, Animated, Easing, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {fonts} from '../../themes/fonts';

const AnimatedCircularProgressBar = ({
  radius = 40,
  strokeWidth,
  progress,
  strokeColor = '#3D2578',
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 100,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const circumference = 2 * Math.PI * radius; // Assuming radius is 40
  const strokeDashoffset = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const styles = customStyles({radius, strokeWidth});

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backgroundContainer} />
      <View
        style={[
          styles.progressContainer,
          {transform: [{rotate: '123deg'}]}, // Make sure to use array for transform
        ]}>
        <Svg height={100} width={100}>
          <Circle
            stroke={strokeColor}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeDashoffset={strokeDashoffset}
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

export default AnimatedCircularProgressBar;
