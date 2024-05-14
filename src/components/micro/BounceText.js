import React, {useState, useEffect} from 'react';
import {View, Text, Animated, Easing, StyleSheet} from 'react-native';
import {colors} from '../../themes/colors';
import normalize from '../../utils/normalize';

const BounceText = ({title}) => {
  const [bounceValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    bounceAnimation.start();

    return () => bounceAnimation.stop();
  }, [bounceValue]);

  const translateY = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5], // Change this value to adjust the bounce height
  });

  return (
    <View style={{alignItems: 'center'}}>
      <Animated.Text style={[styles.textStyle, {transform: [{translateY}]}]}>
        {title}
      </Animated.Text>
    </View>
  );
};

export default BounceText;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: normalize(10),
    color: colors.ternaryTextColor,
  },
});
